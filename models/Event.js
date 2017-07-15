var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SeatgeekSchema = new Schema({
  eventID: {
    type: Number
  },
  eventName: {
    type: String
  },
  eventDate: {
    type: Date
  },
  venueAddress: {
    type: String
  },
  venueLocation: {
    type: String
  },

});

var Event = mongoose.model("Event", SeatgeekSchema);
module.exports = Event;