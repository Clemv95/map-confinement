<!DOCTYPE html>
<html>

<head>
  <meta http-equiv="Content-type" content="text/html; charset=utf-8" />
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>Afficher la zone de confinement autour de chez vous </title>
  <link rel="stylesheet" href="assets/css/style.css">
  <script src="assets/js/jquery.min.js"></script>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.3.1/dist/leaflet.css" integrity="sha512-Rksm5RenBEKSKFjgI3a41vrjkw4EVPlJ3+OiI65vTjIdo9brlAacEuKOiQ5OFh7cOI1bkDwLqdLw3Zg0cRJAAQ==" crossorigin="" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.css" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.3.0/dist/MarkerCluster.Default.css" />
  <script src="https://unpkg.com/leaflet@1.3.1/dist/leaflet.js" integrity="sha512-/Nsx9X4HebavoBvEBuyp3I7od5tA0UzAxs+j83KgC8PU0kgB4XiK4Lfe4y4cgBtaRJQEIFCW+oC506aPT2L1zw==" crossorigin=""></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.3.0/dist/leaflet.markercluster.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/places.js@1.18.1"></script>

</head>

<div class="container">
  <h1> Rayon de confinement</h1>
  <div class="map-card">      
    <div id="map" style="width: auto; height: 500px" ></div>
    <div class="map-card__info">
      <p id='js-address'> </p>  
      <input type="text" value="" class="map-input" id="recherche" placeholder="Entrer une adresse"/>
      <button type="button" class="btn" id="btn" onclick="rayon()"> Go</button>
    </div>   

  </div>
</div>

<script src="assets/js/map.js"></script>

<script type="text/javascript">
  var placesAutocomplete = places({
    appId: 'plCZRAY9T7BG',
    apiKey: '482b3fdbbbfcb03ab7227e5c2a3b8935',
    container: document.querySelector('#recherche'),
  });

  var input = document.getElementById("recherche");

  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("btn").click();
    }
  });

</script>


<style type="text/css">
  .ap-input-icon {
    display: none;
    visibility: hidden;
  }
  .ap-dropdown-menu{
    width: 96%;
  }
</style>

