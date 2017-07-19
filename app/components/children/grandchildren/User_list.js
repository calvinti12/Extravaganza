var React = require("react");

var Users_map = require("./Users_map");

// Include our helpers for API calls
var helpers = require("../../../utils/helpers.js");

var User_list = React.createClass({
    getInitialState: function() {
        return { 
            userEvents: [],
            eventUsers: []
        };
    },
    callDatabase: function() {
        var userMongoId = this.props.data.userMongo;

        helpers.getUserEvents(userMongoId).then(function(eventResults) {
            // eventResults contains the list of event IDs
            var events = eventResults.data[0].events;
            // create an empty array to push event data into from database
            
            var userEvents = [];
            
            // foor loop through the list of event Ids
            for(var i = 0; i < events.length; i++) {
                // current event Id in for loop
                var eventId = events[i];
                // pull event info by mongo id in foor loop
                helpers.getEventsById(eventId).then(function(eventByIdResults) {
                    // push result into userEvents array
                    userEvents.push(eventByIdResults.data[0]);
                    if (userEvents.length === events.length) {
                        // after all iterations, push userEvents array into state
                        this.setState({ userEvents: userEvents });
                    }   
                }.bind(this));
            }            
        }.bind(this));
        
    },
    componentDidMount: function() {
        this.callDatabase();
    },

    handleClick: function(event) {
        // console.log("clicked", event._id);
        var eventId = event._id;
        helpers.getEventsById(eventId).then(function(eventByIdResults) {
            var eventUsers = eventByIdResults.data[0].users;
            var currentUser = this.props.data.userMongo;
            var currentUserIndex;
            for (var i = 0; i < eventUsers.length; i++) {
                if (currentUser === eventUsers[i]) {
                    currentUserIndex = i;
                }
            }
            eventUsers.splice(currentUserIndex);
            console.log("eventUsers post splice is ", eventUsers);
            this.setState({ eventUsers: eventUsers });
        }.bind(this));
    },
    renderEvents: function() {
        console.log('render events called');
        if (this.state.userEvents !== "" && this.state.userEvents.length) {
            return this.state.userEvents.map(function(event, index) {
                return (
                    <div key={index} className="user-events" onClick={() => this.handleClick(event)}>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>{event.eventName}</p>
                                    <p><small> ...at {event.venueName} </small></p>
                                </div>
                                <div className="col-sm-4">
                                    <p>{event.eventDate}</p>
                                </div>
                                <div className="col-sm-2">
                                
                                </div>
                            </div>
                        </li>
                    </div>
                );
            }.bind(this));
        }
    },
    renderMap: function() {
        if (this.state.eventUsers.length) {
            return (
                <Users_map eventUsers={this.state.eventUsers} />
            );
        } else {
            return (
                <h4><em> None of these events have attendees... </em></h4>
            );
        }
    },
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title"> Saved Events </h3>
                        </div>
                        <div className="panel-body" id="user-events">
                            <ul className="list-group" id="ul-user-events">
                                {this.renderEvents()}
                            </ul>
                        </div>
                    </div>
                </div>
                {this.renderMap()}
            </div>
        );
    }
});

module.exports = User_list;