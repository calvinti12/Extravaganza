var React = require("react");

var Address = React.createClass({
  render: function() {

    return (

      <div className="container">

        <div className="row">

          <div className="col-lg-12">

            <div className="panel panel-default">
              <div className="panel-heading">
                <h3 className="panel-title">Search</h3>
              </div>
              <div className="panel-body">
                  <form>
                    <div className = "form-group">
                      <label htmlFor="topic">Topic</label>
                      <input type ="text" maxLength = "50" className = "form-control" id="topic" required onChange={this.handleTopic} />
                    </div>
                    <div className = "form-group">
                      <label htmlFor="record#">Number of Records to Retrieve</label>
                      <input type = "text" maxLength = "2" className = "form control" id="record#" value="10" readOnly/>
                    </div>
                    <div className = "form-group">
                      <label htmlFor="start-year">Start Year (optional)</label>
                      <input type = "text" maxLength = "4" className = "form control" id="start-year" onChange={this.handleStart} />
                    </div>
                    <div className = "form-group">
                      <label htmlFor="end-year">End Year (optional)</label>
                      <input type = "text" maxLength = "4" className = "form control" id="end-year" onChange={this.handleEnd} />
                    </div>
                    <button type = "submit" id="submit" className = "btn btn-default" onClick={this.handleSubmit}>Search</button>
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