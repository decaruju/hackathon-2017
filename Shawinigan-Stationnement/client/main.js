import { Template } from 'meteor/templating';

const MY_ACCESS_TOKEN = pk.eyJ1IjoicG9sZW4iLCJhIjoiY2l5aG9mdWkyMDU2MDJ3b2VoYjF4MWN0dSJ9.tVz5AQpyWKIxqX_x-FHRpg;
const MY_MAP_ID = lacarte;

Mapbox.load({
  gl: true
});

// Basic
Meteor.startup(function(){
    Mapbox.load({
        plugins: ['minimap', 'markercluster']
    });
});

Deps.autorun(function () {
  if (Mapbox.loaded()) {
    L.mapbox.accessToken = MY_ACCESS_TOKEN;
    var map = L.mapbox.map('map', MY_MAP_ID);
  }
});


// Using a template's rendered callback
Meteor.startup(function(){
    Mapbox.load();
});

Template.Map.rendered = function () {
    this.autorun(function () {
        if (Mapbox.loaded()) {
            L.mapbox.accessToken = TOKEN;
            var map = L.mapbox.map('map', MAP_ID);
        }
    });
};
