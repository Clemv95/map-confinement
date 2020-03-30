
  //$("#foot-placeholder").load("navfoot/foot.php");
  

  var tiles = L.tileLayer( 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZnJpc3kiLCJhIjoiY2s0N242dWR6MHVkNDNvanQyMnhlNDltNyJ9.LLrTAgXYW8ep6TSUDJCdXw', {
   maxZoom: 18,
   attribution: 'Map data &copy; <a href="http://openstreetmap.org/"> OpenStreetMap </a> contributors, ' +
   '<a href="http://creativecommons.org/"> CC-BY-SA </a>, ' +
   'Imagery © <a href="http://mapbox.com">Mapbox</a>',
   id: 'examples.map-i875mjb7'
 })

  var map = L.map('map', {layers: [tiles]}).setView([48.866667, 2.3], 6);
  var markers = L.markerClusterGroup();
  var myFeatureGroup = L.featureGroup().addTo(map);

  
  
  async function rayon() {
    markers.clearLayers();
    myFeatureGroup.clearLayers();
    var adresse = document.getElementById("recherche").value;
    document.getElementById('js-address').innerHTML = adresse;
    console.log(adresse);
    if(adresse != ""){
     await $.ajax({
              url: "https://nominatim.openstreetmap.org/search", // URL de Nominatim
              type: 'get', // Requête de type GET
              data: "q="+adresse+"&format=json&addressdetails=1&limit=1&polygon_svg=1" // Données envoyées (q -> adresse complète, format -> format attendu pour la réponse, limit -> nombre de réponses attendu, polygon_svg -> fournit les données de polygone de la réponse en svg)
            }).done(await function (response) {
              if(response != ''){
                y_coord = response[0]['lat'];
                x_coord = response[0]['lon'];
              } 
              else if(response== ''){
                y_coord = null;
                x_coord = null;

              }
              
            }).fail(function (error) {
            });      
          }

          if ((y_coord==null) && (x_coord==null) ){
            console.log("test");
          }
          else {
            var marker = L.marker([y_coord,x_coord]); 
            markers.addLayer(marker);
            map.addLayer(markers);
            L.circle([y_coord,x_coord], 1000).addTo(myFeatureGroup);
            map.setView([y_coord,x_coord], 14);

          }


          
          
        }


