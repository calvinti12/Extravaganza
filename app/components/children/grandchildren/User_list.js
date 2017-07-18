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
        console.log("Database called with userId: " + userMongoId);
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
            console.log("userEvents Array is: ", userEvents);
            
            //this.componentDidUpdate();
        }.bind(this));
        
    },
    componentDidMount: function() {
        console.log("user_list component mounted");
        this.callDatabase();
        //this.renderEvents();
    },

    handleClick: function(event) {
        console.log("clicked", event._id);
        var eventId = event._id;
        helpers.getEventsById(eventId).then(function(eventByIdResults) {
            var eventUsers = eventByIdResults.data[0].users;
            console.log("eventUsers is ", eventUsers);
            this.setState({ eventUsers: eventUsers });
        }.bind(this));
    },
    renderEvents: function() {
        console.log('render events called');
        if (this.state.userEvents !== "" && this.state.userEvents.length) {
            console.log("renderEvents in user_list fired");
            return this.state.userEvents.map(function(event, index) {
                console.log("im in the map");
                return (
                    <div key={index} className="user-events" onClick={() => this.handleClick(event)}>
                        <li className="list-group-item">
                            <div className="row">
                                <div className="col-sm-6">
                                    <p>{event.eventName}</p>
                                    <p><small> ...at {event.venueName} </small></p>
                                </div>
                                <div className="col-sm-3">
                                    <p>{event.eventDate}</p>
                                </div>
                                <div className="col-sm-3">
                                    
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
        }
    },
    render: function() {
        console.log("render in user_list");
        return (
            <div className="container">
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title"> Saved Events </h3>
                        </div>
                        <div className="panel-body">
                            {this.renderEvents()}
                        </div>
                    </div>
                </div>
                {this.renderMap()}
            </div>
        );
    }
});

module.exports = User_list;