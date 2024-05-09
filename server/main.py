from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, jwt_required, create_access_token
import random
from .app import *
from .appV1 import *

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///payment_system.db'
app.config['JWT_SECRET_KEY'] = 'super-secret'  # Change this to a long, random string

