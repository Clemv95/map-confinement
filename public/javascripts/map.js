//Création des différents layers, afin de changer le mode d'affichage : Street, Relief, Satellite
var layers = {
    Streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Reliefs: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Satellite: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Pirate: L.tileLayer('https://api.mapbox.com/styles/v1/tempgeocent/cj2qe6qid003a2rmrquvqgbcx/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGVtcGdlb2NlbnQiLCJhIjoiY2l1YTNmenEyMDAwdDJ6cWZxbG55Yjg4OSJ9.QRTz4Pi3096MtXKc_QgpWQ'),
    Blueprint: L.tileLayer('https://api.mapbox.com/styles/v1/frisy/ckc4z1bew16p71inxkiecew0a/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
    Decimal: L.tileLayer('https://api.mapbox.com/styles/v1/frisy/ckc4yfrxp167z1ipj73qiby26/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw'),
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


// Example function to style the isoline polygons when they are returned from the API call
function styleIsolines(feature) {
    // NOTE: You can do some conditional styling by reading the properties of the feature parameter passed to the function
    if (feature.properties.Range == 5){
        colorr = "red";
    }else if (feature.properties.Range == 10){
        colorr = "blue"
    }else if (feature.properties.Range == 15){
        colorr = "green"
    }else if (feature.properties.Range == 20){
        colorr = "yellow"
    }else if (feature.properties.Range == 25){
        colorr = "purple"
    }else if (feature.properties.Range == 30){
        colorr = "brown"
    }
    return {
        color: colorr,
        opacity: 0.5,
        fillOpacity: 0.2
    };
}

// Example function to style the isoline polygons when the user hovers over them
function highlightIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;

    layer.setStyle({
        fillColor: '#ffea00',
        dashArray: '1,13',
        weight: 4,
        fillOpacity: '0.5',
        opacity: '1'
    });
}

// Example function to reset the style of the isoline polygons when the user stops hovering over them
function resetIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;

    reachabilityControl.isolinesGroup.resetStyle(layer);
}

// Example function to display information about an isoline in a popup when the user clicks on it
function clickIsolines(e) {
    // NOTE: as shown in the examples on the Leaflet website, e.target = the layer the user is interacting with
    var layer = e.target;
    var props = layer.feature.properties;
    var popupContent = 'Mode de transport: ' + props['Travel mode'] + '<br />Distance: 0 - ' + props['Range'] + ' ' + props['Range units'] + '<br />Taille de la zone : ' + props['Area'] + ' ' + props['Area units'] + '<br />Population: ' + props['Population'];
    if (props.hasOwnProperty('Reach factor')) popupContent += '<br />Facteur de déplacement: ' + props['Reach factor'];
    layer.bindPopup(popupContent).openPopup();
}

// Example function to create a custom marker at the origin of the isoline groups
function isolinesOrigin(latLng, travelMode, rangeType) {
    return L.circleMarker(latLng, { radius: 4, weight: 2, color: '#0073d4', fillColor: '#fff', fillOpacity: 1 });
}



//Init Reachability 
var reachabilityControl = L.control.reachability({
    // add settings here
    apiKey: '5b3ce3597851110001cf62488afbc44c2f36436d8e24253c8f2363f5',
    styleFn: styleIsolines,
    mouseOverFn: highlightIsolines,
    mouseOutFn: resetIsolines,
    clickFn: clickIsolines,
    markerFn: isolinesOrigin,
    expandButtonContent: '',
    expandButtonStyleClass: 'reachability-control-expand-button fa fa-bullseye',
    collapseButtonContent: '',
    collapseButtonStyleClass: 'reachability-control-collapse-button fa fa-caret-up',
    drawButtonContent: '',
    drawButtonStyleClass: 'fa fa-pencil',
    deleteButtonContent: '',
    deleteButtonStyleClass: 'fa fa-trash',
    distanceButtonContent: '',
    distanceButtonStyleClass: 'fa fa-road',
    timeButtonContent: '',
    timeButtonStyleClass: 'fa fa-clock-o',
    travelModeButton1Content: '',
    travelModeButton1StyleClass: 'fa fa-car',
    travelModeButton2Content: '',
    travelModeButton2StyleClass: 'fa fa-bicycle',
    travelModeButton3Content: '',
    travelModeButton3StyleClass: 'fa fa-male',
    travelModeButton4Content: '',
    travelModeButton4StyleClass: 'fa fa-wheelchair-alt'
}).addTo(map);

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
        map.setView([y_coord, x_coord], 14);

    }




}

