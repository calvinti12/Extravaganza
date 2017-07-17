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

// Route to save a user to the database
app.post("/api/user", function (req,res) {
    
      var newUser = new User(req.body);
      newUser.save(function(error, doc) {

        if (error) {
            console.log(error);
        } else {
              console.log("new User to database id:" + doc);
              res.send(doc);
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
  })
});

// Route to get saved events
app.get("/api/events", function(req, res) {
  console.log("api events get request in server.js");
  Event.find({}).exec(function(err, doc) {
    if(err) {
      console.log(err);
    } else {
      console.log("api events get");
      res.send(doc);
    }
  });
});

// Route to save an event to database
app.post("/api/events", function(req, res) {
  var newEvent = new Event(req.body);
  console.log("save event post route ", req.body);
  newEvent.save(function(err, doc) {
    if (err) {
      console.log(err);
    } else {
    console.log("new Event to database id:" + doc);
      res.send(doc);
    }
  });
});


// Route to save the Event ID to the User
app.post("/api/user/database", function(req,res) {
    console.log("userMongo is in the api route!" + req.body);

    User.findOneAndUpdate({ "_id": req.body.userId}, {"events": req.body.event})
      .exec(function(err, doc) {
          if (err) {
              console.log(err);
          } else {
            res.send(doc);
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


  
