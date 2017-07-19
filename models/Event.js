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
  users: [{
    type: Schema.Types.ObjectId,
    ref: "User"
  }]
});

var Event = mongoose.model("Event", SeatgeekSchema);
module.exports = Event;