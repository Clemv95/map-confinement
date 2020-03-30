// On initialise l'api PLACES sur l'input leaflet searchbox
var placesAutocomplete = places({
    appId: 'plCZRAY9T7BG',
    apiKey: '482b3fdbbbfcb03ab7227e5c2a3b8935',
    container: document.querySelector('.leaflet-searchbox'),
});