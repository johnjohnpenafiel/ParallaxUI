#!/usr/bin/env python3

from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import desc
from dotenv import load_dotenv
import os

from datetime import datetime

from models import db, Design

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI")
BASE_URL = os.getenv("BASE_URL", "http://localhost:5555")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.json.compact = False

CORS(app)

migrate = Migrate(app, db)

db.init_app(app)


@app.route('/')
def index ():
    return "index for Parallax"


@app.route('/designs', methods=['POST'])
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
    new_design.public_url = f"{BASE_URL}/embed/{new_design.id}"

    db.session.commit()

    return jsonify({
        "id": new_design.id,
        "public_url": new_design.public_url
    }), 201


@app.route('/designs/<int:id>', methods=['GET'])
def get_design(id):
    design = Design.query.get(id)
    if not design:
        return jsonify({"error": "Design not found"}), 404
    return jsonify({"id": design.id, "data": design.data})


if __name__ == "__main__":
    app.run(port=5555, debug=True)