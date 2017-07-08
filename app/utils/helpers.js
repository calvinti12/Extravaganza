// Include the Axios library for HTTP requests
var axios = require("axios");

//SeatGeek Api url and key
var seatgeek_APIKey = {
  Url: 'https://api.seatgeek.com/2/',
  clientID: 'NzgxMzAwNHwxNDk3MjMzNzgyLjQ5',
  clientSecret: '78ae8e5daf3e418eb42b616061c3f99c64f855d01b9950c581b24933a8a2f019'
};

// Helper Functions
var helpers = {

  // This will run our query.
  runQuery: function(seatgeek_APIKey, artist, event, venue) {

    console.log("Query Run");
    var url = seatgeek_APIKey + '/events';

    return axios.get("https://api.seatgeek.com/2/events?postal_code=60602&range=12mi&datetime_local.gte=2017-07-01&datetime_local.lt=2017-10-01&taxonomies.id=1000000&client_id=NzgxMzAwNHwxNDk3MjMzNzgyLjQ5", {
      params: {
        "client_id": seatgeek_APIKey.clientID,
        "client_secret": seatgeek_APIKey.client_secret,
        " ": artist,
        " ": event,
        " ": venue
      }
    })
    .then(function(results) {
      console.log("Axios Results", results.data.response);
      return results.data.response;
    });
  },

  }
};


// We export the helpers function
module.exports = helpers;