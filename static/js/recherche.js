/**
 * Script permettant la validation du formulaire de création de compte.
 */

"use strict";

// Référence vers l'objet servant à la communication avec le serveur.
let clientHttp = null;

// Formulaire
let valide = true;

// Champs
let txtRecherche;

// Messages d'erreurs
let divErreurRecherche;

// La couleur de base, orange, ne concordait pas avec le style du site.
const couleurDivErreur = "red";

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
function validerRecherche(recherche) {
    let msg = "";
    txtRecherche.value = txtRecherche.value.trim();

    afficherValidation(txtRecherche, msg, divErreurRecherche);
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
function recherche() {

    let rechercheChercher =  $("#rechercheCreate").val().trim();

    if (clientHttp != null) {
        // Annuler la requête précédente car on lancera une nouvelle requête
        // à chaque input et on ne veut plus le résultat de la requête précédente.
        clientHttp.abort();
    }

    const parametres = {
        "recherche": rechercheChercher
    };

    clientHttp = $.ajax(
        {
            url     : `/api/recherche`,
            "data"  : parametres,                   // Sont envoyés en GET si aucune méthode n'est spécifiée
            success : validerRecherche,
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
    txtRecherche = document.getElementById("rechercheCreate");
    txtRecherche.addEventListener('change', recherche);
    txtRecherche.addEventListener("blur", validerRecherche);

    // Obtenir les div des erreurs
    divErreurRecherche = document.getElementById("msg-recherche");
    divErreurRecherche.style.color = couleurDivErreur;
}
window.addEventListener("load", initialisation, false);