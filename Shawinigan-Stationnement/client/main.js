const MY_ACCESS_TOKEN = 'pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg';
const MY_MAP_ID = 'mapbox.satellite';

var bounds = [
    [-74.04728500751165, 40.68392799015035], // Southwest coordinates
    [-73.91058699000139, 40.87764500765852]  // Northeast coordinates
];

Meteor.startup(function (){
  Mapbox.load();
})

Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = MY_ACCESS_TOKEN;
    var map = new L.mapbox.map('map', MY_MAP_ID);
    map.center = [100,100];
  }
})
