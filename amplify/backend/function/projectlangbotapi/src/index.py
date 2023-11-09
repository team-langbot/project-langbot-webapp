from flask_cors import CORS
from flask import Flask, request
from flask_api import status
import flask
import awsgi, boto3, json
from enum import Enum
import pandas as pd
import chromadb
from chromadb.utils import embedding_functions

TEXT_ROUTE = "/text"

CONTENT_CLASSIFICATION_ENDPOINT_NAME = "TODO"
GEC_ENDPOINT_NAME = "sm-gec-aws"
LLM_ENDPOINT_NAME = "huggingface-pytorch-tgi-inference-2023-11-05-23-05-40-414"

MAX_CONVERSATION_STEP_NUMBER = 4 # Consider making this dynamic if extending to additional conversations.
MAX_ANSWER_ATTEMPTS = 2

TOPIC_DISTANCE_THRESHOLD = .5 # TODO need to update

OFF_TOPIC_TEXT_RESPONSE = "Lo siento, ese no era el tema." # "Sorry, that wasn't on topic."
TRY_AGAIN_RESPONSE = "Inténtalo de nuevo." # "Please try again."

class NextStep(Enum):
    MOVE_TO_NEXT_CONVERSATION_PAIR = 1
    PROMPT_FOR_ANOTHER_ATTEMPT = 2
    END_CONVERSATION = 3

CONVERSATION_SCRIPTS = {
    1: {
        # TODO update script 1 so that it doesn't use any input from the user
        1: '¡Buenos días! Me llamo Thomas. ¿Y tú?',
        2: '¡Encantada de conocerte! ¿Cómo te va?',
        3: 'Vivo en la Ciudad de México. ¿De dónde eres tú?',
        4: 'Ah, eres de Pennsylvania. Es un estado precioso.'
    },
    2: {
        1: '¡Buenos días! Bienvenido/a a Brew Haven. Solo tenemos café hoy. ¿Te gusta café?',
        2: '¿Te gusta llevar dos cafés con un 50% de descuento en el segundo?',
        3: 'Aquí tienes tus dos cafés. Tu total es de 50 pesos. ¿Vas a usar tarjeta de crédito?',
        4: 'Gracias. Hasta pronto.'
    },
}

# Initialize Flask application and enable CORS
app = Flask(__name__)
CORS(app)
runtime = boto3.client('runtime.sagemaker')
vectorDb = None

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
# 	“nextStep”: (int) 1, // Can be 1 - 3, 1 = move to next conversation pair, 2 = prompt for errors, 3 = end conversation
# 	“text”: (string) “Bueno! Que te gusta leer?” // This could either come back from the LLM, if the context was good, or could be one of a few hard-coded responses prompting for a new input from the user. We can store these responses in code right now, an optimization as we expand to different languages would be to store these in a database.
# // errors: list of errors to show user – attempt 1, high level error, attempt 2, more information
# }

