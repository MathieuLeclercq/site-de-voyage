/*var destinations = {  // Stockage des informations sur les destinations
    "pt": ["Portugal", 200, true, true, false, true, "images/portugal.jpg", 0],
    "it": ["Italie", 100, true, true, true, false, "images/italie.jpg", 0],
    "ir": ["Irlande", 300, true, true, true, true, "images/ireland.jpg", 0],
    "jp": ["Japon", 800, true, true, false, false, "images/japon.jpg", 0],
    "us": ["Etats-Unis", 1100, true, true, false, true, "images/usa.PNG", 0],
    "es": ["Espagne", 50, true, true, true, false, "images/espagne.jpg", 0],
    "lis": ["Lisbonne", 200, true, true, false, false, "images/Lisbonne.jpg", 2267057],
    "lon": ["Londres", 500, true, true, true, false, "images/londres.jpeg", 2643743],
    "dub": ["Dublin", 400, true, true, false, true, "images/dublin.jpg", 2964574],
    "nyc": ["New York", 1100, true, true, true, true, "images/New-York.jpg", 5128581],
    "sin": ["Singapour", 800, true, true, false, false, "images/singapour.jpg", 1880252],
    "par": ["Paris", 50, true, true, false, false, "images/paris.jpeg", 2988507]
};*/

var destinations = {} // Stockage des informations sur les destinations qu'on va importer depuis le fichier pays.json
fetch("pays.json").then(function(x){ return x.json();}).then(function(x){ destinations= x;})

  

function filtre() {  // Permet de griser les destinations incompatibles avec les choix rentrés dans la barre de navigation :
                    // prix max, dispo des dates, présence de petit dej, présence d'animaux.
                   // On filtre aussi selon la saisie dans la barre de recherche.

    for (var i in destinations) {
        if (!(destinations[i][0].toLowerCase().startsWith(document.getElementById("search").value.toLowerCase())) || (document.getElementById("prix").value < destinations[i][1]) || ((document.getElementById("dejeuner").checked) && (destinations[i][4] == false)) || ((document.getElementById("animaux").checked) && (destinations[i][5] == false))) {
            /*document.getElementById(i).style.opacity = "0.30";
            document.getElementById(i).removeAttribute("href");*/

            document.getElementById(i).parentNode.style.display = "None";
            
        } else {
            /*document.getElementById(i).style.opacity = "1.00";
            document.getElementById(i).href = "Reservation.html?name=#" + i;*/

            document.getElementById(i).parentNode.style.display = "flex";
        }

    }

}

function createvoyages() {   // Affiche les destinations dynamiquement sur la page d'accueil suivant le template
    let template = document.getElementById("listepays");
    let template2 = document.getElementById("listevilles");
    for (var i in destinations) {
        if (destinations[i][7] == 0) {   // On s'occupe ici des pays
            let clone = document.importNode(template.content, true);
            newContent = clone.firstElementChild.innerHTML.replace(/{{iddest}}/g, i).replace(/{{iddest2}}/g, i).replace(/{{dest}}/g, destinations[i][0]);
            clone.firstElementChild.innerHTML = newContent
            document.getElementById("ulpays").appendChild(clone);

        } else if (destinations[i][7] != 0) {  // On s'occupe ici des villes
            let clone = document.importNode(template2.content, true);
            newContent = clone.firstElementChild.innerHTML.replace(/{{iddest}}/g, i).replace(/{{iddest2}}/g, i).replace(/{{dest}}/g, destinations[i][0]);
            clone.firstElementChild.innerHTML = newContent
            document.getElementById("ulvilles").appendChild(clone);
        }
    }

    for (var i in destinations) {  // On récupère l'image correspondant à chaque destination
        document.getElementById(i).style.backgroundImage = "url(" + destinations[i][6] + ")";
    }
}

