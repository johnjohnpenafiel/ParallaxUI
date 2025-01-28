#!/usr/bin/env python3

from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import desc
from dotenv import load_dotenv
import os

from datetime import datetime

from models import db, Design

env = os.getenv("FLASK_ENV", "development")
env_file = ".env.development" if env == "development" else ".env.production"
load_dotenv(env_file)

# ENVIROMENT VARIABLES
DATABASE = os.environ.get("DB_URI")
API_URL = os.environ.get("API_URL")
DEBUG = os.environ.get("FLASK_DEBUG")
PORT = os.environ.get("FLASK_RUN_PORT")

# ENVIROMENT VARIABLES LOGS
print("-----ENVIROMENT VARIABLES-----")
print("Enviroment:", os.environ.get("FLASK_ENV"))
print("Database:", DATABASE)
print("API:", os.environ.get("API_URL"))
print("Base Url:", os.environ.get("API_URL"))
print("Debug Mode:", DEBUG)


application = Flask(__name__)
application.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
application.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
application.json.compact = False

CORS(application)
migrate = Migrate(application, db)
db.init_app(application)


@application.route('/')
def index ():
    return "Index for Parallax UI"


@application.route('/designs', methods=['POST'])
def create_design():
    request_data = request.get_json()

    if not request_data or 'data' not in request_data:
        return jsonify({"error": "Invalid data"}), 400

    if 'data' in request_data and not isinstance(request_data['data'], dict):
        return jsonify({"error": "Data must be a dictionary"}), 400
    
    new_design = Design(
        name=request_data.get('name'),
        data=request_data['data'],
        public_url=None,  # Placeholder
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow(),
    )

    db.session.add(new_design)
    db.session.flush() # Generate the ID without committing

    # Generate the public URL after the object is added but before committing
    new_design.public_url = f"{API_URL}/embed/{new_design.id}"

    db.session.commit()

    return jsonify({
        "id": new_design.id,
        "public_url": new_design.public_url
    }), 201


@application.route('/designs/<int:id>', methods=['GET'])
def get_design(id):
    design = Design.query.get(id)
    if not design:
        return jsonify({"error": "Design not found"}), 404
    return jsonify({"id": design.id, "data": design.data})


if __name__ == "__main__":
    application.run(port=PORT)