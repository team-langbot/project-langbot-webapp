from flask_cors import CORS
from flask import Flask, request
from flask_api import status
import flask
import awsgi, boto3, json
from enum import Enum
from scipy.spatial import distance
from pysbd import Segmenter
import random

CONTENT_CLASSIFICATION_ENDPOINT_NAME = "sm-cc-aws"
GEC_ENDPOINT_NAME = "sm-gec-aws"
LLM_ENDPOINT_NAME = "sm-llm-aws"
OFF_TOPIC_TEXT_RESPONSE = "Interesante."
MAX_CONVERSATION_STEP_NUMBER = 5
MAX_ANSWER_ATTEMPTS = 3
CC_CUTOFF_THRESHOLD = 0.38
# CC_CUTOFF_THRESHOLD = 0.75
CONVERSATION_SCRIPTS = {
    1: {
        1: 'Hola, ¿cómo estás?',
        2: '¿Estás libre hoy?',
        3: '¿Quieres ir de compras conmigo?',
        4: '¿A qué hora te gustaría ir?',
        5: 'Vale, nos vemos luego.'
    }
}
ALTERNATIVE_CONVERSATION_WORDINGS = {
    1: {
        1: ['¿Hola, cómo va?'],
        2: ['¿Quieres pasar el rato hoy?'],
        3: ['¿Quieres ir a la tienda conmigo?'],
        4: ['¿A qué hora te gustaría encontrarnos?'],
        5: ['Bueno, hasta luego.']
    }
}
GEC_RESPONSE_TRANSLATION = {
    "B-na": "number disagreement",
    "B-ga": "gender disagreement"
}

class NextStep(Enum):
    MOVE_TO_NEXT_CONVERSATION_PAIR = 1
    PROMPT_FOR_ANOTHER_ATTEMPT = 2
    END_CONVERSATION = 3

# Initialize Flask application and enable CORS
app = Flask(__name__)
CORS(app, send_wildcard=True)
runtime = boto3.client('runtime.sagemaker')

# Request body:
# {
# 	“conversationId”: (int) 1, // Options for MVP are 1 or 2
# 	“stepNumber”: (int) 2, // Conversation step pair we are on
# 	“attemptNumber”: (int) 1, // TODO use the number of attempts per question to determine the response, if we hit X attempts (3?) then we move onto the next question
# 	“text”: (string) “Si me gusta voy a la biblioteca.”
# 	// v2 can include language as a field, but for now we’ll just assume it’s Spanish
# }

# Response Body: 
# {
# 	“onTopic”: (bool) true/false, // Used to increment the attempt number on the front-end
# 	“nextAction”: (int) 1, // Can be 1 - 3, 1 = move to next conversation pair, 2 = prompt for errors, 3 = end conversation
# 	“text”: (string) “Bueno! Que te gusta leer?” // This could either come back from the LLM, if the context was good, or could be one of a few hard-coded responses prompting for a new input from the user. We can store these responses in code right now, an optimization as we expand to different languages would be to store these in a database.
# }

