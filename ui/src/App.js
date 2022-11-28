import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import AdminClients from "./components/Admin/AdminClients";
import AdminClientsDraws from "./components/Admin/AdminClientsDraws";
import AdminClientsOrders from "./components/Admin/AdminClientsOrders";
import AdminClientsReports from "./components/Admin/AdminClientsReports";
import DriverOrders from "./components/Driver/DriverOrders";
import UserDraws from "./components/User/UserDraws";
import UserHome from "./components/User/UserHome";
import UserOrderComments from "./components/User/UserOrderComments";
import UserReports from "./components/User/UserReports";
import UserRegisterOrder from "./components/User/UserRegisterOrder";
import UserSettings from "./components/User/UserSettings";
import TrackOrder from "./components/TrackOrder";
import requireAuth from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/trackOrder/:code" component={TrackOrder} />
              <Dashboard>
                <Route
                  path="/adminClients"
                  component={requireAuth(AdminClients)}
                />
                <Route
                  path="/adminClientsDraws"
                  component={requireAuth(AdminClientsDraws)}
                />
                <Route
                  path="/adminClientsOrders"
                  component={requireAuth(AdminClientsOrders)}
                />
                <Route
                  path="/AdminClientsReports"
                  component={requireAuth(AdminClientsReports)}
                />
                <Route
                  path="/driverOrders"
                  component={requireAuth(DriverOrders)}
                />
                <Route path="/userDraws" component={requireAuth(UserDraws)} />
                <Route path="/userHome" component={requireAuth(UserHome)} />
                <Route
                  path="/userOrderComments"
                  component={requireAuth(UserOrderComments)}
                />
                <Route
                  path="/UserReports"
                  component={requireAuth(UserReports)}
                />
                <Route
                  path="/userRegisterOrder"
                  component={requireAuth(UserRegisterOrder)}
                />
                <Route
                  path="/userSettings"
                  component={requireAuth(UserSettings)}
                />
              </Dashboard>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
