var React = require("react");
var helpers = require("../utils/helpers");
// var oauth2 = require('../../lib/oauth2');
var Link = require("react-router").Link;

// var Saved = require("./children/Saved")
// var Search = require("./children/Search");
var Modal = require("./Modal");
var Address = require("./Address");

import GoogleLogin from 'react-google-login';

var Main = React.createClass({

getInitialState: function (){
    return {
      userFirst: "",
      userLast: "",
      userEmail: "", 
      userPicture: "", 
      isLoggedIn: false, 
      modalIsOpen: false, 
      userStreet: "",
      userCity: "",
      userState: "",
      userZip: ""
      }; 
    }, 

toggleModal: function () {

  console.log(this.state.modalIsOpen);

    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    });

  console.log(this.state.modalIsOpen);

}, 

resetState: function () {

  this.setState({
      userFirst: "",
      userLast: "",
      userEmail: "", 
      userPicture: "", 
      isLoggedIn: false, 
      modalIsOpen: true,
      userStreet: "",
      userCity: "",
      userState: "",
      userZip: ""
  }); 

},

responseGoogle: function (googleUser)  {
  
    console.log(googleUser);

    var id_token = googleUser.getAuthResponse().id_token;
    console.log({accessToken: id_token});
    
    var user = googleUser.getAuthResponse(); 
    console.log(user);

    helpers.getUser(id_token) 
    .then (function(res) {

      console.log(res);

      user = {
        email: res.data.email,
        first: res.data.given_name,
        last: res.data.family_name,
        picture: res.data.picture
      }

      console.log(user);

      if(user) {
        this.setState({
          userFirst: user.first, 
          userLast: user.last, 
          userEmail: user.email, 
          userPicture: user.picture,
          isLoggedIn: true
        });

      } else {
        console.log("no user");
      }

      console.log(this.state.userFirst);

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
                           <li><Link to="/Saved">Saved Events</Link></li>
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
               
                  <h1>Welcome to ShuttleExtravaganza!</h1>
                   <p>Search for rideshare buddies who are going to the same events</p>
    
                  </div>
                </div>
          
              <Modal show={this.state.modalIsOpen}
                onClose={this.toggleModal}>
                <h4>Here's some content for the modal </h4>

                {this.state.isLoggedIn ? (
                  <img src={this.state.userPicture} />
                )}

                <GoogleLogin 
                        clientId = "620786879812-2mn1qn400k9nkd1iukoj0e9u91vivk63.apps.googleusercontent.com"
                        buttonText = "Login with Google"
                        onSuccess = {this.responseGoogle}
                        onFailure = {this.responseGoogle}
                        responseHandler = {this.responseGoogle}
                    />
      
              </Modal>



              {this.props.children}
               
                
            </div>
        );
    }
});

module.exports = Main;

