var React = require("react");

var router = require("react-router");

// Route/Router component
var Route = router.Route;
var Router = router.Router;

//Indexroute (catch-all route)
var IndexRoute = router.IndexRoute;

//Include browserHistory prop to configure client side routing
var browserHistory = router.browserHistory;

// require the components here
var Main = require("../components/Main");
var Filters = require("../components/children/Filter_parameters");
var Saved = require("../components/children/Saved_events");

// Export the routes
module.exports = (
    <Router history={browserHistory}>
        <Route path="/" component={Main}>
            <Route path="Filters" component={Filters} />
            <Route path="Saved" component={Saved} />

            <IndexRoute component={Filters} />
        </Route>
    </Router>
);