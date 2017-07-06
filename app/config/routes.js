var React = require("react");

var router = require("react-router");
var Route = router.Route;
var Router = router.Router;
var IndexRoute = router.IndexRoute;
var browserHistory = router.browserHistory;

// import the high-level components
var Main = require("../components/Main");
var Search = require("../components/children/Search");
var Saved = require("../components/children/Saved");


// Export Routes
module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
        
            <Route path="Search" component={Search} />
            <Route path="Saved" component={Saved} />
            
            {/* Indexroute will likely be search once the component is created */}    
            <IndexRoute component={Search} />
        </Route>
    </Router>
);
