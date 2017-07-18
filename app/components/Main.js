var React = require("react");
var helpers = require("../utils/helpers");
var geolocator = require("geolocator");
var Link = require("react-router").Link;


var Saved = require("./children/Saved")
var Search = require("./children/Search");

var Modal = require("./Modal");

import GoogleLogin from 'react-google-login';

var Main = React.createClass({

getInitialState: function (){
    return {
      userFirst: "",
      userLast: "",
      userEmail: "", 
      userPicture: "",       
      userStreet: "",
      userCity: "",
      userState: "",
      userZip: "",
      userLat: 0,
      userLon: 0,
      userMongo: "",
      isLoggedIn: false, 
      modalIsOpen: false, 
      }; 
    }, 

toggleModal: function () {

    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });

}, 

resetState: function () {

  this.setState({
      userFirst: "",
      userLast: "",
      userEmail: "", 
      userPicture: "", 
      userStreet: "",
      userCity: "",
      userState: "",
      userZip: "",
      userLat: 0,
      userLon: 0,
      userMongo:"",
      isLoggedIn: false, 
      modalIsOpen: true
  }); 

},

modalCheck: function() {
  var email = this.state.userEmail; 

    helpers.checkUser(email) 
    .then(function (res){
      if (res.data[0]._id) {
       
        this.toggleModal(); 
      }
    }.bind(this)); 
},

responseGoogle: function (googleUser)  {
  

    var id_token = googleUser.getAuthResponse().id_token;
    
    var user = googleUser.getAuthResponse(); 

    helpers.getUser(id_token) 
    .then (function(res) {

      user = {
        email: res.data.email,
        first: res.data.given_name,
        last: res.data.family_name,
        picture: res.data.picture
      }

      if(user) {
        this.setState({
          userFirst: user.first, 
          userLast: user.last, 
          userEmail: user.email, 
          userPicture: user.picture,
          isLoggedIn: true
        });

      this.modalCheck(); 

      } else {
        console.log("no user");
      }

    }.bind(this)); 
  }, 

handleUser: function() {

  var user = {
    first: this.state.userFirst, 
    last: this.state.userLast,
    email: this.state.userEmail,
    picture: this.state.userPicture,
    street: this.state.userStreet, 
    city: this.state.userCity,
    userState: this.state.userState,
    zip: this.state.userZip,
    lat: this.state.userLat,
    lon: this.state.userLon
  }

  helpers.saveUser(user) 
    .then (function(res) {
      this.setState({userMongo: res.data._id});
   }.bind(this)); 

},

  handleStreet: function(event) { 
    this.setState({userStreet: event.target.value});
  },

  handleCity: function (event) {
    this.setState({userCity: event.target.value});
  }, 

  handleState: function (event) {
    this.setState({userState: event.target.value});
  }, 

  handleZip: function (event) {
    this.setState({userZip: event.target.value});
  }, 

  handleClear: function(event) {
    event.preventDefault();
    this.setState({userStreet: "",  userCity: "", userState: "", userZip: ""});

  },

  handleSubmit: function(event) {
    event.preventDefault(); 

    var userAddress = {
        street: this.state.userStreet.trim(),
        city: this.state.userCity.trim(),
        userState: this.state.userState,
        zip: this.state.userZip 
    }

     this.toggleModal(); 

    geolocator.config({
        language: "en",
        google: {
            version: "3",
            key: "AIzaSyBBqE9YeYp_gFyoVxtEYJ9deixbjERVnys"
        }
    });

    var concatAddress = `${userAddress.street} ${userAddress.city}, ${userAddress.userState} ${userAddress.zip}`;

      geolocator.geocode(concatAddress, function (err, userLocation, ) {
 
          this.setState({userLat: userLocation.coords.latitude, userLon: userLocation.coords.longitude});
          this.handleUser(); 
          
      }.bind(this)); 
 }, 
 
     render: function() {
        return (
            <div className="main-container">
                {/* Navbar code */}
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">ShuttleExtravaganza!</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/Search">Event Search</Link></li>
                           <li><Link to="/Saved">My Events</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li className = "navbar-text">{this.state.userFirst} {this.state.userLast}</li>
                            <li><img src={this.state.userPicture} className = "nav_picture"/></li>

                               {!this.state.isLoggedIn ? (
                              <li><p>
                                <a href="#" className="btn btn-info navbar-btn" onClick={this.toggleModal}>
                                <span className="glyphicon glyphicon-user"></span>Login </a>
                              </p></li>
                                ): (  
                              <li><p>
                                <a href="#" className="btn btn-info navbar-btn" onClick={this.resetState}>
                                <span className="glyphicon glyphicon-user"></span>Logout </a>
                              </p></li>
                              )}

                        </ul>
                    </div>
                </nav>

                <div className = "container-fluid"> 
                  <div className="jumbotron">
                    <div className="row">
                        <div className="col-sm-8">
                          <h1>Welcome to ShuttleExtravaganza!</h1>
                          <p>Search for rideshare buddies who are going to the same events</p>
                        </div>
                        <div className="col-sm-4">
                          <img src="/img/mysteryMachine.png"/>
                        </div>
                    </div>
                  </div>
                </div>

              {React.cloneElement (
                this.props.children, {
                  logIn: this.state.isLoggedIn, 
                  first: this.state.userFirst,
                  last: this.state.userLast,
                  email: this.state.userEmail,
                  lat: this.state.userLat,
                  lon: this.state.userLon,
                  userMongo: this.state.userMongo
                })
              }
                        
              <Modal show={this.state.modalIsOpen}
                data={this.state}
                onClose={this.toggleModal}>

                {this.state.isLoggedIn ? (

                  <div className="panel panel-default">
                      <div className="panel-heading">
                      <img src={this.state.userPicture} />
                        <h2>Welcome {this.state.userFirst}! We need your pick-up address.</h2>  
                      </div>
                      <div className="panel-body">
                          <form>
                            <div className = "form-group">
                              <label htmlFor="topic">Street</label>
                              <input type ="text" maxLength = "100" className = "form-control" id="street" required value = {this.state.userStreet} onChange={this.handleStreet} />
                            </div>
                            <div className = "form-group">
                              <label htmlFor="record#">City</label>
                              <input type = "text" maxLength = "50" className = "form control" id="city" required value = {this.state.userCity} onChange={this.handleCity} />
                            </div>
                            <div className = "form-group">
                              <label htmlFor="start-year">State</label>
                              <input type = "text" maxLength = "2" className = "form control" id="state" required value = {this.state.userState} onChange={this.handleState} />
                            </div>
                            <div className = "form-group">
                              <label htmlFor="end-year">Zip Code</label>
                              <input type = "text" maxLength = "5" className = "form control" id="zipcode" required value = {this.state.userZip} onChange={this.handleZip} />
                            </div>
                            <button type = "submit" id="submit" className = "btn btn-success" onClick={this.handleSubmit}>Save</button>
                            <button type = "submit" id="clear" className = "btn btn-primary" onClick={this.handleClear}>Reset</button>

                          </form> 
                      </div>
                   
                  </div>
                ): (
                  <div>
                  <h3>We use Google Authentication to get your photo and email.</h3>
                  <GoogleLogin 
                        clientId = "620786879812-2mn1qn400k9nkd1iukoj0e9u91vivk63.apps.googleusercontent.com"
                        buttonText = "Login with Google"
                        onSuccess = {this.responseGoogle}
                        onFailure = {this.responseGoogle}
                        responseHandler = {this.responseGoogle}
                    />
                  </div>

                )}
      
              </Modal>

                
            </div>
        );
    }
});

module.exports = Main;

