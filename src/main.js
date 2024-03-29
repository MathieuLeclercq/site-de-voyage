﻿var destinations = {} // Stockage des informations sur les destinations qu'on va importer depuis le fichier pays.json
fetch("pays.json").then(function(x){ return x.json();}).then(function(x){ destinations= x;})

var compte = {} // Stockage des informations sur les destinations qu'on va importer depuis le fichier compte.json
fetch("compte.json").then(function(x){ return x.json();}).then(function(x){ compte= x;})  

if (JSON.parse(sessionStorage.getItem("itemVoyages")) == null) {    // crée une liste uniquement si la liste des voyages est vide
    var lesVoyages=[];
} else {
    var lesVoyages = JSON.parse(sessionStorage.getItem("itemVoyages"));
}

function filtre() {  // Permet de griser les destinations incompatibles avec les choix rentrés dans la barre de navigation :
                    // prix max, dispo des dates, présence de petit dej, présence d'animaux.
                   // On filtre aussi selon la saisie dans la barre de recherche.

    for (var i in destinations) {
        if (!(destinations[i][0].toLowerCase().startsWith(document.getElementById("search").value.toLowerCase())) || (document.getElementById("prix").value < destinations[i][1]) || ((document.getElementById("dejeuner").checked) && (destinations[i][4] == false)) || ((document.getElementById("animaux").checked) && (destinations[i][5] == false))) {
            

            document.getElementById(i).parentNode.style.display = "None";            
        } else {
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
            clone.firstElementChild.innerHTML = newContent;
            document.getElementById("ulpays").appendChild(clone);

        } else if (destinations[i][7] != 0) {  // On s'occupe ici des villes
            let clone = document.importNode(template2.content, true);
            newContent = clone.firstElementChild.innerHTML.replace(/{{iddest}}/g, i).replace(/{{iddest2}}/g, i).replace(/{{dest}}/g, destinations[i][0]);
            clone.firstElementChild.innerHTML = newContent;
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
    var pays = window.location.hash.substring(1);
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

if (window.location.pathname.substring(14,window.location.pathname.length-5) == "homepage") {
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
            
            document.getElementById("search").style.marginTop = String(document.getElementById("navfil").clientHeight+16)+"px"
            document.getElementById("fleche").style.visibility = "visible";
        

        }
        if(posCurseur<56){
            objNav.style.position = "relative";
            document.getElementById("center").style.marginTop = "0";
            document.getElementById("fleche").style.visibility = "hidden";
            document.getElementById("search").style.marginTop = "16px";
        }
        if(this.pageYOffset + window.innerHeight >= document.querySelector("footer").offsetTop){
            document.getElementById("fleche").style.bottom = String(this.pageYOffset + window.innerHeight - document.querySelector("footer").offsetTop + 15) + "px"
        }

    });
}
else if (window.location.pathname.substring(14,window.location.pathname.length-5) == "Reservation") {
    window.addEventListener("scroll", function(){
        let memoPositionNav = document.getElementById("centerresa").offsetTop;
        // position du curseur au scroll
        var posCurseur = this.pageYOffset;
        // je teste la différence de distance entre le scroll et nav
        if(memoPositionNav-posCurseur< 1){
            document.getElementById("fleche").style.visibility = "visible";
        }

        if(posCurseur<56){
            document.getElementById("fleche").style.visibility = "hidden";
        }
        if(this.pageYOffset + window.innerHeight >= document.querySelector("footer").offsetTop){
            document.getElementById("fleche").style.bottom = String(this.pageYOffset + window.innerHeight - document.querySelector("footer").offsetTop + 15) + "px"
        }

    });
}
else {
    window.addEventListener("scroll", function(){
        let memoPositionNav = document.getElementById("center").offsetTop;
        // position du curseur au scroll
        var posCurseur = this.pageYOffset;
        // je teste la différence de distance entre le scroll et nav
        if(memoPositionNav-posCurseur< 1){
            document.getElementById("fleche").style.visibility = "visible";
        }

        if(posCurseur<56){
            document.getElementById("fleche").style.visibility = "hidden";
        }
        if(this.pageYOffset + window.innerHeight >= document.querySelector("footer").offsetTop){
            document.getElementById("fleche").style.bottom = String(this.pageYOffset + window.innerHeight - document.querySelector("footer").offsetTop + 15) + "px"
        }

    });
}

function identite(mail, photo) {
    this.pseudo = mail.substring(0,mail.length-10);
    this.photo = photo;
}

if (window.location.pathname.substring(14,window.location.pathname.length-5) == "login") { // ne s"active que quand on est sur la page login
document.getElementById('loginform').addEventListener('submit', function(){ // envoie l'id de l'utilisateur sur le sessionStorage.
    mail = document.getElementById("mail").value;
    mdp = document.getElementById("mdp").value;
    for (i in compte) {
        if ((i == mail) && (compte[i][0] == mdp)) {
            connecte = new identite(mail,compte[i][1]);
            window.sessionStorage.setItem("connecte", JSON.stringify(connecte));
        }
    }
})
}

