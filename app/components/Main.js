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
    var street = this.state.userStreet.trim();
    var city= this.state.userCity.trim();
    var userState = this.state.userState;
    var zip = this.state.userZip; 

     console.log(this.state.userStreet);
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

                {this.state.isLoggedIn ? (

                  <div className="panel panel-default">
                      <div className="panel-heading">
                      <img src={this.state.userPicture} />
                        <h2>Welcome {this.state.userFirst}!  What's Your Address?</h2>  
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
                            <button type = "submit" id="submit" className = "btn btn-info" onClick={this.handleSubmit}>Save</button>
                            <button type = "submit" id="clear" className = "btn btn-primary" onClick={this.handleClear}>Reset</button>

                          </form> 
                      </div>
                    </div>
                ): (
                  <h4>Here's some content for the modal </h4>
                 
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

