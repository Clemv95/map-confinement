# Map Confinement
 Petit site afin d'afficher le rayon de 1km autour de votre maison via l'API leaflet 

# Getting Started 

Ces instructions vont vous aider à installer le projet et le configurer afin de le tester vous même ! 

## Prérequis 

Ce qu'il va vous falloir afin de configurer et tester le projet 

```bash
PHP 7 + 
```

## Installation 

Voici comment setup le projet :

Il va falloir avoir un compte [Mapbox](https://docs.mapbox.com/api/)  

Récupérer votre clé mapbox et la mettre à la place de "XXX ici : 
```javascript
var layers = {
    Streets: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
    Reliefs: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
    Satellite: L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v10/tiles/{z}/{x}/{y}?access_token=XXX'),
};
```
Il suffit d'ouvrir un serveur PHP en local, ou utiliser WAMP, XAMP etc : 

```bash
php -S localhost:8000
```

## Utilisation 

Lancer le site, entrez une adresse dans la barre de recherche, puis presser la touche **entrée**

![Site](https://i.ibb.co/VVqzVKm/t-l-chargement-1.png)

Vous pouvez également changer en passant en vue **satellite** : 

![Satellite](https://i.ibb.co/vdFK2tw/Screenshot-9.png)

# Contribution 

Les Pull sont les bienvenus. Pour des changements majeurs, merci d'ouvrir une Issue afin d'en discuter. 

# Me contacter

Mon pseudo Discord : **Clem #1234**

Mon twitter : [Frisy__](https://twitter.com/Frisy__)