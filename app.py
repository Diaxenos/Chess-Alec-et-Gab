from flask import Flask, render_template, redirect
import random
from flask import Blueprint, abort, render_template, redirect, session, request,flash
from datetime import datetime
import os
from api import bp_api
from babel import numbers, dates
from flask_babel import Babel
import re
import hashlib
import pymongo
from bson import json_util, ObjectId
import json
app = Flask(__name__)

app.register_blueprint(bp_api, url_prefix='/api')

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["ChessBras"]
mycol = mydb["users"]
myfriendscol = mydb["friends"]

pays = [
  {"name": "Albania", "code": "AL"},
  {"name": "Åland Islands", "code": "AX"},
  {"name": "Algeria", "code": "DZ"},
  {"name": "American Samoa", "code": "AS"},
  {"name": "Andorra", "code": "AD"},
  {"name": "Angola", "code": "AO"},
  {"name": "Anguilla", "code": "AI"},
  {"name": "Antarctica", "code": "AQ"},
  {"name": "Antigua and Barbuda", "code": "AG"},
  {"name": "Argentina", "code": "AR"},
  {"name": "Armenia", "code": "AM"},
  {"name": "Aruba", "code": "AW"},
  {"name": "Australia", "code": "AU"},
  {"name": "Austria", "code": "AT"},
  {"name": "Azerbaijan", "code": "AZ"},
  {"name": "Bahamas (the)", "code": "BS"},
  {"name": "Bahrain", "code": "BH"},
  {"name": "Bangladesh", "code": "BD"},
  {"name": "Barbados", "code": "BB"},
  {"name": "Belarus", "code": "BY"},
  {"name": "Belgium", "code": "BE"},
  {"name": "Belize", "code": "BZ"},
  {"name": "Benin", "code": "BJ"},
  {"name": "Bermuda", "code": "BM"},
  {"name": "Bhutan", "code": "BT"},
  {"name": "Bolivia (Plurinational State of)", "code": "BO"},
  {"name": "Bonaire, Sint Eustatius and Saba", "code": "BQ"},
  {"name": "Bosnia and Herzegovina", "code": "BA"},
  {"name": "Botswana", "code": "BW"},
  {"name": "Bouvet Island", "code": "BV"},
  {"name": "Brazil", "code": "BR"},
  {"name": "British Indian Ocean Territory (the)", "code": "IO"},
  {"name": "Brunei Darussalam", "code": "BN"},
  {"name": "Bulgaria", "code": "BG"},
  {"name": "Burkina Faso", "code": "BF"},
  {"name": "Burundi", "code": "BI"},
  {"name": "Cabo Verde", "code": "CV"},
  {"name": "Cambodia", "code": "KH"},
  {"name": "Cameroon", "code": "CM"},
  {"name": "Canada", "code": "CA"},
  {"name": "Cayman Islands (the)", "code": "KY"},
  {"name": "Central African Republic (the)", "code": "CF"},
  {"name": "Chad", "code": "TD"},
  {"name": "Chile", "code": "CL"},
  {"name": "China", "code": "CN"},
  {"name": "Christmas Island", "code": "CX"},
  {"name": "Cocos (Keeling) Islands (the)", "code": "CC"},
  {"name": "Colombia", "code": "CO"},
  {"name": "Comoros (the)", "code": "KM"},
  {"name": "Congo (the Democratic Republic of the)", "code": "CD"},
  {"name": "Congo (the)", "code": "CG"},
  {"name": "Cook Islands (the)", "code": "CK"},
  {"name": "Costa Rica", "code": "CR"},
  {"name": "Croatia", "code": "HR"},
  {"name": "Cuba", "code": "CU"},
  {"name": "Curaçao", "code": "CW"},
  {"name": "Cyprus", "code": "CY"},
  {"name": "Czechia", "code": "CZ"},
  {"name": "Côte d'Ivoire", "code": "CI"},
  {"name": "Denmark", "code": "DK"},
  {"name": "Djibouti", "code": "DJ"},
  {"name": "Dominica", "code": "DM"},
  {"name": "Dominican Republic (the)", "code": "DO"},
  {"name": "Ecuador", "code": "EC"},
  {"name": "Egypt", "code": "EG"},
  {"name": "El Salvador", "code": "SV"},
  {"name": "Equatorial Guinea", "code": "GQ"},
  {"name": "Eritrea", "code": "ER"},
  {"name": "Estonia", "code": "EE"},
  {"name": "Eswatini", "code": "SZ"},
  {"name": "Ethiopia", "code": "ET"},
  {"name": "Falkland Islands (the) [Malvinas]", "code": "FK"},
  {"name": "Faroe Islands (the)", "code": "FO"},
  {"name": "Fiji", "code": "FJ"},
  {"name": "Finland", "code": "FI"},
  {"name": "France", "code": "FR"},
  {"name": "French Guiana", "code": "GF"},
  {"name": "French Polynesia", "code": "PF"},
  {"name": "French Southern Territories (the)", "code": "TF"},
  {"name": "Gabon", "code": "GA"},
  {"name": "Gambia (the)", "code": "GM"},
  {"name": "Georgia", "code": "GE"},
  {"name": "Germany", "code": "DE"},
  {"name": "Ghana", "code": "GH"},
  {"name": "Gibraltar", "code": "GI"},
  {"name": "Greece", "code": "GR"},
  {"name": "Greenland", "code": "GL"},
  {"name": "Grenada", "code": "GD"},
  {"name": "Guadeloupe", "code": "GP"},
  {"name": "Guam", "code": "GU"},
  {"name": "Guatemala", "code": "GT"},
  {"name": "Guernsey", "code": "GG"},
  {"name": "Guinea", "code": "GN"},
  {"name": "Guinea-Bissau", "code": "GW"},
  {"name": "Guyana", "code": "GY"},
  {"name": "Haiti", "code": "HT"},
  {"name": "Heard Island and McDonald Islands", "code": "HM"},
  {"name": "Holy See (the)", "code": "VA"},
  {"name": "Honduras", "code": "HN"},
  {"name": "Hong Kong", "code": "HK"},
  {"name": "Hungary", "code": "HU"},
  {"name": "Iceland", "code": "IS"},
  {"name": "India", "code": "IN"},
  {"name": "Indonesia", "code": "ID"},
  {"name": "Iran (Islamic Republic of)", "code": "IR"},
  {"name": "Iraq", "code": "IQ"},
  {"name": "Ireland", "code": "IE"},
  {"name": "Isle of Man", "code": "IM"},
  {"name": "Israel", "code": "IL"},
  {"name": "Italy", "code": "IT"},
  {"name": "Jamaica", "code": "JM"},
  {"name": "Japan", "code": "JP"},
  {"name": "Jersey", "code": "JE"},
  {"name": "Jordan", "code": "JO"},
  {"name": "Kazakhstan", "code": "KZ"},
  {"name": "Kenya", "code": "KE"},
  {"name": "Kiribati", "code": "KI"},
  {"name": "Korea (the Democratic People's Republic of)", "code": "KP"},
  {"name": "Korea (the Republic of)", "code": "KR"},
  {"name": "Kuwait", "code": "KW"},
  {"name": "Kyrgyzstan", "code": "KG"},
  {"name": "Lao People's Democratic Republic (the)", "code": "LA"},
  {"name": "Latvia", "code": "LV"},
  {"name": "Lebanon", "code": "LB"},
  {"name": "Lesotho", "code": "LS"},
  {"name": "Liberia", "code": "LR"},
  {"name": "Libya", "code": "LY"},
  {"name": "Liechtenstein", "code": "LI"},
  {"name": "Lithuania", "code": "LT"},
  {"name": "Luxembourg", "code": "LU"},
  {"name": "Macao", "code": "MO"},
  {"name": "Madagascar", "code": "MG"},
  {"name": "Malawi", "code": "MW"},
  {"name": "Malaysia", "code": "MY"},
  {"name": "Maldives", "code": "MV"},
  {"name": "Mali", "code": "ML"},
  {"name": "Malta", "code": "MT"},
  {"name": "Marshall Islands (the)", "code": "MH"},
  {"name": "Martinique", "code": "MQ"},
  {"name": "Mauritania", "code": "MR"},
  {"name": "Mauritius", "code": "MU"},
  {"name": "Mayotte", "code": "YT"},
  {"name": "Mexico", "code": "MX"},
  {"name": "Micronesia (Federated States of)", "code": "FM"},
  {"name": "Moldova (the Republic of)", "code": "MD"},
  {"name": "Monaco", "code": "MC"},
  {"name": "Mongolia", "code": "MN"},
  {"name": "Montenegro", "code": "ME"},
  {"name": "Montserrat", "code": "MS"},
  {"name": "Morocco", "code": "MA"},
  {"name": "Mozambique", "code": "MZ"},
  {"name": "Myanmar", "code": "MM"},
  {"name": "Namibia", "code": "NA"},
  {"name": "Nauru", "code": "NR"},
  {"name": "Nepal", "code": "NP"},
  {"name": "Netherlands (the)", "code": "NL"},
  {"name": "New Caledonia", "code": "NC"},
  {"name": "New Zealand", "code": "NZ"},
  {"name": "Nicaragua", "code": "NI"},
  {"name": "Niger (the)", "code": "NE"},
  {"name": "Nigeria", "code": "NG"},
  {"name": "Niue", "code": "NU"},
  {"name": "Norfolk Island", "code": "NF"},
  {"name": "Northern Mariana Islands (the)", "code": "MP"},
  {"name": "Norway", "code": "NO"},
  {"name": "Oman", "code": "OM"},
  {"name": "Pakistan", "code": "PK"},
  {"name": "Palau", "code": "PW"},
  {"name": "Palestine, State of", "code": "PS"},
  {"name": "Panama", "code": "PA"},
  {"name": "Papua New Guinea", "code": "PG"},
  {"name": "Paraguay", "code": "PY"},
  {"name": "Peru", "code": "PE"},
  {"name": "Philippines (the)", "code": "PH"},
  {"name": "Pitcairn", "code": "PN"},
  {"name": "Poland", "code": "PL"},
  {"name": "Portugal", "code": "PT"},
  {"name": "Puerto Rico", "code": "PR"},
  {"name": "Qatar", "code": "QA"},
  {"name": "Republic of North Macedonia", "code": "MK"},
  {"name": "Romania", "code": "RO"},
  {"name": "Russian Federation (the)", "code": "RU"},
  {"name": "Rwanda", "code": "RW"},
  {"name": "Réunion", "code": "RE"},
  {"name": "Saint Barthélemy", "code": "BL"},
  {"name": "Saint Helena, Ascension and Tristan da Cunha", "code": "SH"},
  {"name": "Saint Kitts and Nevis", "code": "KN"},
  {"name": "Saint Lucia", "code": "LC"},
  {"name": "Saint Martin (French part)", "code": "MF"},
  {"name": "Saint Pierre and Miquelon", "code": "PM"},
  {"name": "Saint Vincent and the Grenadines", "code": "VC"},
  {"name": "Samoa", "code": "WS"},
  {"name": "San Marino", "code": "SM"},
  {"name": "Sao Tome and Principe", "code": "ST"},
  {"name": "Saudi Arabia", "code": "SA"},
  {"name": "Senegal", "code": "SN"},
  {"name": "Serbia", "code": "RS"},
  {"name": "Seychelles", "code": "SC"},
  {"name": "Sierra Leone", "code": "SL"},
  {"name": "Singapore", "code": "SG"},
  {"name": "Sint Maarten (Dutch part)", "code": "SX"},
  {"name": "Slovakia", "code": "SK"},
  {"name": "Slovenia", "code": "SI"},
  {"name": "Solomon Islands", "code": "SB"},
  {"name": "Somalia", "code": "SO"},
  {"name": "South Africa", "code": "ZA"},
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
  {"name": "South Sudan", "code": "SS"},
  {"name": "Spain", "code": "ES"},
  {"name": "Sri Lanka", "code": "LK"},
  {"name": "Sudan (the)", "code": "SD"},
  {"name": "Suriname", "code": "SR"},
  {"name": "Svalbard and Jan Mayen", "code": "SJ"},
  {"name": "Sweden", "code": "SE"},
  {"name": "Switzerland", "code": "CH"},
  {"name": "Syrian Arab Republic", "code": "SY"},
  {"name": "Taiwan (Province of China)", "code": "TW"},
  {"name": "Tajikistan", "code": "TJ"},
  {"name": "Tanzania, United Republic of", "code": "TZ"},
  {"name": "Thailand", "code": "TH"},
  {"name": "Timor-Leste", "code": "TL"},
  {"name": "Togo", "code": "TG"},
  {"name": "Tokelau", "code": "TK"},
  {"name": "Tonga", "code": "TO"},
  {"name": "Trinidad and Tobago", "code": "TT"},
  {"name": "Tunisia", "code": "TN"},
  {"name": "Turkey", "code": "TR"},
  {"name": "Turkmenistan", "code": "TM"},
  {"name": "Turks and Caicos Islands (the)", "code": "TC"},
  {"name": "Tuvalu", "code": "TV"},
  {"name": "Uganda", "code": "UG"},
  {"name": "Ukraine", "code": "UA"},
  {"name": "United Arab Emirates (the)", "code": "AE"},
  {"name": "United Kingdom of Great Britain and Northern Ireland (the)", "code": "GB"},
  {"name": "United States Minor Outlying Islands (the)", "code": "UM"},
  {"name": "United States of America (the)", "code": "US"},
  {"name": "Uruguay", "code": "UY"},
  {"name": "Uzbekistan", "code": "UZ"},
  {"name": "Vanuatu", "code": "VU"},
  {"name": "Venezuela (Bolivarian Republic of)", "code": "VE"},
  {"name": "Viet Nam", "code": "VN"},
  {"name": "Virgin Islands (British)", "code": "VG"},
  {"name": "Virgin Islands (U.S.)", "code": "VI"},
  {"name": "Wallis and Futuna", "code": "WF"},
  {"name": "Western Sahara", "code": "EH"},
  {"name": "Yemen", "code": "YE"},
  {"name": "Zambia", "code": "ZM"},
  {"name": "Zimbabwe", "code": "ZW"}
]

