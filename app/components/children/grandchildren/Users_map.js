var React = require("react");

var locations = [];

var Users_map = React.createClass({
    componentDidUpdate: function() {
        console.log("Users map component has updated");
        locations = [];
        // use for loop to go through user locations and push them to locations array
        
        this.initMap();
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