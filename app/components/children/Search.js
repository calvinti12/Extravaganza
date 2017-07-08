var React = require("react");
var Link = require("react-router").Link;

// Include any grandchildren components here
var Event_list = require("./grandchildren/Event_list");

// Include the helpers for making API calls to seatgeek API
//var helpers = require("../utils/helpers");

var Search = React.createClass({
    getInitialState: function() {
        return {
            searchResults: {},
            search: "",
            startDate: "",
            endDate: ""
        }
    },
    handleChange: function(event) {
        console.log("#" + event.target.id + " input state updated.");

        var newState = {}
        newState[event.target.id] = event.target.value;
        this.setState(newState);
        
    },
    handleSubmit: function(event) {
        event.preventDefault();
        console.log("Submit clicked");
    },
    render: function() {
        return (
            <div className="container" id="search-panel">
                
                {/* Event search parameter*/}
                <div className="row">
                    <div className="panel panel-default">
                        <div className="panel-heading">Search for events...</div>
                        <div className="panel-body">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    {/* How many inputs do we need?  Can use this input/label as template */}
                                    {/* Inputs include className, id, onChange, value, and placeholder */}
                                    <label htmlFor="search">Select Event type</label>
                                    {/* <input className="form-control" id="search" onChange={this.handleChange} 
                                    value={this.state.search} placeholder="Search event name, artist, keyword" /> */}
                                    <select className="form-control" id="search" onChange={this.handleChange} value={this.state.search}>
                                        <option>Music</option>
                                        <option>Sport</option>
                                        <option>Art</option>
                                    </select>
                                    <br />

                                    <div className="input-group">
                                        <input type="date" className="form-control" id="startDate"
                                        value={this.state.startDate} onChange={this.handleChange} />

                                        <span className="input-group-addon" />

                                        <input type="date" className="form-control" id="endDate"
                                        value={this.state.endDate} onChange={this.handleChange} />
                                        
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* include grandchild components here*/}
                <div className="row">
                    <Event_list />
                </div>
            </div>
        );
    }
});

module.exports = Search;