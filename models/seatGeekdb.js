var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SeatgeekSchema = new Schema({
  artistName: {
    type: String
  },
  performanceDate: {
    type: Date
  },
  performanceName: {
    type: String
  },
  venueName: {
    type: String
  },
  venueAddress: {
    type: String
  },
  venueLocation: {
    type: String
  },

});

var Seatgeek = mongoose.model("Seatgeek", SeatgeekSchema);
module.exports = Seatgeek;
