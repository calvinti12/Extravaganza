var React = require("react");

// Include any grandchildren components here

// Include the helpers for making API calls to seatgeek API
var helpers = require("../utils/helpers");

var Saved = React.createClass({
    
    render: function() {
        return (
            <div className="main-container">
                {/* include grandchild components here*/}
                <p> Saved component is alive! </p>
            </div>
        );
    }
});

module.exports = Saved;