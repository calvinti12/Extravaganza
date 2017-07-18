// Include Server Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var path = require('path');
var session = require('express-session');
var MemcachedStore = require('connect-memcached')(session);

// -------------------------------------------------------
// LEAVE THESE HERE, NOT SURE IF I WILL NEED THEM LATER
//
// var passport = require('passport');
// var oauth2 = require('./lib/oauth2');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;
// -------------------------------------------------------

// Require Schema

var Event = require("./models/Event");
var User = require("./models/User");


// Create Instance of Express
var app = express();
// Sets an initial port. We'll use this later in our listener
var PORT = process.env.PORT ||3800;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(express.static("./public"));

// --------------------------------------------------------
// SESSIONS

var sessionConfig = {
  resave: false,
  saveUninitialized: false,
  secret: "extravaganza",
  signed: true
};

sessionConfig.store = new MemcachedStore({
    hosts: "memcached-10479.c10.us-east-1-2.ec2.cloud.redislabs.com:10479"
  });

app.use(session(sessionConfig));

// ---------------------------------------------------------
// MONGO 

mongoose.connect("mongodb://localhost/extravaganza");
var db = mongoose.connection;

db.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// -------------------------------------------------------------
// ROUTES

// Route to save a user to the database, but only if they're not already in there

app.post("/api/user", function (req,res) {

    User.find({"email": req.body.email})
      .exec(function(err, doc) {
          if (err) {
              console.log(err);
          } else {
              if(doc.length > 0) {
                res.send(doc[0]);

             } else { 
              var newUser = new User(req.body);
              console.log(newUser);
                  newUser.save(function(error, response) {
                    if (error) {
                        console.log(error);
                    } else {
                          console.log("new User to database id:" + response);
                          res.send(response);
                    }
                  }); 

              }
          }
        });       
});

app.get("/api/user/:id", function (req, res) {
  var id = req.params.id;
  console.log("userMongoId in /api/user/:id route is ", id);
  User.find({ _id: id}, function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      console.log("api users get, response: ", doc);
      res.send(doc);
    }
  }); 

});


// Route to get saved events
app.get("/api/events/:id", function(req, res) {
  var id = req.params.id;
  console.log("api events get request in server.js");
  Event.find({ _id: id }, function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      console.log("api events get, response: ", doc);
      res.send(doc);
    }
  })
});

// Route to save an event to database, but not if it already exists 
app.post("/api/events", function(req, res) {

// look for event with the eventID from seatGeek already in the database:
  Event.find({"eventID": req.body.eventID})
      .exec(function(err, doc) {
          if (err) {
              console.log(err);
          } else {

// If something goes wrong, console log that, but if not and you find the document.....
            if(doc.length > 0) {

                console.log("I'm the doc[0].id" + doc[0]._id); 
                console.log("im the event.body.users" + req.body.users);

// then ask if you have the user already on the event document...
                Event.find({$and: [{"_id": doc[0]._id }, {"users": {$in: [req.body.users]} } ]})
                  .exec(function(er, response) {
                    if(er) {
                       console.log(er);
                    } else {

                      if(response.length > 0) {
  // and if you do just send back the document, but don't add the user again...
                      // console.log("I'm the same event with a user in it!");
                      // console.log(doc[0]);
                      
                      res.send(doc[0]);
    //if you don't have the user on the event document already...put them on there and send the result:
                      } else {
                        Event.findOneAndUpdate({"_id": doc[0]._id}, {$push: {"users": req.body.users}})
                        .exec(function(wrong, message){
                          if(wrong) {
                            console.log(wrong);
                          } else {
                            console.log("I'm a one and update!");
                            res.send(doc[0]);
                          }
                        });

                      }
                    }

                }); 
// if you're not getting the event back because it doesn't exist, then create it.

             } else {
                var newEvent = new Event(req.body);
                console.log("save event post route ", req.body);
                newEvent.save(function(err, doc) {
                  if (err) {
                    console.log(err);
                  } else {
                    res.send(doc);
                  }
                }); 
              }
          }
      }); 
}); 



// Route to save the Event ID to the User
app.post("/api/user/database", function(req,res) {
    console.log("userMongo is in the API route", req.body);

// Look up in database where user is the request user ID and where in events array the request event ID is already there
    User.find({$and: [{"_id": req.body.userId }, {"events": {$in: [req.body.event]} } ]})
        .exec(function(er, response) {
            if(er) {
            console.log(er);
            } else {
  // and if you find that user.....
                if(response.length > 0) {
                      console.log("I'm the same user with the event in it!");
                      console.log(response[0]);
               // send that user back, but don't add it or do anything.
                      res.send(response[0]);
    //if you don't have the event on the user document already...put it on there and send the result:
                  } else {

                          User.findOneAndUpdate({ "_id": req.body.userId}, {$push:{"events": req.body.event}})
                            .exec(function(err, doc) {
                                if (err) {
                                    console.log(err);
                                } else {
                                  res.send(response);
                                }
                            }); 
                  }
            }  
    });      
});
     

// any non API GET routes will be directed to our React app and handled by React router

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// ----------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


  