# Code reference:
# https://aws.amazon.com/blogs/machine-learning/call-an-amazon-sagemaker-model-endpoint-using-amazon-api-gateway-and-aws-lambda/
@app.route("/text", methods=['POST'])
def get_text():
    print("inside get_text")
    
    # Parse request json and validate required arguments
    request_body = request.get_json()
    if not request_body:
        print("empty request body")
        return create_flask_response_with_cors_headers(response=create_error_response("empty request body"), status=status.HTTP_400_BAD_REQUEST)
    
    conversation_id = request_body.get("conversationId")
    if not conversation_id or conversation_id != 1: # Only supporting one conversation for now
        print("invalid conversation id")
        return create_flask_response_with_cors_headers(response=create_error_response("invalid conversation id"), status=status.HTTP_400_BAD_REQUEST)
    
    step_number = request_body.get("stepNumber")
    if not step_number or step_number not in range(1, MAX_CONVERSATION_STEP_NUMBER + 1):
        print("invalid step number")
        return create_flask_response_with_cors_headers(response=create_error_response("invalid step number"), status=status.HTTP_400_BAD_REQUEST)
    
    attempt_number = request_body.get("attemptNumber")
    if not attempt_number or not 1 <= attempt_number <= MAX_ANSWER_ATTEMPTS:
        print("invalid attempt number")
        return create_flask_response_with_cors_headers(response=create_error_response("invalid attempt number"), status=status.HTTP_400_BAD_REQUEST)
    
    text = request_body.get("text")
    # TODO add text cleaning for SSNs, etc here. We should try to add something on front-end as well.
    if not text:
        print("invalid text")
        return create_flask_response_with_cors_headers(response=create_error_response("invalid text"), status=status.HTTP_400_BAD_REQUEST)

    # Pass in text to context classification model to determine whether it is on topic
    # invoke_endpoint documentation:
    # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sagemaker-runtime/client/invoke_endpoint.html
    try:
        input = create_cc_input(CONVERSATION_SCRIPTS[conversation_id][step_number])
        print("calling cc endpoint with the following question input: " + input)
        cc_question_response = runtime.invoke_endpoint(
            EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
            ContentType='application/json',
            Body=input)
        cc_question_embedding = json.loads(cc_question_response['Body'].read().decode())
        
        input = create_cc_input(text)
        print("calling cc endpoint with the following user answer input: " + input)
        cc_user_answer_response = runtime.invoke_endpoint(
            EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
            ContentType='application/json',
            Body=create_cc_input(text))
        cc_user_answer_embedding = json.loads(cc_user_answer_response['Body'].read().decode())
    except Exception as err:
        print(f"unexpected error calling sagemaker - content classification model: {err=}, {type(err)=}")
        return flask.Response(response=create_error_response("exception calling sagemaker - content classification"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    
    on_topic = is_user_input_on_topic(cc_question_embedding, cc_user_answer_embedding)
    if not on_topic:
        print("off topic")
        return create_flask_response_with_cors_headers(
            response=create_get_text_response(
                conversation_id=1,
                step_number=step_number, 
                attempt_number=attempt_number, 
                on_topic=False
            ), 
            status=status.HTTP_200_OK)
    
    # Pass in input to GEC model to get text annotated with grammatical errors
    try:
        input = create_gec_input(text)
        print("calling gec endpoint with the following input: " + input)
        gec_response = runtime.invoke_endpoint(
            EndpointName=GEC_ENDPOINT_NAME,
            ContentType='application/json',
            Body=input)
        gec_result = json.loads(gec_response['Body'].read().decode())
        print("response from gec: " + str(gec_result))
    except Exception as err:
        print(f"unexpected error calling sagemaker - GEC: {err=}, {type(err)=}")
        return flask.Response(
            response=create_error_response("exception calling sagemaker - gec"), 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR, 
            mimetype='application/json')

    # Pass in input to LLM model to create chatbot response
    try:
        llm_response_text = None
        corrections_dict, found_error = create_gec_correction_dictionary(gec_result)

        if found_error:
            print("found GEC errors")
            input = create_llm_input(create_llm_gec_scaffolding_input(text, corrections_dict))
            print("calling llm endpoint with the following input: " + input)
            llm_response = runtime.invoke_endpoint(
                EndpointName=LLM_ENDPOINT_NAME,
                ContentType='application/json',
                Body=input)
            llm_response_text = parse_llm_response(llm_response)
        else:
            print("no GEC errors found")
        
        if llm_response_text is not None:
            llm_text = f"Veo, quieres decir '{llm_response_text}'."
        else:
            # Otherwise, we have model errors and we're at the end of the conversation.
            # The text won't be displayed anyways so we default to empty string.
            llm_text = ""
    except Exception as err:
        print(f"unexpected error calling sagemaker - LLM: {err=}, {type(err)=}")
        return create_flask_response_with_cors_headers(response=create_error_response("exception calling sagemaker - LLM"), status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    return flask.Response(response=create_get_text_response(
        conversation_id=conversation_id,
        step_number=step_number, 
        attempt_number=attempt_number, 
        on_topic=True,
        llm_text=llm_text,
        gec_response=gec_result['model_response']
    ), status=status.HTTP_200_OK, mimetype='application/json')
  
# TODO put these functions into helper files for sorting
def is_user_input_on_topic(question_embedding, user_answer_embedding):
    # Calculating the cosine similarity between question and answer
    similarity_score = 1 - distance.cosine(user_answer_embedding[0][0], question_embedding[0][0])    
    print("similarity score: " + str(similarity_score))
    return bool(similarity_score > CC_CUTOFF_THRESHOLD)

def create_flask_response_with_cors_headers(response, status):
    response = flask.Response(response=response, 
                              status=status, 
                              mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST"
    return response
    
def create_error_response(text):
    return json.dumps({'error': text})

def parse_llm_response(response):
    response_body = json.loads(response['Body'].read().decode('utf-8'))
    generated_text = response_body[0]["generated_text"]
    print("response from llm: " + repr(generated_text))
    segmenter = Segmenter(language='es', clean=False)
    sents = segmenter.segment(generated_text)
    response = sents[0].strip() + ' ' + sents[1].strip() if sents[0].strip() == 'Veo.' else sents[0].strip()
    return response

# TODO remove if you don't need this
def create_gec_scaffolding_prompt(gec_input):
    return f"Respond with 'Veo. Quieres decir " + gec_input + "' and nothing else:"

def create_gec_correction_dictionary(gec_result):
    corrections = {
        "B-na": [], # B-na = Number disagreement
        "B-ga": [], # B-ga = Gender disagreement
    }
    found_error = False
    
    # Example GEC input: { "result": [{"Tengo": "O"}, {"una": "O"}, {"chaquetas": "B-na"}], "model_response": "a string version of what model returns"}
    gec_corrections = gec_result['result']
    for correction_pair in gec_corrections:
        for word, correction in correction_pair.items():
            if correction != "O" and correction in corrections: # O = No error
                found_error = True
                corrections[correction].append(word)
    
    print(str(corrections))
    return (corrections, found_error)

def create_llm_gec_scaffolding_input(text, corrections_dict):
    corrections_prompt = ""
    
    for correction, word_list in corrections_dict.items():
        for word in word_list:
            if len(corrections_prompt) > 0:
                corrections_prompt += "; "
            corrections_prompt += f"{word} has a {GEC_RESPONSE_TRANSLATION[correction]} error"
                        
    return f"""You are a Spanish teacher. You respond in Spanish.
    
    ### Input:\nIn '{text}', {corrections_prompt}. Return the correction and nothing else:
    ### Respond":"""
    
def create_llm_input(inputs):
    payload = {
        "inputs": f"{inputs}",
        "parameters": {
            "max_new_tokens": 64,
            "top_k": 50,
            "top_p": 0.95,
            "do_sample": True,
            "temperature": 0.001, # Higher is more variance in answers
            "stop": ["<|endoftext|>", "</s>"]
        }
    }
    return json.dumps(payload)

def create_gec_input(text):
    return json.dumps({'line': text})

def create_cc_input(text):
    return json.dumps({'inputs': text})

def create_get_text_response(conversation_id, step_number, attempt_number, on_topic, llm_text=None, gec_response=None):
    print("creating response body")
    next_step, text = None, None
        
    if on_topic == False:
        if attempt_number < MAX_ANSWER_ATTEMPTS:
            # Incorrect response with remaining attempts
            text = OFF_TOPIC_TEXT_RESPONSE + " " + get_next_question(conversation_id, step_number)
            next_step = NextStep.PROMPT_FOR_ANOTHER_ATTEMPT
        elif attempt_number == MAX_ANSWER_ATTEMPTS:
            text = OFF_TOPIC_TEXT_RESPONSE + " [You have completed three attempts for this question. Adios.]" # TODO put some explanation here
            next_step = NextStep.END_CONVERSATION
    else:
        if step_number == MAX_CONVERSATION_STEP_NUMBER:
            text = llm_text + " " + "Adios."
            next_step = NextStep.END_CONVERSATION
        else:
            if llm_text != "":
                text = llm_text + " " + get_next_question(conversation_id, step_number + 1)
            else:
                text = get_next_question(conversation_id, step_number + 1)
            next_step = NextStep.MOVE_TO_NEXT_CONVERSATION_PAIR
       
    response_body = json.dumps({'onTopic': on_topic, 'nextStep': str(next_step), 'text': text, 'gec_response': gec_response}) 
    print("response body: " + response_body)
    return response_body

def get_next_question(conversation_id, step_number):
    roll = random.randint(0, 1)
    if roll == 0:
        return ALTERNATIVE_CONVERSATION_WORDINGS[conversation_id][step_number][0]
    else:
        return CONVERSATION_SCRIPTS[conversation_id][step_number]
    
def handler(event, context):
    return awsgi.response(app, event, context) # Allows us to use WSGI middleware with API Gateway