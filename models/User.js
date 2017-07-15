var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var User = new Schema({

  first: {
    type: String,
    required: true
  },
  last: {
    type: Date,
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
    type: String
  }, 
  lon: {
    type: String
  }, 
  loggedIn: {
    type: Boolean 
  }
 
});

var User = mongoose.model("User", UserSchema);

module.exports = User;