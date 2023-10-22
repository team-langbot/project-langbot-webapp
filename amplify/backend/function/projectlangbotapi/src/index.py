from flask_cors import CORS
from flask import Flask, jsonify, request
from flask_api import status
import awsgi, boto3

# Initialize Flask application and enable CORS
app = Flask(__name__)
CORS(app)

runtime = boto3.client('runtime.sagemaker')

# Constant variable with path prefix
TEXT_ROUTE = "/text"


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
# 	“correct”: (bool) true/false, // Used to increment the attempt number on the front-end
# 	“nextStep”: (int) 1, // Can be 1 - 3, 1 = move to next conversation pair, 2 = prompt for errors, 3 = end conversation
# 	“text”: (string) “Bueno! Que te gusta leer?” // This could either come back from the LLM, if the context was good, or could be one of a few hard-coded responses prompting for a new input from the user. We can store these responses in code right now, an optimization as we expand to different languages would be to store these in a database.
# // errors: list of errors to show user – attempt 1, high level error, attempt 2, more information
# }


# https://aws.amazon.com/blogs/machine-learning/call-an-amazon-sagemaker-model-endpoint-using-amazon-api-gateway-and-aws-lambda/
@app.route(TEXT_ROUTE, methods=['GET'])
def get_text():
    # Grab the request json and required arguments
    request_body = request.get_json()
    if not request_body:
        return "", status.HTTP_400_BAD_REQUEST
    
    conversation_id = request_body.get("conversationId")
    if not conversation_id or conversation_id not in (1, 2):
        return "invalid conversation id", status.HTTP_400_BAD_REQUEST
    
    step_number = request_body.get("stepNumber")
    if not step_number or step_number not in range(0, 3):
        return "invalid step number", status.HTTP_400_BAD_REQUEST
    
    attempt_number = request_body.get("attemptNumber")
    if not attempt_number or attempt_number < 0:
        return "invalid attempt number", status.HTTP_400_BAD_REQUEST
    
    if attempt_number >= 3:
        return createGetTextResponse(correct=False, nextStep = 1, text="sorry, let's move on...")
    
    # Pass in input to context classification model, if not on topic return
    # Pass in input to GEC model, if there is a grammatical error take note
    # Pass in input to LLM combining output from GEC model

    return createGetTextResponse(correct=True, nextStep=1, text="sample response from conversationally")

def createGetTextResponse(correct, nextStep, text):
    return json.dumps({'correct': correct, 'nextStep': nextStep, 'text': text})


def handler(event, context):
    # AWS GI allows us use WSGI middleware with API Gateway
    return awsgi.response(app, event, context)