// Include React as a dependency
var React = require("react");

// Create the Event_map component
var Event_map = React.createClass({
  componentDidMount: function() {
    console.log("Event map component has mounted");
    this.initMap();
  },
  initMap: function() {

    var locations = [
        // House of Blues
        {lat: 41.8882, lng: -87.6291},
        // Chicago Theater
        {lat: 41.8855, lng: -87.6276},
        // The United Center
        {lat: 41.8807, lng: -87.6742},
        // The Allstate Arena
        {lat: 42.0053, lng: -87.8878}
      ]

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
         <div className="panel panel-default" id="map-panel">
            <div className="panel-heading">Events map...</div>
            <div className="panel-body">
                <div id="map"></div>
            </div>
        </div>

    );
  }
});

// Export the module back to the route
module.exports = Event_map;