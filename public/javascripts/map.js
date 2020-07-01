//Création des différents layers, afin de changer le mode d'affichage : Street, Relief, Satellite
var layers = {
    Streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Reliefs: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Satellite: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
};

//Initialision de la map, au milieu de la france 
var map = L.map('map', { layers: [layers.Streets] }).setView([48.866667, 2.3], 6);

//Création du bouton pour changer de layer
L.control.layers(null, layers, { position: 'bottomright' }).addTo(map);




//Création du groupe pour les cercles de non confinement et des markers
var myFeatureGroup = L.featureGroup().addTo(map);

//Affichage du niveau de zoom en haut à droite
map.zoomControl.setPosition('bottomright');

//Ajout de la zone de recherche, en l'affichant toujours avec le .show
var searchbox = L.control.searchbox({
    position: 'topleft',
    expand: 'right',
}).addTo(map);
searchbox.show()


//Fonction qui va s'éxécuter quand la touche entrée sera préssée dans la barre de recherche
searchbox.onInput("keyup", function (e) {
    if (e.keyCode == 13) {
        rayon();
    }
});


//Legende

function getRadius(r) {
    return r > 100 ? 12 :
        r > 50 ? 9 :
            r > 20 ? 6 :
                r > 10 ? 4 :
                    0;
}
var legend = L.control({ position: 'bottomleft' });
        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend');
            grades = [15, 40, 80],
                color = ["#c4141a", "#1738bd", '#1f9114'],

                labels = ['<strong>Distance parcourue en temps</strong>'],
                categories = ['5 min ', '10 min', '15 min'];

            for (var i = 0; i < grades.length; i++) {
                var grade = grades[i];//*0.5;
                labels.push(
                    '<i class="circlepadding" style="width: ' + Math.max(8, (7 - 2.2 * getRadius(grade))) + 'px;"></i> <i style="background: ' + color[i]+'; width: ' + getRadius(grade) * 2 + 'px; height: ' + getRadius(grade) * 2 + 'px; border-radius: 50%; margin-top: ' + Math.max(0, (9 - getRadius(grade))) + 'px;"></i><i class="circlepadding" style="width: ' + Math.max(2, (25 - 2 * getRadius(grade))) + 'px;"></i> ' + categories[i]);
            }
            div.innerHTML = labels.join('<br>');
            return div;
        };
        legend.addTo(map);


//Fonction afin d'afficher le rayon autour de l'adresse recherchée 
async function rayon() {
    //On supprime les marqueurs et cercles déja existants 
    //myFeatureGroup.clearLayers();

    //On récupère la recherche
    var adresse = searchbox.getValue();

    //On utilise l'api nominatim afin de récupérer les coordonnées via l'adresse (Attention fonction asynchrone, donc bien utiliser async et await)
    if (adresse != "") {
        await $.ajax({
            url: "https://api-adresse.data.gouv.fr/search/",
            type: 'get',
            data: "q=" + adresse + "&limit=1"
        }).done(await
            function (response) {
                if (response != '') {
                    data = JSON.parse(JSON.stringify(response));
                    y_coord = data.features[0].geometry.coordinates[1];
                    x_coord = data.features[0].geometry.coordinates[0];
                } else if (response == '') {
                    y_coord = null;
                    x_coord = null;

                }

            }).fail(function (error) { });
    }

    if ((y_coord == null) && (x_coord == null)) {
        console.log("test");
    } else {

        //On affiche le marker sur la map ainsi que le cercle autour de l'adresse recherchée 
        var marker = L.marker([y_coord, x_coord]).addTo(myFeatureGroup);
        L.circle([y_coord, x_coord], 400, { color: 'red' }).addTo(myFeatureGroup);
        L.circle([y_coord, x_coord], 800, { color: 'blue' }).addTo(myFeatureGroup);
        L.circle([y_coord, x_coord], 1200, { color: 'green' }).addTo(myFeatureGroup);

        map.setView([y_coord, x_coord], 14);

    }




}

