var React = require("react");

var Address = React.createClass({

  handleStreet: function(event) { 
    this.setState({userStreet: event.target.value});
  },

  handleCity: function (event) {
    this.setState({userCity: event.target.value});
  }, 

  handleState: function (event) {
    this.setState({userState: event.target.value});
  }, 

  handleZip: function (event) {
    this.setState({userZip: event.target.value});
  }, 

  handleClear: function(event) {
    event.preventDefault();
    this.setState({userStreet: ""});
    this.setState({userCityt: ""});
    this.setState({userState: ""});
    this.setState({userZip: ""});
  },

  render: function() {

    return (

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">What's Your Address?</h3>
              </div>
              <div className="panel-body">
                  <form>
                    <div className = "form-group">
                      <label htmlFor="topic">Street</label>
                      <input type ="text" maxLength = "100" className = "form-control" id="street" required onChange={this.handleStreet} />
                    </div>
                    <div className = "form-group">
                      <label htmlFor="record#">City</label>
                      <input type = "text" maxLength = "50" className = "form control" id="city" onChange={this.handleCity} />
                    </div>
                    <div className = "form-group">
                      <label htmlFor="start-year">State</label>
                      <input type = "text" maxLength = "2" className = "form control" id="state" onChange={this.handleState} />
                    </div>
                    <div className = "form-group">
                      <label htmlFor="end-year">Zip Code</label>
                      <input type = "text" maxLength = "5" className = "form control" id="zipcode" onChange={this.handleZip} />
                    </div>
                    <button type = "submit" id="submit" className = "btn btn-default" onClick={this.handleSubmit}>Save</button>
                    <button type = "submit" id="clear" className = "btn btn-default" onClick={this.handleClear}>Reset</button>

                  </form> 
              </div>
            </div>

          </div>

        </div>

      </div>



    

    );
  }

});