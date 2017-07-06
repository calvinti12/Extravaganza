var React = require("react");

var router = require("react-router");
var Route = router.Route;
var Router = router.Router;
var IndexRoute = router.IndexRoute;
var browserHistory = router.browserHistory;

// import the high-level components
var Main = require("../components/Main");


// Export Routes
module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={Main} />
            
        {/* Indexroute will likely be search once the component is created */}    
        <IndexRoute component={Main} />
    </Router>
);