function datesok(lequel) {  // fonction qui n'autorise la saisie que de dates valides :
                           // pas de dates antérieures à aujourd'hui, et le retour doit être ultérieur au départ.
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



function prixsejour() { // Calcule le prix du séjour en temps réel, suivant les valeurs saisies dans le formulaire de réservation.
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

window.addEventListener("scroll", function(){
    let objNav = document.getElementById("navfil");
    // on mémorise la position de nav
    let memoPositionNav = objNav.offsetTop;
    // position du curseur au scroll
    var posCurseur = this.pageYOffset;
    // je teste la différence de distance entre le scroll et nav
    if(memoPositionNav-posCurseur< 1){
        objNav.style.position = "fixed";
        objNav.style.top = 0;
        /*document.getElementById("center").style.marginTop = String(document.getElementById("navfil").clientHeight + 15)+"px";*/
        document.getElementById("search").style.marginTop = String(document.getElementById("navfil").clientHeight + 16)+"px"
        document.getElementById("fleche").style.visibility = "visible";
    

    }
    if(posCurseur<56){
        objNav.style.position = "relative";
        document.getElementById("center").style.marginTop = "0";
        document.getElementById("fleche").style.visibility = "hidden";
        document.getElementById("search").style.marginTop = "16px"
    }
    if(this.pageYOffset + window.innerHeight >= document.querySelector("footer").offsetTop){
        document.getElementById("fleche").style.bottom = String(this.pageYOffset + window.innerHeight - document.querySelector("footer").offsetTop + 15) + "px"
    }

});





function doublefonction(lequel) {   // Permet d'appeler plusieurs fonctions en une fois
    datesok(lequel);
    prixsejour();
}

function doublefonction2(lequel) { // Permet d'appeler plusieurs fonctions en une fois
    datesok(lequel);
    filtre();
}

function doublefonction3(lequel) { // Permet d'appeler plusieurs fonctions en une fois
    nombreok(lequel);
    prixsejour();
}

function doublefonction4() {     // Permet d'appeler plusieurs fonctions en une fois
    /*var now = new Date();    
    document.getElementById("depart").setAttribute("min",now);*/
    createvoyages();
    appliquerMeteo();
}


function monFiltre(depart, arrive, dej, animaux) {
    this.depart = depart;
    this.retour = arrive;
    this.dejeuner = dej;
    this.animaux = animaux;
}

function voyageselec(dest) {
    var dest = dest; /* inutile */
    var filtreuser = new monFiltre(document.getElementById("depart").value, document.getElementById("retour").value, document.getElementById("dejeuner").checked, document.getElementById("animaux").checked);
    window.localStorage.setItem("filtre", JSON.stringify(filtreuser));


}

function d() {
    filtreuser = JSON.parse(localStorage.getItem("filtre"));
    var endroit = window.location.hash.substr(1);
    document.getElementById("voyageSelectionne").innerHTML = destinations[endroit][0];

    document.getElementById("depart").value = filtreuser.depart;
    document.getElementById("retour").value = filtreuser.retour;
    document.getElementById("dej").checked = filtreuser.dejeuner; /* bloquer petit dej à decocher si impossible d'en prendre un */
    document.getElementById("animal").checked = filtreuser.animaux; /* bloquer animaux à decocher si impossible d'en prendre un */
}
if (window.location.pathname.substring(14,window.location.pathname.length-5) == "Reservation") {
    document.getElementById('resa').addEventListener('submit',function(){
        lForm = [];
        for (var entree in document.forms["resa"].elements){
            lForm.push(document.forms["resa"].elements[entree].value)
        }
        for (var i in [1,2,3,4,5,6,7,8]){
            var pif=lForm.pop();
        }
        
        var petitDeJCheck = document.getElementById('dej').checked;
        var animauxCheck = document.getElementById('animal').checked;
        var renseignements = document.getElementById('renseignements').value;
        lForm.push(petitDeJCheck);
        lForm.push(animauxCheck);
        lForm.push(renseignements);
        var endroit = window.location.hash.substr(1);
        lForm.push(endroit);
        alert(lForm)
        window.sessionStorage.setItem("",JSON.stringify(lForm));
    })
}

function envoiPanier() {
    var strFormulaire = window.sessionStorage.getItem('formulaire');
    console.log(strFormulaire);



}
function meteo(id) {   // Récupération des données de météo 
    fetch("http://api.openweathermap.org/data/2.5/weather?id=" + destinations[id][7] + "&appid=53abf0667a0c2625fd059b88b10e51f7")
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            var temperature = Math.round(parseFloat(data.main.temp) - 273.15);
            document.getElementById(id).innerHTML += ' ' + temperature + ' °C';
        })

}
function appliquerMeteo() { // Affichage de la météo sur toutes les villes, et pas les pays

    for (var i in destinations) {
        if (destinations[i][7] != 0) {
            meteo(i)
        }
        }
}
