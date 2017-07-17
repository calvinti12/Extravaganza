var React = require("react");

var locations = [];

var Users_map = React.createClass({
    componentDidUpdate: function() {
        console.log("Event map component has updated");
        locations = [];

        if(this.props.results.events) {
            for (var i = 0; i < this.props.results.events.length; i++) {
                var venueName = this.props.results.events[i].title;
                // handles the venue geocoding to push into google maps API
                var venueLat = this.props.results.events[i].venue.location.lat;
                var venueLng = this.props.results.events[i].venue.location.lon;
                var venueLocation = {}
                venueLocation["name"] = venueName;
                venueLocation["lat"] = venueLat;
                venueLocation["lng"] = venueLng;
                locations.push(venueLocation);
            }

        // initializes the map once the for loop has finished pulling geolocations from props
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