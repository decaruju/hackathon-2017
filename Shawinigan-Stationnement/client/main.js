import data from './dataset.js'

const MY_ACCESS_TOKEN = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
const MY_MAP_ID = 'mapbox.satellite';
var coord

// console.log(_.where(rows, { type: "a" }));

var radius = 20;

function getPosition() {
  coord = Geolocation.latLng();
  if (coord != null)
  return {
    "type": "Point",
    "coordinates": [coord.lng,coord.lat]
  };
  else
  return {
    "type": "Point",
    "coordinates": [0,0]
  };
}

Meteor.startup(function () {
  var geojson;
  mapboxgl.accessToken = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
  var bounds = [
    [-72.782743, 46.525046], // Southwest coordinates
    [-72.714694, 46.564083]  // Northeast coordinates
  ];
  var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', //stylesheet location
    center: [-72.749588, 46.541601], // starting position
    //maxBounds: bounds,
    zoom: 14 // starting zoom
  });
  map.addControl(new mapboxgl.GeolocateControl());
  var nav = new mapboxgl.NavigationControl();
  map.addControl(nav, 'top-left');
  map.on('load', function (){

    map.addSource('point', {
      "type": "geojson",
      "data": getPosition()
    });
    map.addLayer({
      "id": "position",
      "source": "point",
      "type": "circle",
      "paint": {
        "circle-radius":10,
        "circle-color": "blue"
      }
    });

    map.addSource('rues', {
      "type": "geojson",
      "data": data.cheval
      });
    map.addLayer({
      "id": "rue",
      "source": "rues",
      "type": "line",
      "paint": {
        "line-color": "black",
        "line-width": 3
      }
    });
  });

  setInterval(function(){map.getSource('point').setData(getPosition());}, 1000);
})

function refresh()
{

}
