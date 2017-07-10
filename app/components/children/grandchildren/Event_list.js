var React = require("react");

// Include our helpers for API calls
var helpers = require("../../../utils/helpers");

var Event_list = React.createClass({
    getInitialState: function() {
        return {
            artistName: "",
            performanceDate: "",
            performanceName: "",
            venueName: "",
            venueAddress: "",
            venueLocation: "",
        }
    },
    handleClick: function(item) {
    console.log("CLICKED");
    
    console.log(item);
    debugger

        helpers.postSaved(item.performers[2].name, item.datetime_local, item.short_title, item.venue.name, item.venue.address, item.venue.location)
            .then(function() {

        });
    },
   
    renderSeatgeekInfo: function() {
        return this.props.results.events.map(function(event, index) {

          // Each article thus reperesents a list group item with a known index
          return (
            <div key={index}>
              <li className="list-group-item">
                <dl>
                    <dt>{seatgeek.short_title}</dt>
                    <dd>- {seatgeek.performers[2].name}</dd>
                    <dd>- {seatgeek.datetime_local}</dd>
                    <dt>{seatgeek.venue.name}</dt>
                    <dd>- {seatgeek.venue.address}</dd>
                </dl>
              </li>
            </div>
          );
        }.bind(this));
    },


    renderContainer: function() {
        return (
          <div className="main-container">
            <div className="panel panel-default">
                <div className="panel-heading">Event results...</div>
                <div className="panel-body">
                    <div className="row">

                        <div className="col-md-4">
                            <h4>{this.renderSeatgeekInfo()}</h4>
                            <a className="btn btn-default" href={seatgeek.location}>More Info</a>
                        </div>
                    </div>
               </div>
            </div>
          </div>
        );
    },
    render: function() {
        // If the user haven't search anything yet, render this HTML
        if (!this.props.results.events) {
          return (
            <li className="list-group-item">
              <h3>
                <span>
                  <em>Pick a category you would like to see...</em>
                </span>
              </h3>
            </li>
          );
        }
        // after searching, return this.renderContainer() which in turn, returns all 
        return this.renderContainer();
    }
});

module.exports = Event_list;