app.secret_key = "cbca765383981f152ef9319b17cae0109c511b7b3906732336e43cee66fbe7ad"

@app.route('/')
def main_app():  # put application's code here

    
    if(session.get('utilisateur') is None):
        session['utilisateur'] = None
    return render_template('game.jinja')

@app.errorhandler(404)
def bad_request(_):
    '''Pour les erreurs 404'''

    return render_template(
        'erreur.jinja',
        message="ERREUR 404"
    ), 404

@app.errorhandler(500)
def internal_server_error(_):
    '''Pour les erreurs 500'''
    return render_template(
        'erreur.jinja',
        message="ERREUR 500"
    ), 500

@app.errorhandler(401)
def internal_server_error_401(_):
    '''Pour les erreurs 401'''

    return render_template(
        'erreur.jinja',
        message="ERREUR 401"
    ), 401

@app.errorhandler(403)
def internal_server_error_403(_):
    '''Pour les erreurs 403'''

    return render_template(
        'erreur.jinja',
        message="ERREUR 403"
    ), 403


regex1 = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
regex2 = re.compile(r'[a-z\-\s]+')
regexMdp = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")

@app.route('/gestion_comptes/')
def index():
    '''Permet d'afficher la page de création de compte'''
    return render_template('create.jinja', pays = pays)

