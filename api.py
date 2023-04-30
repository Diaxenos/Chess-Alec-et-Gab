
from flask import Flask, Blueprint, jsonify, render_template, redirect, request, session, flash, abort
from flask_babel import Babel
import pymongo
import re
import hashlib
import pymongo
from bson import json_util
import json

app = Flask(__name__)

bp_api = Blueprint('api', __name__)

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["ChessBras"]
mycol = mydb["users"]

@bp_api.route('/email_unique')
def email_unique():
    '''Validation'''
    email = request.args.get('courriel', None)
    email = mycol.find_one({"email":email})
    if email is None:
        email = "Aucun";
        return jsonify(email)
    return jsonify(email['email'])

@bp_api.route('/nom_unique')
def nom_unique():
    '''Validation'''
    nom_unique = request.args.get('nom', None)
    nom_unique = mycol.find_one({"nom":nom_unique})
    if(nom_unique is None):
        nom_unique = "Aucun";
        return jsonify(nom_unique)
    return jsonify(nom_unique['nom'])