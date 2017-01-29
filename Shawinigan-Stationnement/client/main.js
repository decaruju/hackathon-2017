import data from './dataset.js'
import f from './zoneStatus.js'

const MY_ACCESS_TOKEN = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
const MY_MAP_ID = 'mapbox.satellite';
var coord

var buttons = [false, false, false]

var radius = 20;
var zones = f.getAreaStatus();

function getPosition() {
  coord = Geolocation.latLng();
  // console.log(coord);
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
    maxBounds: bounds,
    zoom: 14 // starting zoom
  });
  window.map = map;

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
    map.addSource('ruesA', {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": _.where(data.rues.features, { "properties": "A" })
      }
    });
    map.addLayer({
      "id": "rueA",
      visibility: false,
      "source": "ruesA",
      "type": "line",
      "paint": {
        "line-color": zones.zoneA ? "green" : "red",
        "line-width": 3
      }
    });
    map.addSource('ruesB', {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": _.where(data.rues.features, { "properties": "B" })
      }
    });
    map.addLayer({
      visibility: false,
      "id": "rueB",
      "source": "ruesB",
      "type": "line",
      "paint": {
        "line-color": zones.zoneB ? "green" : "red",
        "line-width": 3
      }
    });


    map.addSource('muni', {
      "type": "geojson",
      "data": data.muni
    });
    map.addLayer({
      "id": "muni",
      "source": "muni",
      "type": "fill",
      "paint": {
        "fill-color": "purple",
        "fill-opacity": 1
      }
    });
  });

  createActionCheckbox("Cacher zone A", "rueA");
  createActionCheckbox("Cacher zone B", "rueB");

  setInterval(function(){map.getSource('point').setData(getPosition());}, 1000);
})

function createActionCheckbox(text, id) {
  console.log(text);
  console.log("ici");
  var divElm = document.createElement("div");
  var labelElm = document.createElement("label");
  var inputElm = document.createElement("input");
  inputElm.type = "checkbox"
  divElm.className = "checkbox";

  inputElm.setAttribute("zone", id);


  inputElm.onclick = function (e) {
    var currentZone = this.getAttribute("zone");
    var current = map.getLayoutProperty(currentZone, "visibility") || "visible";
    var newProp = (current === "visible") ? "none" : "visible";
    map.setLayoutProperty(currentZone, 'visibility', newProp);
  };

  labelElm.appendChild(inputElm);
  labelElm.appendChild(document.createTextNode(text));
  divElm.appendChild(labelElm);

  document.getElementById("actions").appendChild(divElm);
}

function refresh()
{

}