@app.route('/deconnexion')
def deconnexion():
    '''Permet de se déconnecter'''
    session.clear()
    session['utilisateur'] = None
    return redirect('/')

@app.route('/gestion_comptes/connexion')
def connexion():
    '''Permet d'afficher la page de connexion'''
    return render_template('auth.jinja')

@app.route('/gestion_comptes/connexion', methods=["POST"])
def authentification():
    '''Permet de s'authentifier'''
    courriel = request.form.get("courriel", "")
    motdepasse = request.form.get("motdepasse", "")
    perma = request.form.get("checkPerma")

    if perma == 1:
        session.permanent = True    # pylint: disable=assigning-non-slot
    else:
        session.permanent = False   # pylint: disable=assigning-non-slot

    if not courriel or not motdepasse:
        return render_template("auth.jinja",\
                message="Information incorrecte", courriel = courriel, motdepasse = motdepasse)

    motdepasse_hash = hashlib.sha512(motdepasse.encode()).hexdigest()

    compte = mycol.find_one({"email":courriel, "mdp":motdepasse_hash})
    print(compte)
    if compte is None:
        return render_template('auth.jinja', \
            message="Compte introuvable ou mauvais mot de passe", courriel = courriel)
    compte = json.loads(json_util.dumps(compte))

    session['utilisateur'] = compte

    return redirect('/')

