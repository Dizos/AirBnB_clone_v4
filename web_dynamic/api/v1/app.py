from flask_cors import CORS
from models import storage
from api.v1.views import app_views
from os import environ
from flask import Flask, render_template, make_response, jsonify

app = Flask(__name__)
app.register_blueprint(app_views)
# Update CORS configuration
CORS(app, resources={r"/api/v1/*": {"origins": "*"}})
