var React = require("react");

// Include our helpers for API calls
var helpers = require("../../../utils/helpers.js");

var locations = [];

var Users_map = React.createClass({
    getInitialState: function() {
        return { 
            eventUsers: ""
        };
    },
    callDatabase: function() {
        var passedUsers = this.props.eventUsers;
        var eventUsers = [];
        for (var i = 0; i < passedUsers.length; i++) {
            var userMongoId = passedUsers[i];
            helpers.getUserEvents(userMongoId).then(function(userResults) {
                eventUsers.push(userResults.data[0]);
            });
        }
        this.setState({ eventUsers: eventUsers });
    },
    componentDidMount: function() {
        console.log("Users_map component has mounted");
        this.callDatabase();
    },
    componentDidUpdate: function() {
        console.log("Users map component has updated");
        locations = [];
        // use for loop to go through user locations and push them to locations array
        if (this.state.eventUsers !== "") {
            for (var i = 0; i < this.state.eventUsers.length; i++) {
                var userLoc = {
                    lat: parseFloat(this.state.eventUsers[i].lat),
                    lng: parseFloat(this.state.eventUsers[i].lon)
                }
                locations.push(userLoc);
            }
            console.log("users_map locations", locations);
            this.initMap();
        }
        
    },
    initMap: function() {

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: {lat: 41.878114, lng: -87.629798}
            });

            // Create an array of alphabetical characters used to label the markers.
            var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

            // Add some markers to the map.
            // Note: The code uses the JavaScript Array.prototype.map() method to
            // create an array of markers based on a given "locations" array.
            // The map() method here has nothing to do with the Google Maps API.
            var markers = locations.map(function(location, i) {
                return new google.maps.Marker({
                    position: location,
                    label: labels[i % labels.length]
                });
            });

            // Add a marker clusterer to manage the markers.
            var markerCluster = new MarkerClusterer(map, markers,
                {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
        return markers;
    },
    renderUsers: function() {
        
        if (this.state.eventUsers.length) {
            return this.state.eventUsers.map(function(user, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <p>{user.first}</p>
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