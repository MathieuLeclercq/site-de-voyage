var destinations = {
    "pt": ["Portugal", 200, true, true, false, true, "images/portugal.jpg", 0],
    "it": ["Italie", 100, true, true, true, false, "images/italie.jpg", 0],
    "ir": ["Irlande", 300, true, true, true, true, "images/ireland.jpg", 0],
    "jp": ["Japon", 800, true, true, false, false, "images/japon.jpg", 0],
    "us": ["Etats-Unis", 1100, true, true, false, true, "images/usa.PNG", 0],
    "es": ["Espagne", 50, true, true, true, false, "images/espagne.jpg", 0],
    "lis": ["Lisbonne", 200, true, true, false, false, "images/Lisbonne.jpg"],
    "lon": ["Londres", 500, true, true, true, false, "images/londres.jpeg"],
    "dub": ["Dublin", 400, true, true, false, true, "images/dublin.jpg"],
    "nyc": ["New York", 1100, true, true, true, true, "images/New-York.jpg"],
    "sin": ["Singapour", 800, true, true, false, false, "images/singapour.jpg"],
    "par": ["Paris", 50, true, true, false, false, "images/paris.jpeg"]
};

function filtre() {

    for (var i in destinations) {
        if (!(destinations[i][0].toLowerCase().startsWith(document.getElementById("search").value.toLowerCase())) || (document.getElementById("prix").value < destinations[i][1]) || ((document.getElementById("dejeuner").checked) && (destinations[i][4] == false)) || ((document.getElementById("animaux").checked) && (destinations[i][5] == false))) {
            document.getElementById(i).style.opacity = "0.30";
            document.getElementById(i).removeAttribute("href");
        } else {
            document.getElementById(i).style.opacity = "1.00";
            document.getElementById(i).href = "Reservation.html?name=#" + i;
        }

    }

}

function createvoyages() {
    for (var i in destinations) {
        document.getElementById(i).style.backgroundImage = "url(" + destinations[i][6] + ")";
    }
}


function datesok(lequel) {
    now = new Date();
    if ((now.getTime() - now.getTime() % 86400000) > new Date(document.getElementById("depart").value).getTime()) {
        document.getElementById("depart").value = "";
        alert("veuillez choisir une date valide");
    }
    if ((now.getTime() - now.getTime() % 86400000) >= new Date(document.getElementById("retour").value).getTime()) {
        document.getElementById("retour").value = "";
        alert("veuillez choisir une date valide");
    }
    if ((new Date(document.getElementById("depart").value).getTime() >= new Date(document.getElementById("retour").value).getTime()) && (document.getElementById("retour") != "")) {
        document.getElementById(lequel).value = "";
        alert("La date de départ doit être antérieure à la date d'arrivée !");
    }
}



function prixsejour() {
    var pays = window.location.hash.substr(1);
    var nbEnfants = Number(document.getElementById("enfants").value);
    var nbAdultes = Number(document.getElementById("adultes").value);

    var dateDepart = new Date(document.getElementById("depart").value);
    var dateRetour = new Date(document.getElementById("retour").value);
    nbNuits = (dateRetour - dateDepart) / (1000 * 3600 * 24);
    var dej = Number(document.getElementById("dej").checked);
    var prixNuit = Number(destinations[pays][1]);
    var prix = Math.round(nbNuits * (nbAdultes + 0.4 * nbEnfants) * (prixNuit + 12 * dej) * 100) / 100;
    if (prix > 0) {
        document.getElementById("prix").innerHTML = prix;
    } else {
        document.getElementById("prix").innerHTML = "0";
    }

}

function nombreok(lequel) {
    if (document.getElementById(lequel).value < 0) {
        document.getElementById(lequel).value = 0;
    }
    if (document.getElementById(lequel).value % 1 != 0) {
        document.getElementById(lequel).value = Math.trunc(document.getElementById(lequel).value);
    }

}


function doublefonction(lequel) {
    datesok(lequel);
    prixsejour();
}

function doublefonction2(lequel) {
    datesok(lequel);
    filtre();
}

function doublefonction3(lequel) {
    nombreok(lequel);
    prixsejour();
}

function monFiltre(depart, arrive, dej, animaux) {
    this.depart = depart;
    this.retour = arrive;
    this.dejeuner = dej;
    this.animaux = animaux;
}

function voyageselec(dest) {
    var dest = dest; /* inutile pour le moment */
    /*var filtreuser = {
    depart : document.getElementById("depart").value,
    retour : document.getElementById("retour").value,
    dejeuner : document.getElementById("dejeuner").checked,
    animaux : document.getElementById("animaux").checked
    };*/
    var filtreuser = new monFiltre(document.getElementById("depart").value, document.getElementById("retour").value, document.getElementById("dejeuner").checked, document.getElementById("animaux").checked);
    window.localStorage.setItem("filtre", JSON.stringify(filtreuser));
    alert(JSON.stringify(filtreuser));

}

function d() {
    filtreuser = JSON.parse(localStorage.getItem("filtre"));
    var endroit = window.location.hash.substr(1);
    document.getElementById("voyageSelectionne").innerHTML = destinations[endroit][0];

    document.getElementById("depart").value = filtreuser.depart;
    document.getElementById("retour").value = filtreuser.retour;
    document.getElementById("dej").checked = filtreuser.dejeuner; /* bloquer petit dej à decoché si impossible d'en prendre un */
    document.getElementById("animal").checked = filtreuser.animaux; /* bloquer animaux à decoché si impossible d'en prendre un */


}

let template = document.getElementById(listepays);
for (const i of destinations) {
    if (destinations[i][6] = 0) { // itère sur le tableau
        let clone = document.importNode(template.content, true); // clone le template

        newContent = clone.firstElementChild.innerHTML // remplace {{modèle}}
            .replace(/{{iddest}}/g, destination[i]) // et {{couleur}} par
            .replace(/{{dest}}/g, v.couleur); // leur valeur

        clone.firstElementChild.innerHTML = newContent

        document.body.appendChild(clone); // On ajoute le clone créé
    }
}