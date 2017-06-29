// Include the Axios library for HTTP requests
var axios = require("axios");

// Helper Functions
var helpers = {

  // This will run our query.
  runQuery: function(term, start, end) {

    // Adjust to get search terms in proper format
    var formattedTerm = term.trim();

    console.log("Query Run");
    // Run a query using Axios. Then return the results as an object with an array.
    // See the Axios documentation for details on how we structured this with the params.
    return axios.get("https://api.seatgeek.com/2/events/{EVENT_ID}", {
      params: {
        "search": formattedTerm
      }
    })
    .then(function(results) {
      console.log("Axios Results", results.data.response);
      return results.data.response;
    });
  }
};


// We export the helpers function
module.exports = helpers;
