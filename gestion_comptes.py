"""
Un site d'annonces classées avec messagerie
"""

from flask import Blueprint, abort, render_template, redirect, session, request,flash
from datetime import datetime
import os
from babel import numbers, dates
from flask_babel import Babel
import re
import hashlib

bp_gestion_comptes = Blueprint('gestion_comptes', __name__)

bd = None

regex1 = re.compile(r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)")
regex2 = re.compile(r'[a-z\-\s]+')
regexMdp = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$")

@bp_gestion_comptes.route('/')
def index():
    '''Permet d'afficher la page de création de compte'''
    return render_template('gestion_comptes/create.html')

@bp_gestion_comptes.route('/deconnexion')
def deconnexion():
    '''Permet de se déconnecter'''
    session.clear()
    session['utilisateur'] = None
    return redirect('/')

@bp_gestion_comptes.route('/connexion')
def connexion():
    '''Permet d'afficher la page de connexion'''
    return render_template('gestion_comptes/auth.html')

@bp_gestion_comptes.route('/connexion', methods=["POST"])
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
        return render_template("gestion_comptes/auth.html",\
                message="Information incorrecte", courriel = courriel, motdepasse = motdepasse)

    motdepasse_hash = hashlib.sha512(motdepasse.encode()).hexdigest()

    with bd.creer_connexion() as conn:
        Compte = bd.get_compte_user(conn, courriel, motdepasse_hash)

    if Compte is None:
        return render_template('gestion_comptes/auth.html', \
            message="Compte introuvable ou mauvais mot de passe", courriel = courriel)

    session['utilisateur'] = Compte

    return redirect('/')

@bp_gestion_comptes.route('/', methods=["POST"])
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
    return redirect('gestion_comptes/create.html')
