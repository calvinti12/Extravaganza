var React = require("react");

// Include our helpers for API calls
// var helpers = require("../../utils/helpers.js");

var User_list = React.createClass({
    componentDidMount: function() {
        console.log("User_list component mounted");
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

                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = User_list;