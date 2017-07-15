// Include the Axios library for HTTP requests
var axios = require("axios");

var path = require("path");

//SeatGeek Api url and key
var seatgeek_APIKey = {
  Url: 'https://api.seatgeek.com/2/',
  clientID: 'NzgxMzAwNHwxNDk3MjMzNzgyLjQ5',
  clientSecret: '78ae8e5daf3e418eb42b616061c3f99c64f855d01b9950c581b24933a8a2f019'
};

// https://api.seatgeek.com/2/events?postal_code=60602&range=12mi&datetime_local.gte=2017-07-01&datetime_local.lt=2017-10-01&taxonomies.id=2010000&client_id=YOUR_KEY

// Helper Functions
var helpers = {

  // This will run our query.
  getSeatgeekGenre: function(selectedOption, startDate, endDate) {
    console.log("helper selectedOption" + selectedOption)
    console.log("helper startDate" + startDate)
    console.log("helper endDate" + endDate)
      
    let seatgeekUrl;


    switch(selectedOption) {
    case "music":
        seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=concert&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    case "sport":
         seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=sports&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    case "theater":
         seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=theater&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
        break;
    default:
        seatgeekUrl = "https://api.seatgeek.com/2/events?&geoip=true&lat=41.8781&lon=87.6298&taxonomies.name=concert&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5"
    }

    //https://api.seatgeek.com/2/venues?client_id=YOUR_CLIENT_ID&q=? this wil allow us to all endpoint
    //hardcoding chicago 
    return axios.get(seatgeekUrl + "&datetime_local.gte=" + startDate + "&datetime_local.lt=" + endDate)
      .then(function(results) {
        console.log("Axios Results", results.data.events);
        return results.data.events;
    })
  },
  getEvents: function() {
    //console.log("getEvents helper method called");
    return axios.get("/api/events").then(
      function(results) {
        console.log("axios getEvent results", results);
        return results;
      }
    );
  },
  // will save events to the database
  postSaved: function(ID, name, date, address, location) {
    console.log("postSaved called with", ID, name, date, address, location);
    var newEvent = {
      eventID: ID,
      eventName: name,
      eventDate: date,
      venueAddress: address,
      venueLocation: location 
    };
    return axios.post("/api/events", newEvent).then(
      function(response) {
        console.log("postSaved axios results", newEvent);
        return response.data._id;
      }
    );
  },

  getUser: function (id_token) {
     var url = "https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" + id_token; 

    return axios.get(url);
  } 

};




// We export the helpers function
module.exports = helpers;