@app.route('/gestion_comptes/', methods=["POST"])
def creation():
    '''Permet de créer un compte'''
    courriel = request.form.get("courrielCreate", "")
    motdepasse = request.form.get("passwordCreate", "")
    motdepasseconf = request.form.get("passwordConfCreate", "")
    nom = request.form.get("nomCreate", "")
    pays_selection = request.form.get("pays_selection", "")
    print(pays_selection)
    pays_selection = pays_selection.lower()
    message = ""

    courriel_verif = mycol.find_one({"email":courriel})

    if courriel =="" or nom=="" or motdepasse=="" or motdepasseconf=="":
        message+=" Information(s) manquante(s)"
    if (re.search(regex1, courriel)) is None:
        message+=" Le courriel est invalide"
    """ if(re.search(regexMdp, motdepasse)) is None:
        message+=" Le mot de passe est invalide"""
    if courriel_verif is not None:
        message+=" Ce courriel est déja utilisé. """
    if len(courriel) > 50:
        message+=" Le courriel est trop long"
    if len(motdepasse) <= 8:
        message+=" Le mot de passe est trop court"
    if motdepasse != motdepasseconf:
        message+=" Les mots de passes ne correspondent pas"
    if len(nom) > 50 or len(nom) < 3:
        message+=" Le nom est trop long ou trop court"
    if (re.search(regex2, nom)) is None:
        message+=" Le nom est invalide """
    nom_unique = mycol.find_one({"nom":nom})
    if nom_unique != None:
        message += "Le nom est déjà utilisé! """

    if (len(message) == 0):
        motdepasse = hashlib.sha512(motdepasse.encode()).hexdigest()

        mydict = { "email": courriel, "mdp": motdepasse, "pays": pays_selection, "nom":nom, "rang":0, "amis":[] }

        x = mycol.insert_one(mydict)

        compte = mycol.find_one(mydict)

        compte = json.loads(json_util.dumps(compte))

        session['utilisateur'] = compte
        return redirect('/')
    flash(message)
    return render_template('create.jinja', pays = pays)

