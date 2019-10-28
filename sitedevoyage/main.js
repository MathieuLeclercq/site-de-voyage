var destinations = {
    "pt": ["Portugal", 200, true, true, false, true],
    "it": ["Italie", 100, true, true, true, false],
    "ir": ["Irlande", 300, true, true, true, true],
    "jp": ["Japon", 800, true, true, false, false],
    "us": ["Etats-Unis", 1100, true, true, false, true],
    "es": ["Espagne", 50, true, true, true, false],
    "lis": ["Lisbonne", 200, true, true, false, true],
    "lon": ["Londres", 500, true, true, true, false],
    "dub": ["Dublin", 400, true, true, true, true],
    "nyc": ["New York", 1100, true, true, false, false],
    "sin": ["Singapour", 800, true, true, false, true],
    "par": ["Paris", 50, true, true, true, false]
};

function filtre() {
    for (var i in destinations) {
        if ((document.getElementById("prix").value > destinations[i][1]) || ((document.getElementById("dejeuner").checked) && (destinations[i][4] == true))) {
                document.getElementById(i).style.opacity = "0.30";
                document.getElementById(i).removeAttribute("href");
            } else {
                document.getElementById(i).style.opacity = "1.00";
                document.getElementById(i).href = "Reservation.html";
            }


        }

    }