/**
 * Script permettant la validation du formulaire de création de compte.
 */

"use strict";

// Référence vers l'objet servant à la communication avec le serveur.
let clientHttp = null;

// Formulaire
let valide = true;

// Champs
let txtCourriel;

// Messages d'erreurs
let divErreurCourriel;

// La couleur de base, orange, ne concordait pas avec le style du site.
const couleurDivErreur = "red";

// Regex
const regexCourriel = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

/**
 * Permet d'afficher un message d'erreur d'un champ invalide.
 * @param {*} champ Le champ invalide.
 * @param {string} message Le message à afficher.
 * @param {*} divErreur La div où l'erreur va s'afficher.
 */
function afficherValidation(champ, message, divErreur) {
    if (message === "") {
        champ.classList.add("is-valid");
        champ.classList.remove("is-invalid");
    }
    else {
        champ.classList.remove("is-valid");
        champ.classList.add("is-invalid");
        valide = false;
    }

    if (divErreur.childNodes[0]) {
        divErreur.removeChild(divErreur.childNodes[0]);
    }

    const texte = document.createTextNode(message);
    divErreur.appendChild(texte);
}

/**
 * Permet la validation du nom.
 */
function validerCourriel(email_unique) {
    let msg = "";
    txtCourriel.value = txtCourriel.value.trim();
    // Validation.
    if (!regexCourriel.test(txtCourriel.value)) {
        msg = "- Votre courriel n'est pas valide.\n";
    }
    if (email_unique == txtCourriel.value) {
        msg = "- Courriel déjà prit.";
    }

    afficherValidation(txtCourriel, msg, divErreurCourriel);
}

/**
* Appelée lors d'une erreur.
*/
function gererErreur(client, textStatus, errorThrown) {
    if (client.status == 0) {
        console.log("Requête annulée"); // Donc tout est OK
    } else {
        $("#chargement").addClass("masquer");
        console.error(`Erreur (code=${client.status}): ${textStatus}`);
        if (errorThrown != null) {
            console.error(errorThrown);
        }
        $("#erreur").text("Erreur lors de la requête. Veuillez réessayer.");
    }
    clientHttp = null;
 }

 /**
* Fonction appelée pour tenter de récupérer et d'afficher les informations
* d'une personne avec AJAX.
*/
function courriel() {

    let courrielChercher =  $("#courrielCreate").val().trim();

    if (clientHttp != null) {
        // Annuler la requête précédente car on lancera une nouvelle requête
        // à chaque input et on ne veut plus le résultat de la requête précédente.
        clientHttp.abort();
    }

    const parametres = {
        "courriel": courrielChercher
    };

    clientHttp = $.ajax(
        {
            url     : `/api/email_unique`,
            "data"  : parametres,                   // Sont envoyés en GET si aucune méthode n'est spécifiée
            success : validerCourriel,
            error   : gererErreur
        }
    );
 }

 /**
 * Permet la validation du formulaire au complet.
 */
function validerFormulaire() {

    valide = true;

    validerCourriel();
}
 /**
 * Permet la validation du nom à chaque input.
 */
 function envoyerFormulaire(evenement) {
    validerFormulaire();
    if (!valide) {
        evenement.preventDefault();
    }
}
/**
 * Permet initialisation.
 */
function initialisation() {
    // Obtenir les champs
    txtCourriel = document.getElementById("courrielCreate");
    txtCourriel.addEventListener('change', courriel);
    txtCourriel.addEventListener("blur", validerCourriel);

    // Obtenir les div des erreurs
    divErreurCourriel = document.getElementById("msg-courriel");
    divErreurCourriel.style.color = couleurDivErreur;

    formCompte = document.getElementById("form-compte");
    formCompte.addEventListener("submit", envoyerFormulaire, false);
}
window.addEventListener("load", initialisation, false);