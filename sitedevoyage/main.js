

var destinations = {
    "pt": ["Portugal", 200, true, true, false, true],
    "it": ["Italie", 100, true, true, false, false],
    "ir": ["Irlande", 300, true, true, true, false],
    "jp": ["Japon", 800, true, true, false, false],
    "us": ["Etats-Unis", 1100, true, true, false, false],
    "es": ["Espagne", 50, true, true, true, false],
    "lis": ["Lisbonne", 200, true, true, false, false],
    "lon": ["Londres", 500, true, true, true, false],
    "dub": ["Dublin", 400, true, true, false, true],
    "nyc": ["New York", 1100, true, true, false, false],
    "sin": ["Singapour", 800, true, true, false, false],
    "par": ["Paris", 50, true, true, false, false]
};

function filtre() {
    
    for (var i in destinations) {
        if ( !(destinations[i][0].toLowerCase().startsWith(document.getElementById("search").value.toLowerCase())) || (document.getElementById("prix").value > destinations[i][1]) || ((document.getElementById("dejeuner").checked) && (destinations[i][4] == true)) || ((document.getElementById("animaux").checked) && (destinations[i][5] == true)))  {
                document.getElementById(i).style.opacity = "0.30";
                document.getElementById(i).removeAttribute("href");
            } else {
                document.getElementById(i).style.opacity = "1.00";
                document.getElementById(i).href = "Reservation.html";
            }

        }

    }


function datesok(lequel) {
    now = new Date();
    if ((now.getTime() - now.getTime()%86400000) > new Date(document.getElementById("depart").value).getTime()) {
        document.getElementById("depart").value = "";
    }
    if ((now.getTime() - now.getTime()%86400000) >= new Date(document.getElementById("retour").value).getTime()) {
        document.getElementById("retour").value = "";
    }
    if ((new Date(document.getElementById("depart").value).getTime() >= new Date(document.getElementById("retour").value).getTime()) && (document.getElementById("retour") != "")) {
        document.getElementById(lequel).value = "";
    }
}



function prixsejour() {
    var nbEnfants = document.getElementById("enfants").value;
    var nbAdultes = document.getElementById("adultes").value;

    var dateDepart = new Date(document.getElementById("depart").value);    
    var dateRetour = new Date(document.getElementById("retour").value);
    nbNuits = (dateRetour-dateDepart)/(1000*3600*24);
    var dej = document.getElementById("dej").checked/1;
    var prixNuit = 100 /* à changer plus tard */
    var prix = (nbAdultes*(prixNuit*nbNuits)+nbEnfants*(prixNuit/2.5*nbNuits))+nbNuits*12*dej;

    document.getElementById("prix").innerHTML = prix;
    
}



function doublefonction(lequel) {
    datesok(lequel);
    prixsejour();
}

function doublefonction2(lequel) {
    datesok(lequel);
    filtre();
}

function voyageselec(dest) {

    window.voyageSelectionne = document.getElementById(dest).innerHTML;



}
function d() {
    var endroit = window.location.hash.substr(1);

    document.getElementById("voyageSelectionne").innerHTML = destinations[endroit][0];
}
