from flask_cors import CORS
from flask import Flask, request
from flask_api import status
import flask
import awsgi, boto3, json
from enum import Enum
from scipy.spatial import distance

TEXT_ROUTE = "/text"

CONTENT_CLASSIFICATION_ENDPOINT_NAME = "sm-cc-aws"
GEC_ENDPOINT_NAME = "sm-gec-aws"
LLM_ENDPOINT_NAME = "sm-llm-aws"

MAX_CONVERSATION_STEP_NUMBER = 5
MAX_ANSWER_ATTEMPTS = 2

CC_CUTOFF_THRESHOLD = 0.75

OFF_TOPIC_TEXT_RESPONSE = "Lo siento, ese no era el tema." # "Sorry, that wasn't on topic."
TRY_AGAIN_RESPONSE = "Inténtalo de nuevo." # "Please try again."

class NextStep(Enum):
    MOVE_TO_NEXT_CONVERSATION_PAIR = 1
    PROMPT_FOR_ANOTHER_ATTEMPT = 2
    END_CONVERSATION = 3

CONVERSATION_SCRIPTS = {
    1: {
        1: 'Hola, ¿cómo estás?',
        2: '¿Estás libre hoy?',
        3: '¿Quieres ir de compras conmigo?',
        4: '¿A qué hora te gustaría ir?',
        5: 'Vale, nos vemos luego.'
    }
}

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
@app.route(TEXT_ROUTE, methods=['POST'])
def get_text():
    print("inside get_text")
    
    # Parse request json and validate required arguments
    request_body = request.get_json()
    if not request_body:
        print("empty request body")
        return create_flask_response_with_cors_headers(response=createErrorResponse("empty request body"), status=status.HTTP_400_BAD_REQUEST)
    
    conversation_id = request_body.get("conversationId")
    if not conversation_id or conversation_id not in (1):
        print("invalid conversation id")
        return create_flask_response_with_cors_headers(response=createErrorResponse("invalid conversation id"), status=status.HTTP_400_BAD_REQUEST)
    
    step_number = request_body.get("stepNumber")
    if not step_number or step_number not in range(1, MAX_CONVERSATION_STEP_NUMBER):
        print("invalid step number")
        return create_flask_response_with_cors_headers(response=createErrorResponse("invalid step number"), status=status.HTTP_400_BAD_REQUEST)
    
    attempt_number = request_body.get("attemptNumber")
    if not attempt_number or not 0 < attempt_number <= MAX_ANSWER_ATTEMPTS:
        print("invalid attempt number")
        return create_flask_response_with_cors_headers(response=createErrorResponse("invalid attempt number"), status=status.HTTP_400_BAD_REQUEST)
    
    text = request_body.get("text")
    # TODO add text cleaning for SSNs, etc here. We should try to add something on front-end as well.
    if not text:
        print("invalid text")
        return create_flask_response_with_cors_headers(response=createErrorResponse("invalid text"), status=status.HTTP_400_BAD_REQUEST)

    # Pass in text to context classification model to determine whether it is on topic
    # invoke_endpoint documentation:
    # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sagemaker-runtime/client/invoke_endpoint.html
    try:
        input = createContentClassificationInput(CONVERSATION_SCRIPTS[1][step_number])
        print("calling cc endpoint with the following question input: " + str(input))
        cc_question_response = runtime.invoke_endpoint(
            EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
            ContentType='application/json',
            Body=input)
        cc_question_embedding = json.loads(cc_question_response['Body'].read().decode())
        
        input = createContentClassificationInput(text)
        print("calling cc endpoint with the following user answer input: " + str(input))
        cc_user_answer_response = runtime.invoke_endpoint(
            EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
            ContentType='application/json',
            Body=createContentClassificationInput(text))
        cc_user_answer_embedding = json.loads(cc_user_answer_response['Body'].read().decode())
    except Exception as err:
        print(f"unexpected error calling sagemaker - content classification model: {err=}, {type(err)=}")
        return flask.Response(response=createErrorResponse("exception calling sagemaker - content classification"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    
    on_topic = text_is_on_topic(cc_question_embedding, cc_user_answer_embedding)
    if not on_topic:
        print("off topic")
        return flask.Response(response=createGetTextResponse(
            conversation_id,
            step_number, 
            attempt_number, 
            on_topic
            ), status=status.HTTP_200_OK, mimetype='application/json')
    
    # Pass in input to GEC model to get text annotated with grammatical errors
    # try:
    #     gec_response = runtime.invoke_endpoint(
    #         EndpointName=GEC_ENDPOINT_NAME,
    #         ContentType='application/json',
    #         Body=createGECInput(text))
    # except Exception as err:
    #     print(f"unexpected error calling sagemaker - GEC: {err=}, {type(err)=}")
    #     return flask.Response(response=createErrorResponse("exception calling sagemaker - gec"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
        
    # # TODO remove the below line after testing
    # return flask.Response(response=gec_response, status=status.HTTP_200_OK, mimetype='application/json')

    # gec_result = json.loads(gec_response['Body'].read().decode())
    # if gec_result is None:
    #     print("gec model error - no response")
    #     return flask.Response(response=createErrorResponse("gec model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    # annotated_text = gec_result.get("annotated_text") 
    # if not annotated_text:
    #     print(f"gec model error - unexpected response format: {gec_result=}")
    #     return flask.Response(response=createErrorResponse("empty request body"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    
    # # Pass in input to LLM with output from GEC model and original text to get a response
    # try:
    #     llm_response = runtime.invoke_endpoint(
    #         EndpointName=LLM_ENDPOINT_NAME,
    #         ContentType='application/json',
    #         Body=createLLMInput(text, annotated_text))
    # except Exception as err:
    #     print(f"unexpected error calling sagemaker - LLM: {err=}, {type(err)=}")
    #     return flask.Response(response=createErrorResponse("exception calling sagemaker - LLM"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json') 
    
    try:
        llm_response = runtime.invoke_endpoint(
            EndpointName=LLM_ENDPOINT_NAME,
            ContentType='application/json',
            Body=createLLMInput(text, "")) # TODO pass in annotated text here once GEC is working
    except Exception as err:
        print(f"unexpected error calling sagemaker - LLM: {err=}, {type(err)=}")
        return create_flask_response_with_cors_headers(response=createErrorResponse("exception calling sagemaker - LLM"), status=status.HTTP_500_INTERNAL_SERVER_ERROR) 
    
    llm_result = json.loads(llm_response['Body'].read().decode('utf-8'))
    if llm_result is None:
        print("llm model error - no response")
        return create_flask_response_with_cors_headers(response=createErrorResponse("llm model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    llm_text = llm_result[0].get("generated_text")
    if not llm_text:
        print(f"llm model error - unexpected response format: {llm_result=}")
        return create_flask_response_with_cors_headers(response=createErrorResponse("llm model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # TODO remove the below line after testing
    return create_flask_response_with_cors_headers(response=llm_text, status=status.HTTP_200_OK)

    # return flask.Response(response=createGetTextResponse(
    #     conversation_id,
    #     step_number, 
    #     attempt_number, 
    #     on_topic,
    #     llm_text), status=status.HTTP_200_OK, mimetype='application/json')
  
def text_is_on_topic(question_embedding, user_answer_embedding):
    # Calculating the cosine similarity between question and answer
    similarity_score = 1 - distance.cosine(user_answer_embedding[0][0], question_embedding[0][0])    
    print("similarity score: " + str(similarity_score))
    return similarity_score > CC_CUTOFF_THRESHOLD

def create_flask_response_with_cors_headers(response, status):
    response = flask.Response(response=response, 
                              status=status, 
                              mimetype='application/json')
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST"
    return response
    
def createErrorResponse(text):
    return json.dumps({'error': text})

def createLLMInput(text, annotated_text):
    # TODO modify to use inputs and update paramters
    prompt = "You are a Spanish language teacher, and the user made mistakes. You respond with 'ahh, you mean,...' and repeat what the user said in the correct format. Don't further explain, and keep your response in one short sentence."
    user_input = "\n\nUser:'Bien, gracias. ¿Y a tú?'"
    prompt = prompt + user_input
    payload = {
        "inputs": prompt,
        "parameters": {
            "do_sample":True, 
            "temperature":0.01, 
            "top_k":50, 
            "top_p":0.95
        }
    }
    return json.dumps(payload)

def createGECInput(text):
    return json.dumps({'text': text})

def createContentClassificationInput(text):
    return json.dumps({'inputs': text})

def createGetTextResponse(conversation_id, step_number, attempt_number, on_topic, llm_text=None):
    next_step, text = None, None
        
    if on_topic == False:
        if attempt_number < 2:
            # Incorrect response with remaining attempts
            # TODO proper string concatenation
            # TODO should this error text be in Spanish?
            # TODO initial how-to can also tell user what phrases we will be using for correction like below
            text = OFF_TOPIC_TEXT_RESPONSE + TRY_AGAIN_RESPONSE
            next_step = NextStep.PROMPT_FOR_ANOTHER_ATTEMPT
        elif step_number == MAX_CONVERSATION_STEP_NUMBER:
            text = OFF_TOPIC_TEXT_RESPONSE
            next_step = NextStep.END_CONVERSATION
        else:
            text = OFF_TOPIC_TEXT_RESPONSE + CONVERSATION_SCRIPTS[conversation_id][step_number + 1]
            next_step = NextStep.MOVE_TO_NEXT_CONVERSATION_PAIR
    else:
        if step_number == MAX_CONVERSATION_STEP_NUMBER:
            text = llm_text
            next_step = NextStep.END_CONVERSATION
        else:
            text = llm_text + CONVERSATION_SCRIPTS[conversation_id][step_number + 1]
            next_step = NextStep.MOVE_TO_NEXT_CONVERSATION_PAIR
        
    return json.dumps({'onTopic': on_topic, 'nextStep': next_step, 'text': text})
    
def handler(event, context):
    return awsgi.response(app, event, context) # Allows us to use WSGI middleware with API Gateway