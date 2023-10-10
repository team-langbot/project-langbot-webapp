from flask_cors import CORS
from flask import Flask, jsonify, request
import awsgi

# Initialize Flask application and enable CORS
app = Flask(__name__)
CORS(app)

# Constant variable with path prefix
TEXT_ROUTE = "/text"

@app.route(TEXT_ROUTE, methods=['GET'])
def get_text():
    # TODO replace this with actual business logic
    return jsonify(message="hello world")

def handler(event, context):
    # AWS GI allows us use WSGI middleware with API Gateway
    return awsgi.response(app, event, context)