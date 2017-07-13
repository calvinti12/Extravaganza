var React = require("react");

//include helpers to update events to database onClick
var locations = [];

var Event_list = React.createClass({
    getInitialState: function() {
        return {
            eventTimes: []
        }
    },
    componentDidUpdate: function() {
        console.log("Event map component has updated");
        locations = [];
        //this.setState({ eventTimes: [] });
        for (var i = 0; i < this.props.results.events.length; i++) {
            // handles the venue geocoding to push into google maps API
            var venueLat = this.props.results.events[i].venue.location.lat;
            var venueLng = this.props.results.events[i].venue.location.lon;
            var venueLocation = {}
            venueLocation["lat"] = venueLat;
            venueLocation["lng"] = venueLng;
            locations.push(venueLocation);

            // handles dates to change with moment.js - work in progress
            // var uglyDateTime = this.props.results.events[i].datetime_local;
            // var uglyDate = uglyDateTime.slice(0, 10);
            // var uglyTime = uglyDateTime.slice(11, 19);
            // console.log("ugly", uglyDate, uglyTime);
        }
        // initializes the map once the for loop has finished pulling geolocations from props
        this.initMap();
    },
    handleClick: function() {
        if (this.state.showMap) {
            this.setState({ showMap: false });
        } else {
            this.setState({ showMap: true });
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
    renderEvents: function() {
        if (this.props.results.events) {
            return this.props.results.events.map(function(event, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <div className="wrapper">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <h4><em> {event.title} </em></h4> 
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <p className="pull-left"> {event.datetime_local}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-8">
                                        <p className="pull-left"> {event.venue.name} <small>@ {event.venue.address}, {event.venue.display_location} </small></p>
                                    </div>
                                    <div className="col-sm-4">
                                        <button className="btn btn-primary pull-right"> Save Event </button>
                                    </div>
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
                <div className="col-lg-5">
                    <div className="panel panel-default">
                        <div className="panel-heading">Event results...</div>
                        <div className="panel-body" id="event-results">
                            <ul className="list-group" id="ul-event-results">
                                {this.renderEvents()}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* Event map panel*/}
                <div className="col-lg-7">
                    <div className="panel panel-default" id="map-panel">
                        <div className="panel-heading">Events map...</div>
                        <div className="panel-body">
                            <div id="map"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Event_list;