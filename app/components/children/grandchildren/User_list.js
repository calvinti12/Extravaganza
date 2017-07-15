var React = require("react");

// Include our helpers for API calls
var helpers = require("../../../utils/helpers.js");

var User_list = React.createClass({
    getInitialState: function() {
        return { userEvents: "" };
    },
    componentDidMount: function() {
        console.log("User_list component mounted");
        helpers.getEvents().then(function(eventResults) {
            this.setState({ userEvents: eventResults.data });
            console.log("eventResults in user_list mount", eventResults.data);
        }.bind(this));
    },
    renderEvents: function() {
        
        if (this.state.userEvents.length) {
            return this.state.userEvents.map(function(event, index) {
                return (
                    <div key={index}>
                        <li className="list-group-item">
                            <p>{event.eventName}</p>
                        </li>
                    </div>
                );
            }.bind(this));
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
                        <div className="panel-body">
                            {/* User's saved events render here */}
                            {this.renderEvents()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = User_list;