# Code reference:
# https://aws.amazon.com/blogs/machine-learning/call-an-amazon-sagemaker-model-endpoint-using-amazon-api-gateway-and-aws-lambda/
@app.route(TEXT_ROUTE, methods=['POST'])
def get_text():
    print("inside get_text")
    response = flask.Response(response=createErrorResponse("empty request body"), 
                              status=status.HTTP_200_OK, 
                              mimetype='application/json')
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,X-Amz-Date,X-Amz-Security-Token,Authorization,X-Api-Key,X-Requested-With,Accept,Access-Control-Allow-Methods,Access-Control-Allow-Origin,Access-Control-Allow-Headers"
    response.headers["Access-Control-Allow-Methods"] = "OPTIONS,POST"
    return response

    
    # Parse request json and validate required arguments
    request_body = request.get_json()
    if not request_body:
        print("empty request body")
        return flask.Response(response=createErrorResponse("empty request body"), status=status.HTTP_400_BAD_REQUEST, mimetype='application/json')
    
    conversation_id = request_body.get("conversationId")
    if not conversation_id or conversation_id not in (1, 2):
        print("invalid conversation id")
        return flask.Response(response=createErrorResponse("invalid conversation id"), status=status.HTTP_400_BAD_REQUEST, mimetype='application/json')
    
    step_number = request_body.get("stepNumber")
    if not step_number or step_number not in range(1, MAX_CONVERSATION_STEP_NUMBER):
        print("invalid step number")
        return flask.Response(response=createErrorResponse("invalid step number"), status=status.HTTP_400_BAD_REQUEST, mimetype='application/json')
    
    attempt_number = request_body.get("attemptNumber")
    if not attempt_number or not 0 < attempt_number <= MAX_ANSWER_ATTEMPTS:
        print("invalid attempt number")
        return flask.Response(response=createErrorResponse("invalid attempt number"), status=status.HTTP_400_BAD_REQUEST, mimetype='application/json')
    
    text = request_body.get("text")
    # TODO add text cleaning for SSNs, etc here. We should try to add something on front-end as well.
    if not text:
        print("invalid text")
        return flask.Response(response=createErrorResponse("invalid text"), status=status.HTTP_400_BAD_REQUEST, mimetype='application/json')

    # TODO you might be able to remove this block if you can do on topic in the lambda
    # Pass in text to context classification model to determine whether it is on topic
    # invoke_endpoint documentation:
    # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sagemaker-runtime/client/invoke_endpoint.html
    # try:
    #     content_classification_response = runtime.invoke_endpoint(
    #         EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
    #         ContentType='application/json',
    #         Body=createContentClassificationInput(conversation_id, step_number, text))
    # except Exception as err:
    #     print(f"unexpected error calling sagemaker - content classification model: {err=}, {type(err)=}")
    #     return flask.Response(response=createErrorResponse("exception calling sagemaker - content classification"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    
    # content_classification_result = json.loads(content_classification_response['Body'].read().decode())
    # if content_classification_result is None:
    #     print("content classification model error - no response")
    #     return flask.Response(response=createErrorResponse("content classification model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    # on_topic = content_classification_result.get("onTopic")
    # if on_topic is None:
    #     print(f"content classification model error - unexpected response format: {content_classification_result=}")
    #     return flask.Response(response=createErrorResponse("content classification model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')
    # elif on_topic == False:
    #     print("off topic")
    #     return flask.Response(response=createGetTextResponse(
    #         conversation_id,
    #         step_number, 
    #         attempt_number, 
    #         on_topic
    #         ), status=status.HTTP_200_OK, mimetype='application/json')
    
    # on_topic = text_is_on_topic(text)
    # if not on_topic:
    #     print("off topic")
    #     return flask.Response(
    #         response=createGetTextResponse(
    #         conversation_id,
    #         step_number, 
    #         attempt_number, 
    #         on_topic
    #         ), status=status.HTTP_200_OK, mimetype='application/json')
    
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
            Body=createLLMInput(text, "")) # TODO pass in annotated text here
    except Exception as err:
        print(f"unexpected error calling sagemaker - LLM: {err=}, {type(err)=}")
        return flask.Response(response=createErrorResponse("exception calling sagemaker - LLM"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json') 
    
    llm_result = json.loads(llm_response['Body'].read().decode('utf-8'))
    if llm_result is None:
        print("llm model error - no response")
        return flask.Response(response=createErrorResponse("llm model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')

    llm_text = llm_result[0].get("generated_text")
    if not llm_text:
        print(f"llm model error - unexpected response format: {llm_result=}")
        return flask.Response(response=createErrorResponse("llm model error"), status=status.HTTP_500_INTERNAL_SERVER_ERROR, mimetype='application/json')

    # TODO remove the below line after testing
    return flask.Response(response=llm_text, status=status.HTTP_200_OK, mimetype='application/json')

    # return flask.Response(response=createGetTextResponse(
    #     conversation_id,
    #     step_number, 
    #     attempt_number, 
    #     on_topic,
    #     llm_text), status=status.HTTP_200_OK, mimetype='application/json')

def text_is_on_topic(text):
    if not vectorDb:
        vectorDb = create_chroma_db(
            [
                # TODO need to update this input
                'My name Jess', 
                'I am fine. Thank you. And you? ', 
                'I from Pennsylvania. '
             ], 
            "conversationally")
        
    results = vectorDb.query(
        query_texts=[text],
        n_results=1
    )
    print(results)
    similarity_score = results['distances'][0]
    return similarity_score < TOPIC_DISTANCE_THRESHOLD
    
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

def createContentClassificationInput(conversation_id, step_number, text):
    return json.dumps({'prompt': CONVERSATION_SCRIPTS[conversation_id][step_number], 'response': text})

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

def create_chroma_db(documents, name):
    chroma_client = chromadb.Client()
    # In-memory chroma with saving/loading to disk
    sentence_transformer_ef = embedding_functions.SentenceTransformerEmbeddingFunction(model_name="all-MiniLM-L6-v2")
    db = chroma_client.create_collection(name=name, embedding_function=sentence_transformer_ef)
    for i,d in enumerate(documents):
        db.add(
            documents=d,
            metadatas = {'aq_pair': d},
            ids=str(i)
        )
    return db
    
def handler(event, context):
    return awsgi.response(app, event, context) # Allows us to use WSGI middleware with API Gateway