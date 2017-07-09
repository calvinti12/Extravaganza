var React = require("react");

//include helpers to update events to database onClick

var Event_list = React.createClass({
    componentWillMount: function() {
        // May remain hidden until component is mounted by clicking search?
    },
   
    render: function() {
        return (
            <div>
                <div className="panel panel-default">
                    <div className="panel-heading">Event results...</div>
                    <div className="panel-body">
                        <div className="row">

                            <div className="col-md-4">
                                <h4>{this.getTheSearch}</h4>
                                <a className="btn btn-default" href="#">More Info</a>
                            </div>
                        </div>
                   </div>
                </div>
            </div>
        );
    }
});

module.exports = Event_list;