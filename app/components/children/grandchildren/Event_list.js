var React = require("react");

//include helpers to update events to database onClick
var locations = [];

var Event_list = React.createClass({
    componentDidUpdate: function() {
        console.log("Event map component has updated");
        locations = [];
        for (var i = 0; i < this.props.results.events.length; i++) {
            var venueLat = this.props.results.events[i].venue.location.lat;
            var venueLng = this.props.results.events[i].venue.location.lon;
            var venueLocation = {}
            venueLocation["lat"] = venueLat;
            venueLocation["lng"] = venueLng;
            locations.push(venueLocation);
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
            <div>
                {/* Event results panel*/}
                <div className="panel panel-default">
                    <div className="panel-heading">Event results...</div>
                    <div className="panel-body">
                        <ul className="list-group">
                            {this.renderEvents()}
                        </ul>
                    </div>
                </div>

                {/* Event map panel*/}
                <div className="panel panel-default" id="map-panel">
                    <div className="panel-heading">Events map...</div>
                    <div className="panel-body">
                        <div id="map"></div>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = Event_list;