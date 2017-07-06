var React = require("react");
var Link = require("react-router").Link;

// Include any grandchildren components here

// Include the helpers for making API calls to seatgeek API
//var helpers = require("../utils/helpers");

var Saved = React.createClass({
    
    render: function() {
        return (
            <div className="container">
                {/* include grandchild components here*/}
                <p> Saved component is alive! </p>
            </div>
        );
    }
});

module.exports = Saved;