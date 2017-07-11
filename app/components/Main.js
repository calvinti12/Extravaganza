var React = require("react");
var helpers = require("../utils/helpers");
// var oauth2 = require('../../lib/oauth2');
var Link = require("react-router").Link;

import GoogleLogin from 'react-google-login';

var Main = React.createClass({

getInitialState: function (){
    return {
      userFirst: "",
      userLast: "",
      userEmail: "", 
      userPicture: "", 
      isLoggedIn: false
      }; 
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


    }.bind(this)); 
}, 


    render: function() {
        return (
            <div className="main-container">
                {/* Navbar code */}
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Extravaganza!</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><Link to="/Search">Event Search</Link></li>
                            <li><Link to="/Saved">Saved Events</Link></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li>{this.state.userFirst} {this.state.userLast}</li>
                            <li><img src={this.state.userPicture} className = "user_picture"/></li>
                            <li>
                           <GoogleLogin 
                                clientId = "620786879812-2mn1qn400k9nkd1iukoj0e9u91vivk63.apps.googleusercontent.com"
                                buttonText = "Login"
                                onSuccess = {this.responseGoogle}
                                onFailure = {this.responseGoogle}
                                responseHandler = {this.responseGoogle}
                                />
                            </li>
                        </ul>

                    </div>
                </nav>

                 {this.props.children}

                
            </div>
        );
    }
});

module.exports = Main;