@app.route('/profil')
def profil():
    '''Permet d'afficher la page de profil'''
    return render_template('profil.jinja')

@app.route('/profil/modification', methods=["POST"])
def modification():
    courriel = request.form.get("courriel", "")
    motdepasse = request.form.get("password", "")
    motdepasseconf = request.form.get("passwordConf", "")
    nom = request.form.get("nom", "")

    message = ""

    courriel_verif = mycol.find_one({"email": courriel})

    if courriel =="" or nom=="":
        message+=" Information(s) manquante(s)"
    if (re.search(regex1, courriel)) is None:
        message+=" Le courriel est invalide <br/>"
    """ if(re.search(regexMdp, motdepasse)) is None:
        message+=" Le mot de passe est invalide"""
    if len(courriel) > 50:
        message+=" Le courriel est trop long <br/>"
    if motdepasse != "":
        if len(motdepasse) <= 8:
            message+=" Le mot de passe est trop court <br/>"
        if motdepasse != motdepasseconf:
            message+=" Les mots de passes ne correspondent pas <br/>"
    if len(nom) > 50 or len(nom) < 3:
        message+=" Le nom est trop long ou trop court <br/>"
    if (re.search(regex2, nom)) is None:
        message+=" Le nom est invalide <br/>"
    if nom != session['utilisateur']['nom']:
        nom_unique = mycol.find_one({"nom":nom})
        if nom_unique != None:
            message += "Le nom est déjà utilisé! <br/>"

    if (len(message) == 0):
        motdepasse = hashlib.sha512(motdepasse.encode()).hexdigest()
        mdpVerif = mycol.find_one({"mdp": motdepasse})

        print(session['utilisateur']['_id']['$oid'])

        if mdpVerif is None:
            mydict = mycol.find_one({"_id":ObjectId(session['utilisateur']['_id']['$oid'])})
            id = mycol.update_one({"_id":ObjectId(mydict['_id'])}, {"$set":{"email": courriel, "mdp": motdepasse, "nom":nom}})
            compte = mycol.find_one({"_id":ObjectId(mydict['_id'])})
            compte = json.loads(json_util.dumps(compte))
            session['utilisateur'] = compte
            flash(message)
            return render_template('profil.jinja')
        else:
            mydict = mycol.find_one({"_id":ObjectId(session['utilisateur']['_id']['$oid'])})
            print(mydict)
            id = mycol.update_one({"_id":ObjectId(mydict['_id'])}, {"$set":{"email": courriel, "mdp": session['utilisateur']['mdp'], "nom":nom}})
            print(id)
            compte = mycol.find_one({"_id":ObjectId(mydict['_id'])})
            compte = json.loads(json_util.dumps(compte))
            session['utilisateur'] = compte
            flash(message)
            return render_template('profil.jinja')

