import { HTTP } from 'meteor/http'

function fetchZone(){
    var url = "http://www.shawinigan.ca/Citoyens/stationnement-de-nuit_170.html";
    var result = Meteor.http.get(url, {timeout:30000});
    if(result.statusCode==200) {

        console.log(result);

    }
}

//fetchZone();