var React = require("react");

// Include our helpers for API calls
var helpers = require("../../../utils/helpers.js");

var locations = [];

var Users_map = React.createClass({
    getInitialState: function() {
        return { 
            eventUsers: []
        };
    },
    callDatabase: function() {
        var passedUsers = this.props.eventUsers;
        var eventUsers = [];
        for (var i = 0; i < passedUsers.length; i++) {
            var userMongoId = passedUsers[i];
            helpers.getUserEvents(userMongoId).then(function(userResults) {
                eventUsers.push(userResults.data[0]);
                console.log("eventuser state is " + eventUsers.length + " and passedUsers is " + passedUsers.length);
                if (eventUsers.length === this.props.eventUsers.length) {
                    console.log("user_maps state updated");
                    this.setState({ eventUsers: eventUsers });
                }
            }.bind(this));
        }
    },
    componentDidMount: function() {
        if (!this.state.eventUsers.length) {
            this.callDatabase();
        }
    },
    componentDidUpdate: function() {
        if (!this.state.eventUsers.length) {
            this.callDatabase();
        }
        locations = [];
        // use for loop to go through user locations and push them to locations array
        if (this.state.eventUsers.length) {
            for (var i = 0; i < this.state.eventUsers.length; i++) {
                var userLoc = {
                    name: this.state.eventUsers[i].first,
                    lat: parseFloat(this.state.eventUsers[i].lat),
                    lng: parseFloat(this.state.eventUsers[i].lon)
                }
                locations.push(userLoc);
            }

            this.initMap();

        }
        
    },
    initMap: function() {
        var labels = '1234567890';
        var labelIndex = 0;

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: new google.maps.LatLng(41.8781, -87.9298),
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();

        var marker, i;

        for (i = 0; i < locations.length; i++) { 
          marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lng),
            label: labels[labelIndex++ % labels.length],
            animation: google.maps.Animation.DROP,
            map: map
          });

          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(locations[i].name);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
    
    },
    renderUsers: function() {
        if (this.state.eventUsers !== "" && this.state.eventUsers.length) {
            return this.state.eventUsers.map(function(user, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-10">
                                            <img src={user.picture} />
                                        </div>
                                        <div className="col-sm-2">
                                            <span className="badge badge-default badge-pill">{index+1}</span>
                                        </div>
                                    </div>
                                
                                    <p>Name: {user.first}</p>
                                    <p>Email: {user.email}</p>
                                </div>
                            </div>
                        </li>
                    </div>
                );
            }.bind(this));
        }
    },
    render: function() {      
        return (
            <div className="row">
                {/* Event results panel*/}
                <div className="col-lg-4">
                    <div className="panel panel-default">
                        <div className="panel-heading">Other users</div>
                        <div className="panel-body" id="event-users">
                            <ul className="list-group" id="ul-event-users">
                                {/* render users associated with event */}
                                {this.renderUsers()}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Users map panel*/}
                <div className="col-lg-8">
                    <div className="panel panel-default" id="map-panel">
                        <div className="panel-heading">Users map...</div>
                        <div className="panel-body">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Users_map;