var React = require("react");
var Link = require("react-router").Link;
var moment = require('moment');




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
    handleStart: function (event) {
        this.setState({startDate: event.target.value});
    }, 

    handleEnd: function (event) {
        this.setState({endDate: event.target.value});
    }, 
    handleSubmit: function(event) {

        event.preventDefault();

        if ({showMap: false}) {
            this.setState({showMap: true});
        }
    
        helpers.getSeatgeekGenre(this.state.selectedOption, this.state.startDate, this.state.endDate)

            .then(function(data){
                for (var i = 0; i < data.length; i++) {
                    var event = data[i];
                    // handles dates to change with moment.js - work in progress
                    var uglyDateTime = event.datetime_local;
                    //var uglyDate = uglyDateTime.slice(0, 10);
                    //var uglyTime = uglyDateTime.slice(11, 19);
                    var uglyHour = Number(uglyDateTime.substr(11, 2));
                    var minutes = uglyDateTime.substr(13, 3);
                    var year = uglyDateTime.substr(0, 4);
                    var date = uglyDateTime.substr(5, 5);
                    var hour = "";
                    var ampm = "";
                    if (uglyHour > 12) {
                        hour = (uglyHour - 12).toString();
                        ampm = " PM"
                    } else {
                        hour = uglryHour.toString();
                        ampm = " AM"
                    }
                    var DateTime = date + "-" + year + " at " + hour + minutes + ampm;
                    event["datetime_local"] = DateTime;
                    console.log(DateTime);
                }
                console.log("search data object with new datetimes ", data);
                this.setState({results: {events: data}})

            }.bind(this))

        this.renderChild();
    },

    handleReset: function() {
        this.setState({
            showMap: false,
            startDate: "",
            endDate: "",

            results: {},
            searchOptions: ["music", "sport", "theater"],
            selectedOption: "music"
        });

    },
    renderChild: function() {
        if (this.state.showMap) {
            return (
                <div className="row">
                    <Event_list results={this.state.results} data={this.props} />}
                </div>
            );
        }

    },
    render: function() {
        return (
           
            <div className="container" id="search-panel">
            
                {/* Event search parameter*/}
                <div className="row">
                    {this.props.logIn ? (
                    <div className="panel panel-default">
                        <div className="panel-heading"><strong>Search for events {this.props.first}!</strong></div>
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

                                    <div>
                                        <label htmlFor = "startDate">Search Start Date</label>
                                        <input type="date" className="form-control" id="startDate"
                                        value={this.state.startDate} onChange={this.handleStart} />

                                        <label htmlFor = "endDate">Search End Date</label>
                                        <input type="date" className="form-control" id="endDate"
                                        value={this.state.endDate} onChange={this.handleEnd} />
                                        
                                    </div>
                                    <br />
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button className="btn btn-danger" onClick={this.handleReset}>Reset</button>
                                </div>
                            </form>
                        </div>
                    </div> 
                    ):(

                    <div className="userReminder"><h3>Log in to continue....</h3></div>

                    )}
                </div>

                {this.props.children}
                {/* include grandchild components here} */}
                {this.renderChild()}
                 
                
               

            </div>
            
            
        );
    }
});

module.exports = Search;

//   documents/projects/'project 3'/extravaganza