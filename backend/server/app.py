#!/usr/bin/env python3

from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import desc
from dotenv import load_dotenv
import os

from models import db, Design

load_dotenv()

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get("DB_URI")

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
    data = request.json.get('data')
    if not data:
        return jsonify({"error" : "Design data is required"}), 400

    design = Design(data=data)
    db.session.add(design)
    db.session.commit()
    return jsonify({"id": design.id, "public_url": f"/embed/{design.id}"}), 201


@app.route('/designs/<int:id>', methods=['GET'])
def get_design(id):
    design = Design.query.get(id)
    if not design:
        return jsonify({"error": "Design not found"}), 404
    return jsonify({"id": design.id, "data": design.data})


@app.route('/embed/<int:id>', methods=['GET'])
def embed_design(id):
    design= Design.query.get(id)
    if not design:
        return jsonify({"error": "Design not found"}), 404
    return f"<iframe src='/designs/{id}'></iframe>", 200



if __name__ == "__main__":
    app.run(port=5555, debug=True)