function bellepdp(){      // Ajoute la photo de profil et l'option 'se déconnecter' quand on se connecte.
    connecte = JSON.parse(sessionStorage.getItem("connecte"));
    if (connecte != null) {
        document.getElementById("login").style.backgroundImage = "url(" + connecte.photo + ")";
        document.getElementById("login").style.backgroundSize = "contain";
        document.getElementById("login").removeAttribute("href");
        
        var deco = document.createElement("li");
        deco.id = "deco";
        document.getElementById("panel").appendChild(deco);
        var p = document.createElement("p");
        p.innerHTML = connecte.pseudo;
        var ciao = document.createElement("a");
        ciao.href = "#";
        ciao.innerHTML = "Se déconnecter";
        ciao.id = "ciao";
        p.style.margin = 0;
        ciao.style.margin = 0;
        ciao.style.marginTop = "9px";
        ciao.onclick = function() {
            connecte = null;
            window.sessionStorage.setItem("connecte", JSON.stringify(connecte));
            document.location.reload(true);
            lesVoyages = [];
            sessionStorage.setItem('itemVoyages',JSON.stringify(lesVoyages));
            
        };
        document.getElementById("deco").appendChild(p);
        document.getElementById("deco").appendChild(ciao);
    }

}


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
    createvoyages();
    appliquerMeteo();
    bellepdp();

}



function monFiltre(depart, arrive, dej, animaux) {
    this.depart = depart;
    this.retour = arrive;
    this.dejeuner = dej;
    this.animaux = animaux;
}

function voyageselec(dest) {
    var filtreuser = new monFiltre(document.getElementById("depart").value, document.getElementById("retour").value, document.getElementById("dejeuner").checked, document.getElementById("animaux").checked);
    window.sessionStorage.setItem("filtre", JSON.stringify(filtreuser));


}

function filtrepassant() {
    filtreuser = JSON.parse(sessionStorage.getItem("filtre"));
    var endroit = window.location.hash.substring(1);
    document.getElementById("voyageSelectionne").innerHTML = destinations[endroit][0];

    document.getElementById("depart").value = filtreuser.depart;
    document.getElementById("retour").value = filtreuser.retour;
    document.getElementById("dej").checked = filtreuser.dejeuner; /* bloquer petit dej à decocher si impossible d'en prendre un */
    document.getElementById("animal").checked = filtreuser.animaux; /* bloquer animaux à decocher si impossible d'en prendre un */

    bellepdp();
}


if (window.location.pathname.substring(14,window.location.pathname.length-5) == "Reservation") {
    document.getElementById('resa').addEventListener('submit',function(){ // Ajout d'un voyage dans le sessionStorage quand le formulaire est rempli.
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
        var cout = document.getElementById("prix").innerHTML;
        var endroit = window.location.hash.substr(1);
        lForm.push(petitDeJCheck);
        lForm.push(animauxCheck);
        lForm.push(renseignements);        
        lForm.push(endroit);        
        lForm.push(cout);
        lesVoyages.push(lForm);
        sessionStorage.setItem('itemVoyages',JSON.stringify(lesVoyages));
    })
}




function envoiPanier() {
    bellepdp();
    lesVoyages.forEach(ajoutDuVoyage);   // parcours des destinations, avec leurs informations.
    
}

function ajoutDuVoyage(voyage){   // Ajout dynamique des destinations l'une en dessous de l'autre.
    var p = document.createElement("p");
    var ul = document.createElement('ul');
    var li1 = document.createElement('li');
    var li2 = document.createElement('li');
    var li3 = document.createElement('li');
    var li4 = document.createElement('li');
    var li5 = document.createElement('li');
    var li6 = document.createElement('li');
    var li7 = document.createElement('li');
    var li8 = document.createElement('li');
    var li9 = document.createElement('li');
    var li10 = document.createElement('li');
    var li11 = document.createElement('li');
    var li12 = document.createElement('li');




    var nom = 'Nom et prénom : ' +voyage[0]+' ' +voyage[1];
    var prenom = voyage[1];
    var mail = 'mail du compte : ' +voyage[2];
    var tel = 'numéro de téléphone : '+voyage [3];
    var depart = 'Date de départ : '+voyage[4];
    var retour = 'Date de retour : ' +voyage [5];
    var nbAdultes = "Nombre d'adultes : "  +voyage[6];
    var nbEnfants = "Nombre d'enfants : "  +voyage[7];
    if (voyage[8] == true){
        var dej = 'Petit-déjeuner : oui';
    } else {
        var dej = 'Petit-déjeuner : non';
    }
    if (voyage[9] == true){
        var animaux = "Présence d'animaux : oui";
    } else {
        var animaux = "Présence d'animaux : non";
    }
    var commentaire = 'Commentaire supplémentaire : ' +voyage[10];
    var destination = 'destination : ' +destinations[voyage[11]][0];
    var prix = 'Prix du voyage : ' +voyage[12]+ ' €';



    li1.innerHTML = prix;
    li2.innerHTML = nom;
    li3.innerHTML = prenom;
    li4.innerHTML = mail;
    li5.innerHTML = tel;
    li6.innerHTML = depart;
    li7.innerHTML = retour;
    li8.innerHTML = nbAdultes;
    li9.innerHTML = nbEnfants;
    li10.innerHTML = dej;
    li11.innerHTML = animaux;
    li12.innerHTML = commentaire;
    p.innerHTML = destination;
    document.getElementById('tousVoyages').appendChild(p)
    p.appendChild(ul)
    ul.appendChild(li1)
    ul.appendChild(li2)
    
    ul.appendChild(li4)
    ul.appendChild(li5)
    ul.appendChild(li6)
    ul.appendChild(li7)
    ul.appendChild(li8)
    ul.appendChild(li9)
    ul.appendChild(li10)
    ul.appendChild(li11)
    ul.appendChild(li12)
    


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
