var React = require("react");

//include helpers to update events to database onClick
var helpers = require("../../../utils/helpers.js");

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
        console.log(this.state);
        //this.setState({ eventTimes: [] });
        if(this.props.results.events) {
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
        }
        // initializes the map once the for loop has finished pulling geolocations from props
        this.initMap();
    },
    handleClick: function(event) {
        console.log("CLICKED", event);
        
        //helpers.postSaved(pass the info here)
        helpers.postSaved(event.id, event.title, event.datetime_local, event.venue.address, event.venue.display_location)
        .then(function() {
            console.log("postSaved ran", event.title);
        });
    },
    initMap: function() {

        var markers;
        var map;
        var markerCluster;

        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: {lat: 41.8781, lng: -87.9298}
        });

        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        markers = locations.map(function(location, i) {
            return new google.maps.Marker({
                position: location,
                label: labels[i % labels.length],
                title: "Click to zoom!"
            });
        });

        // var beaches = [
        //   ['Bondi Beach', -33.890542, 151.274856, 4],
        //   ['Coogee Beach', -33.923036, 151.259052, 5],
        //   ['Cronulla Beach', -34.028249, 151.157507, 3],
        //   ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
        //   ['Maroubra Beach', -33.950198, 151.259302, 1]
        // ];

        // for (var i = 0; i < locations.length; i++) {

            var contentString = '<div id="content">'+
              '<div id="siteNotice">'+
              '</div>'+
              '<h1 id="firstHeading" class="firstHeading">Uluru</h1>'+
              '<div id="bodyContent">'+
              '<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large ' +
              'sandstone rock formation in the southern part of the '+
              'Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) '+
              'south west of the nearest large town, Alice Springs; 450&#160;km '+
              '(280&#160;mi) by road. Kata Tjuta and Uluru are the two major '+
              'features of the Uluru - Kata Tjuta National Park. Uluru is '+
              'sacred to the Pitjantjatjara and Yankunytjatjara, the '+
              'Aboriginal people of the area. It has many springs, waterholes, '+
              'rock caves and ancient paintings. Uluru is listed as a World '+
              'Heritage Site.</p>'+
              '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">'+
              'https://en.wikipedia.org/w/index.php?title=Uluru</a> '+
              '(last visited June 22, 2009).</p>'+
              '</div>'+
              '</div>';

            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            // markers = locations.map(function(location, p) {
            // return new google.maps.Marker({
            //     position: location[i],
            //     label: labels[p % labels.length],
            //     title: "something small..."
            // });

            // markers = new google.maps.Marker({
            //   position: location[i],
            //   map: map,
            //   title: "Something else...",
            // });

            google.maps.event.addListener(markers, 'click', function() {
                console.log("Marker Clicked!!");
                infowindow.open(map, markers);
            });
        // };
        // marker = new google.maps.Marker({
        //   position: {lat: 41.878114, lng: -87.629798},
        //   map: map
        // });

        // Add a marker clusterer to manage the markers.
        // markerCluster = new MarkerClusterer(map, marker,
        //     {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
    
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
                                        <button className="btn btn-primary pull-right" onClick={() => this.handleClick(event)}> Save Event </button>
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
                        <div className="panel-heading">Event list...</div>
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