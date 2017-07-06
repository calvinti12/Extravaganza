var React = require("react");

// Include any grandchildren components here

// Include the helpers for making API calls to seatgeek API
var helpers = require("../utils/helpers");

var Search = React.createClass({
    
    render: function() {
        return (
            <div className="main-container">
                {/* include grandchild components here*/}
                <p> Search component is alive! </p>
            </div>
        );
    }
});

module.exports = Search;