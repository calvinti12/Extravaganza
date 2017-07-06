var React = require("react");

var Link = require("react-router").Link;

var Main = React.createClass({

    render: function() {
        return (
            <div className="main-container">
                {/* Navbar code */}
                <nav className="navbar navbar-inverse">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/">Extravaganza!</a>
                        </div>
                        <ul className="nav navbar-nav">
                            <li><a href="#">Event Search</a></li>
                            <li><a href="#">Saved Events</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a href="#"><span className="glyphicon glyphicon-user"></span> Login </a></li>
                        </ul>
                    </div>
                </nav>

            </div>
        );
    }
});