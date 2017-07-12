var React = require("react");

var Modal = React.createClass({

  render() {
    if(!this.props.show) {
      return null; 
    } 
         // The gray background
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50
    };

    // The modal "window"
    const modalStyle = {
      backgroundColor: '#ffffff',
      borderRadius: 5,
      maxWidth: 1200,
      minHeight: 500,
      margin: '0 auto',
      padding: 30
    };

    return (
      <div className="backdrop" style={backdropStyle}>
        <div className="modalWindow" style={modalStyle}>
          {this.props.children}

          <div className="footer">
            <button className = "btn btn-info" onClick={this.props.onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
});

Modal.propTypes = {
  onClose: React.PropTypes.func.isRequired,
  show: React.PropTypes.bool,
  children: React.PropTypes.node
};

module.exports = Modal;