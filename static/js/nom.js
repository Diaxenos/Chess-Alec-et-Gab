/**
 * Script permettant la validation du formulaire de création de compte.
 */

"use strict";

// Référence vers l'objet servant à la communication avec le serveur.
let clientHttp = null;

// Formulaire
let valide = true;

// Champs
let txtNom;

// Messages d'erreurs
let divErreurNom;

// La couleur de base, orange, ne concordait pas avec le style du site.
const couleurDivErreur = "red";

// Regex
const regexNom = /^[ a-zA-Zàâäéèêë-]+$/;

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
function validerNom(nom_unique) {
    let msg = "";
    txtNom.value = txtNom.value.trim();

    // Validation.
    if (txtNom.value.length < 3 || txtNom.value.length > 50 || !regexNom.test(txtNom.value)) {
        msg = "- Votre nom doit contenir entre 3 et 50 caractères et ne doit contenir que des lettres, des tirets et des espaces.\n";
    }
    if (nom_unique == txtNom.value) {
        msg = "- Nom déjà prit.";
    }

    afficherValidation(txtNom, msg, divErreurNom);
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
function nom() {

   let nomChercher =  $("#nomCreate").val().trim();

   if (clientHttp != null) {
       // Annuler la requête précédente car on lancera une nouvelle requête
       // à chaque input et on ne veut plus le résultat de la requête précédente.
       clientHttp.abort();
   }

   const parametres = {
       "nom": nomChercher
   };

   clientHttp = $.ajax(
       {
           url     : `/api/nom_unique`,
           "data"  : parametres,                   // Sont envoyés en GET si aucune méthode n'est spécifiée
           success : validerNom,
           error   : gererErreur
       }
   );
}
/**
 * Permet la validation du formulaire au complet.
 */
function validerFormulaire() {

    valide = true;

    validerNom();
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
    txtNom = document.getElementById("nomCreate");
    txtNom.addEventListener('change', nom);
    txtNom.addEventListener("blur", validerNom);

    // Obtenir les div des erreurs
    divErreurNom = document.getElementById("msg-nom");
    divErreurNom.style.color = couleurDivErreur;

    formCompte = document.getElementById("form-compte");
    formCompte.addEventListener("submit", envoyerFormulaire, false);
}
window.addEventListener("load", initialisation, false);