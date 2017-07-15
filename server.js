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


app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});


// ----------------------------------------------------

// Starting our express server
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});


  
