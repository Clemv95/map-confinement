//Création des différents layers, afin de changer le mode d'affichage : Street, Relief, Satellite
var layers = {
    Streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
    Reliefs: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
    Satellite: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
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
searchbox.onInput("keyup", function(e) {
    if (e.keyCode == 13) {
        rayon();
    }
});

//Fonction afin d'afficher le rayon autour de l'adresse recherchée 
async function rayon() {
    //On supprime les marqueurs et cercles déja existants 
    myFeatureGroup.clearLayers();

    //On récupère la recherche
    var adresse = searchbox.getValue();

    //On utilise l'api nominatim afin de récupérer les coordonnées via l'adresse (Attention fonction asynchrone, donc bien utiliser async et await)
    if (adresse != "") {
        await $.ajax({
            url: "https://nominatim.openstreetmap.org/search",
            type: 'get',
            data: "q=" + adresse + "&format=json&addressdetails=1&limit=1&polygon_svg=1"
        }).done(await
            function(response) {
                if (response != '') {
                    y_coord = response[0]['lat'];
                    x_coord = response[0]['lon'];
                } else if (response == '') {
                    y_coord = null;
                    x_coord = null;

                }

            }).fail(function(error) {});
    }

    if ((y_coord == null) && (x_coord == null)) {
        console.log("test");
    } else {

        console.log([y_coord, x_coord]);
        //On affiche le marker sur la map ainsi que le cercle autour de l'adresse recherchée 
        var marker = L.marker([y_coord, x_coord]).addTo(myFeatureGroup);
        L.circle([y_coord, x_coord], 1000).addTo(myFeatureGroup);
        map.setView([y_coord, x_coord], 14);

    }




}
