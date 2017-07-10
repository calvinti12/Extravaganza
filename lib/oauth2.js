// ***** DRAFT OF AN OAUTH SCRIPT *********


// // var express = require('express');
// var config = require('../config');
// var passport = require('passport');
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// function extractProfile (profile) {
//   var imageUrl = '';
//   if (profile.photos && profile.photos.length) {
//     imageUrl = profile.photos[0].value;
//   }
//   return {
//     id: profile.id,
//     displayName: profile.displayName,
//     image: imageUrl
//   };
// }


// passport.use(new GoogleStrategy({
//   clientID: "313079828473-14dtc5m3ielqo5e987o84pecsnk5g9e7.apps.googleusercontent.com",
//   clientSecret: "tVjnLZiqn88d3UplLGt4CMhD",
//   callbackURL: "http://localhost:8080/auth/google/callback",
//   accessType: 'offline'

// }, (accessToken, refreshToken, profile, cb) => {
 
//   cb(null, extractProfile(profile));
// }));


// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });


// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });


// // ROUTES

// var router = express.Router();

// // requires the user to be logged in, if the user is not logged in, it takes them back to the route where they log-in 
// function authRequired (req, res, next) {
//   if (!req.user) {
//     req.session.oauth2return = req.originalUrl;
//     return res.redirect('/auth/login');
//   }
//   next();
// }

// // exposes the user's profile as well as login/logout URLs.  These are `profile`, `login`, and `logout`.
// function addTemplateVariables (req, res, next) {
//   res.locals.profile = req.user;
//   res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
//   res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
//   next();
// }

// router.get('/auth/login',

//   // Save the url of the user's current page so the app can redirect back to
//   // it after authorization
//   (req, res, next) => {
//     if (req.query.return) {
//       req.session.oauth2return = req.query.return;
//     }
//     next();
//   },

//   // Start OAuth 2 flow using Passport.js
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// );


// router.get(
//   // OAuth 2 callback url. Use this url to configure your OAuth client in the
//   // Google Developers console
//   '/auth/google/callback',

//   // Finish OAuth 2 flow using Passport.js
//   passport.authenticate('google'),

//   // Redirect back to the original page, if any
//   (req, res) => {
//     const redirect = req.session.oauth2return || '/';
//     delete req.session.oauth2return;
//     res.redirect(redirect);
//   }
// );


// // Deletes the user's credentials and profile from the session.
// router.get('/auth/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// });



// module.exports = {
//   extractProfile: extractProfile,
//   router: router,
//   required: authRequired,
//   template: addTemplateVariables
// };



// -------------------------------------------------------------
// GOOGLE OAUTH -- PASSPORT


// function extractProfile (profile) {
//   var imageUrl = '';
//   if (profile.photos && profile.photos.length) {
//     imageUrl = profile.photos[0].value;
//   }
//   return {
//     id: profile.id,
//     displayName: profile.displayName,
//     image: imageUrl
//   };
// } 


// passport.use(new GoogleStrategy({
//   clientID: "313079828473-14dtc5m3ielqo5e987o84pecsnk5g9e7.apps.googleusercontent.com",
//   clientSecret: "tVjnLZiqn88d3UplLGt4CMhD",
//   callbackURL: "http://localhost:8080/auth/google/callback",
//   accessType: 'offline'

// }, (accessToken, refreshToken, profile, cb) => {
 
//   cb(null, extractProfile(profile));
// }));


// passport.serializeUser((user, cb) => {
//   cb(null, user);
// });


// passport.deserializeUser((obj, cb) => {
//   cb(null, obj);
// });



// // requires the user to be logged in, if the user is not logged in, it takes them back to the route where they log-in 
// function authRequired (req, res, next) {
//   if (!req.user) {
//     req.session.oauth2return = req.originalUrl;
//     return res.redirect('/auth/login');
//   }
//   next();
// }

// // exposes the user's profile as well as login/logout URLs.  These are `profile`, `login`, and `logout`.
// function addTemplateVariables (req, res, next) {
//   res.locals.profile = req.user;
//   res.locals.login = `/auth/login?return=${encodeURIComponent(req.originalUrl)}`;
//   res.locals.logout = `/auth/logout?return=${encodeURIComponent(req.originalUrl)}`;
//   next();
// }


// ------------------------------------------------------------
// AUTH ROUTES

// app.get('/auth/login',

//   // Save the url of the user's current page so the app can redirect back to
//   // it after authorization
//   (req, res, next) => {
//     if (req.query.return) {
//       req.session.oauth2return = req.query.return;
//     }
//     next();
//   },

//   // Start OAuth 2 flow using Passport.js
//   passport.authenticate('google', { scope: ['email', 'profile'] })
// );


// app.get(
//   // OAuth 2 callback url. Use this url to configure your OAuth client in the
//   // Google Developers console
//   '/auth/google/callback',

//   // Finish OAuth 2 flow using Passport.js
//   passport.authenticate('google'),

//   // Redirect back to the original page, if any
//   (req, res) => {
//     const redirect = req.session.oauth2return || '/';
//     delete req.session.oauth2return;
//     res.redirect(redirect);
//   }
// );


// // Deletes the user's credentials and profile from the session.
// app.get('/auth/logout', (req, res) => {
//   req.logout();
//   res.redirect('/');
// // });



// module.exports = {
//   extractProfile: extractProfile,
//   // router: router,
//   required: authRequired,
//   template: addTemplateVariables
// };






// app.get('/api/saved_events', oauth2.required, function (req, res, next) {
 
//  	var user = {
//     id: req.user.id,
//     name: req.user.displayName,
// 	};
    
// });

// app.post('/api/save', function(req,res,next) {
	
// 	if (req.user) {
//       var displayName = req.user.displayName;
//       var userId = req.user.id;
//     } else {
//       var person = 'Anonymous';
//     }

// }); 


