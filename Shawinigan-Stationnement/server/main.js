import { Meteor } from 'meteor/meteor';

myjson = JSON.parse(Assets.getText("stationnements.geojson"));
console.log(myjson);
Meteor.startup(() => {
  // code to run on server at startup
});
