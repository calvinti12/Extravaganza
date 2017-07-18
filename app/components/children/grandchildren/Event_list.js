var React = require("react");

//include helpers to update events to database onClick
var helpers = require("../../../utils/helpers.js");

var locations = [];

var Event_list = React.createClass({
    getInitialState: function() {
        return {
            display: "display",
            eventTimes: []
        }
    },
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

                // handles dates to change with moment.js - work in progress
                // var uglyDateTime = this.props.results.events[i].datetime_local;
                // var uglyDate = uglyDateTime.slice(0, 10);
                // var uglyTime = uglyDateTime.slice(11, 19);
                // console.log("ugly", uglyDate, uglyTime);
            }

        // initializes the map once the for loop has finished pulling geolocations from props
        this.initMap();

        }
        
    },

    saveEventOnUser: function (eventId) {
        console.log("user ID:" + this.props.data.userMongo);
        var userMongoId = this.props.data.userMongo; 
        var eventId = eventId;
        helpers.saveEventToUser(userMongoId, eventId)
            .then(function(response) {
                console.log("event added to user");
                console.log(response);
            }.bind(this));

    },

    handleClick: function(event) {
        // creates the event object to pass to the post route
        var newEvent = {
          eventID: event.id,
          eventName: event.title,
          eventDate: event.datetime_local,
          venueName: event.venue.name,
          venueAddress: event.venue.address,
          venueLocation: event.venue.display_location,
          users: this.props.data.userMongo
        };

        console.log(newEvent);

        var user = this.props.data.userMongo; 

        helpers.postSaved(newEvent, user)
        .then(function(response) {
            console.log("postSaved ran", event.title);  
            console.log(response);
            // return response.data._id;
            console.log("I am the response data id: " + response.data._id);
            this.saveEventOnUser(response.data._id);
           
        }.bind(this));
    },

    initMap: function() {

        var labels = '0123456789';
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
    renderEvents: function() {
        if (this.props.results.events) {
            return this.props.results.events.map(function(event, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <div className="wrapper">
                                <div className="row">
                                    <div className="col-sm-10">
                                        <h4><em> {event.title} </em></h4>
                                    </div>
                                    <div className="col-sm-2">
                                        <span className="badge badge-default badge-pill pull-right">{index}</span>
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
            <div id={this.state.display} className={this.props.login}>
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
            </div>
        );
    }
});

module.exports = Event_list;