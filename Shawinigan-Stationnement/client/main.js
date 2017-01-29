const MY_ACCESS_TOKEN = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
const MY_MAP_ID = 'mapbox.satellite';

var geojson, map;

Meteor.startup(function () {
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
  var bounds = [
    [-72.782743, 46.525046], // Southwest coordinates
    [-72.714694, 46.564083]  // Northeast coordinates
  ];
  map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-72.749588, 46.541601], // starting position
    //maxBounds: bounds,
    zoom: 14 // starting zoom
  });
  map.on('load',function () {
    map.addLayer({
    "id": "points",
    "type": "symbol",
    "source": {
        "type": "geojson",
        "data": {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": geolocate()
                },
                "properties": {
                    "title": "Vous etes ici",
                    "icon": "post",
                }
            }]
        }
    },
    "layout": {
        "icon-image": "{icon}-15",
        "icon-size": 2,
        "text-field": "{title}",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
    }
});
  });
})
