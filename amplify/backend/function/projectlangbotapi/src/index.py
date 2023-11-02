from flask_cors import CORS
from flask import Flask, request
from flask_api import status
import awsgi, boto3, json
from enum import Enum

TEXT_ROUTE = "/text"

CONTENT_CLASSIFICATION_ENDPOINT_NAME = "TODO"
GEC_ENDPOINT_NAME = "TODO"
LLM_ENDPOINT_NAME = "TODO"

MAX_CONVERSATION_STEP_NUMBER = 4 # Consider making this dynamic if extending to additional conversations.
MAX_ANSWER_ATTEMPTS = 2

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
@app.route(TEXT_ROUTE, methods=['GET'])
def get_text():
    # Parse request json and validate required arguments
    request_body = request.get_json()
    if not request_body:
        return "empty request body", status.HTTP_400_BAD_REQUEST
    
    conversation_id = request_body.get("conversationId")
    if not conversation_id or conversation_id not in (1, 2):
        return "invalid conversation id", status.HTTP_400_BAD_REQUEST
    
    step_number = request_body.get("stepNumber")
    if not step_number or step_number not in range(1, MAX_CONVERSATION_STEP_NUMBER):
        return "invalid step number", status.HTTP_400_BAD_REQUEST
    
    attempt_number = request_body.get("attemptNumber")
    if not attempt_number or not 0 < attempt_number <= MAX_ANSWER_ATTEMPTS:
        return "invalid attempt number", status.HTTP_400_BAD_REQUEST
    
    text = request_body.get("text")
    # TODO add text cleaning for SSNs, etc here. We should try to add something on front-end as well.
    if not text:
        return "invalid text", status.HTTP_400_BAD_REQUEST
    
    # Pass in text to context classification model to determine whether it is on topic
    # invoke_endpoint documentation:
    # https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/sagemaker-runtime/client/invoke_endpoint.html
    content_classification_response = runtime.invoke_endpoint(
        EndpointName=CONTENT_CLASSIFICATION_ENDPOINT_NAME,
        ContentType='application/json',
        Body=createContentClassificationInput(conversation_id, step_number, text))
    
    content_classification_result = json.loads(content_classification_response['Body'].read().decode())
    if content_classification_result is None:
        return "content classification model error", status.HTTP_500_INTERNAL_SERVER_ERROR
    on_topic = content_classification_result.get("onTopic")
    if on_topic is None:
        return "content classification model error", status.HTTP_500_INTERNAL_SERVER_ERROR
    elif on_topic == False:
        return createGetTextResponse(
            conversation_id,
            step_number, 
            attempt_number, 
            on_topic
            ), status.HTTP_200_OK
    
    # Pass in input to GEC model to get text annotated with grammatical errors
    gec_response = runtime.invoke_endpoint(
        EndpointName=GEC_ENDPOINT_NAME,
        ContentType='application/json',
        Body=createGECInput(text))
    
    gec_result = json.loads(gec_response['Body'].read().decode())
    if gec_result is None:
        return "gec model error", status.HTTP_500_INTERNAL_SERVER_ERROR
    annotated_text = gec_result.get("annotated_text") 
    if not annotated_text:
        return "gec model error", status.HTTP_500_INTERNAL_SERVER_ERROR
    
    # Pass in input to LLM with output from GEC model and original text to get a response
    llm_response = runtime.invoke_endpoint(
        EndpointName=LLM_ENDPOINT_NAME,
        ContentType='application/json',
        Body=createLLMInput(text, annotated_text))
    
    llm_result = json.loads(llm_response['Body'].read().decode())
    if llm_result is None:
        return "llm model error", status.HTTP_500_INTERNAL_SERVER_ERROR
    llm_text = gec_result.get("response")
    if not llm_text:
        return "llm model error", status.HTTP_500_INTERNAL_SERVER_ERROR

    return createGetTextResponse(
        conversation_id,
        step_number, 
        attempt_number, 
        on_topic,
        llm_text), status.HTTP_200_OK

def createLLMInput(text, annotated_text):
    return json.dumps({'text': text, 'annotated_text': annotated_text})

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
    
def handler(event, context):
    return awsgi.response(app, event, context) # Allows us to use WSGI middleware with API Gateway