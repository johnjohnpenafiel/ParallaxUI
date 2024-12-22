#!/usr/bin/env python3

from flask import Flask, request, make_response, session, jsonify
from flask_migrate import Migrate
from flask_cors import CORS
from sqlalchemy import desc
from dotenv import load_dotenv
import os

from models import db

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






if __name__ == "__main__":
    app.run(port=5555, debug=True)