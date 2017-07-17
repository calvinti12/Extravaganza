var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var User = new Schema({

  first: {
    type: String,
    required: true
  },
  last: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String, 
    required: true
  },
  street: {
    type: String 
  }, 
  city: {
    type: String
  },
  userState: {
    type: String
  }, 
  zip: {
    type: String
  }, 
  lat: {
    type: Number
  }, 
  lon: {
    type: Number
  }, 
  loggedIn: {
    type: Boolean 
  }, 
  events: [{
    type: Schema.Types.ObjectId,
    ref: "Event"
  }] 

});

var User = mongoose.model("User", User);

module.exports = User;