@app.route('/amis')
def amis():  # put application's code here
    list_friends = []
    list_gens = []
    # Prendre le premier id de cette objet pour trouver la personne
    id1 = myfriendscol.find({"id_user":ObjectId(session['utilisateur']['_id']['$oid'])})
    print(session['utilisateur']['_id']['$oid'])
    print(id1)
    # Prendre le deuxieme id de cette objet pour trouver la personne
    id2 = myfriendscol.find({"id_friend":ObjectId(session['utilisateur']['_id']['$oid'])})
    print(id2)
    for friend in id1:
        ami = mycol.find_one({"_id":ObjectId(friend['id_friend'])})
        list_friends.append(ami)
        print(ami)
    for friend in id2:
        ami = mycol.find_one({"_id":ObjectId(friend['id_user'])})
        list_friends.append(ami)
        print(ami)
    notInFriends = mycol.find({"_id":{"$nin":[ObjectId(session['utilisateur']['_id']['$oid'])]}})
    for personne in notInFriends:
        list_gens.append(personne)
    return render_template('amis.jinja', amis=list_friends, gens=list_gens)

@app.route('/amis/ajouter/<id>')
def ajouter(id):
    print(id)
    mydict = { "id_user": ObjectId(session['utilisateur']['_id']['$oid']), "id_friend": ObjectId(id) }
    if myfriendscol.find_one(mydict) is None:
        if id != session['utilisateur']['_id']['$oid']:
            x = myfriendscol.insert_one(mydict)
            print(x)
    return redirect('/amis')

@app.route('/amis/supprimer/<id>')
def supprimer(id):
    print(id)
    mydict = { "id_user": ObjectId(session['utilisateur']['_id']['$oid']), "id_friend": ObjectId(id) }
    x = myfriendscol.delete_one(mydict)
    print(x)
    return redirect('/amis')


if __name__ == '__main__':
    app.run()
