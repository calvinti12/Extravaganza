var React = require("react");
var Link = require("react-router").Link;

// Include any grandchildren components here
var Event_list = require("./grandchildren/Event_list");

// Include the helpers for making API calls to seatgeek API
var helpers = require("../../utils/helpers.js");

var Search = React.createClass({
    getInitialState: function() {
        return {

            showMap: false,
            startDate: "",
            endDate: "",

            results: {},
            searchOptions: ["music", "sport", "theater"],
            selectedOption: "music",

        }
    },
    handleChange: function(event) {
        this.setState({selectedOption: event.target.value})
    },
    handleSubmit: function(event) {
        console.log("selectedOption " + this.state.selectedOption)
        event.preventDefault();
        helpers.getSeatgeekGenre(this.state.selectedOption)
            .then(function(data){
                this.setState({results: {events: data}});
            }.bind(this))
        // this.props.updateSearch(this.state.sport)
    },
    render: function() {
        console.log("render results --search file", this.state.results);
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
                                    <select className="form-control" id="search" onChange={this.handleChange} value={this.state.selectedOption}>
                                        <option value={this.state.searchOptions[0]}>Music</option>
                                        <option value={this.state.searchOptions[1]}>Sport</option>
                                        <option value={this.state.searchOptions[2]}>Theater & Art</option>
                                    </select>
                                    <br />

                                    {/*<div className="input-group">
                                        <input type="date" className="form-control" id="startDate"
                                        value={this.state.startDate} onChange={this.handleChange} />

                                        <span className="input-group-addon" />

                                        <input type="date" className="form-control" id="endDate"
                                        value={this.state.endDate} onChange={this.handleChange} />
                                        
                                    </div>*/}
                                    <br />
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                
                {/* include grandchild components here*/}
                <div className="row">
                    <Event_list results={this.state.results} />
                    { this.state.showMap ? <Event_map showMap={this.state.showMap} /> : null }
                </div>
                {this.props.children}
            </div>
        );
    }
});

module.exports = Search;

//   documents/projects/'project 3'/extravaganza