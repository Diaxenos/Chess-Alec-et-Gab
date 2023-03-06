from flask import Flask, render_template, redirect
import random
from flask import Blueprint, abort, render_template, redirect, session, request,flash
from datetime import datetime
import os
from babel import numbers, dates
from flask_babel import Babel
import re
import hashlib

app = Flask(__name__)


app.secret_key = "cbca765383981f152ef9319b17cae0109c511b7b3906732336e43cee66fbe7ad"

@app.route('/')
def main_app():  # put application's code here
    return render_template('game.html')

@app.errorhandler(404)
def bad_request(_):
    '''Pour les erreurs 404'''

    return render_template(
        'erreur.html',
        message="ERREUR 404"
    ), 404

@app.errorhandler(500)
def internal_server_error(_):
    '''Pour les erreurs 500'''
    return render_template(
        'erreur.html',
        message="ERREUR 500"
    ), 500

@app.errorhandler(401)
def internal_server_error_401(_):
    '''Pour les erreurs 401'''

    return render_template(
        'erreur.html',
        message="ERREUR 401"
    ), 401

@app.errorhandler(403)
def internal_server_error_403(_):
    '''Pour les erreurs 403'''

    return render_template(
        'erreur.html',
        message="ERREUR 403"
    ), 403

@app.route('/visionner')
def visionner():

    liste_video = []
    liste_video.append("https://www.youtube.com/watch?v=1WEyUZ1SpHY&ab_channel=ChessBaseIndia")
    liste_video.append("https://www.youtube.com/watch?v=Vyp-xTLxRQ0&ab_channel=ChessBaseIndia")
    liste_video.append("https://www.youtube.com/watch?v=RqACK5OmNPs&ab_channel=ChessStudio")
    liste_video.append("https://www.youtube.com/watch?v=bdfBdw8EWF0&ab_channel=Chess.com")
    liste_video.append("https://www.youtube.com/watch?v=e91M0XLX7Jw&ab_channel=Chess.com")

    nombre = random.randint(0,len(liste_video))
    return redirect(liste_video[nombre])

bd = None

regex1 = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
regex2 = re.compile(r'[a-z\-\s]+')
regexMdp = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")

@app.route('/gestion_comptes/')
def index():
    '''Permet d'afficher la page de création de compte'''
    return render_template('create.html')

@app.route('/deconnexion')
def deconnexion():
    '''Permet de se déconnecter'''
    session.clear()
    session['utilisateur'] = None
    return redirect('/')

@app.route('/gestion_comptes/connexion')
def connexion():
    '''Permet d'afficher la page de connexion'''
    return render_template('auth.html')

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
        return render_template("auth.html",\
                message="Information incorrecte", courriel = courriel, motdepasse = motdepasse)

    motdepasse_hash = hashlib.sha512(motdepasse.encode()).hexdigest()

    with bd.creer_connexion() as conn:
        Compte = bd.get_compte_user(conn, courriel, motdepasse_hash)

    if Compte is None:
        return render_template('auth.html', \
            message="Compte introuvable ou mauvais mot de passe", courriel = courriel)

    session['utilisateur'] = Compte

    return redirect('/')

@app.route('/gestion_comptes/', methods=["POST"])
def creation():
    '''Permet de créer un compte'''
    courriel = request.form.get("courrielCreate", "")
    motdepasse = request.form.get("passwordCreate", "")
    motdepasseconf = request.form.get("passwordConfCreate", "")
    nom = request.form.get("nomCreate", "")
    message = ""

    """ with bd.creer_connexion() as conn:
        courriel_verif = bd.get_courriel(conn, courriel)

    if courriel =="" or nom=="" or motdepasse=="" or motdepasseconf=="" or adresse=="":
        message+=" Information(s) manquante(s)"
    if (re.search(regex1, courriel)) is None:
        message+=" Le courriel est invalide"
    if(re.search(regexMdp, motdepasse)) is None:
        message+=" Le mot de passe est invalide"
    if courriel_verif is not None:
        message+=" Ce courriel est déja utilisé."
    if len(courriel) > 50:
        message+=" Le courriel est trop long"
    if len(motdepasse) < 8:
        message+=" Le mot de passe est trop court"
    if motdepasse != motdepasseconf:
        message+=" Les mots de passes ne correspondent pas"
    if len(nom) > 50 or len(nom) < 3:
        message+=" Le nom est trop long ou trop court"
    if (re.search(regex2, nom)) is None:
        message+=" Le nom est invalide"
    with bd.creer_connexion() as conn:
        nom_unique = bd.get_nom_unique(conn, nom)
        if nom_unique != None:
            message += "Le nom est déjà utilisé!"

    if (len(message) == 0):
        motdepasse = hashlib.sha512(motdepasse.encode()).hexdigest()
        with bd.creer_connexion() as conn:
            bd.creation_compte(conn, courriel, motdepasse, nom)
        with bd.creer_connexion() as conn:
            compte = bd.get_compte_user(conn, courriel, motdepasse)
            session['utilisateur'] = compte
            return redirect('/')
    flash(message) """
    return redirect('create.html')


if __name__ == '__main__':
    app.run()
