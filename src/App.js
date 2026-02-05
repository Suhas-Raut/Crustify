import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import Cart from './screens/Cart';
import VerifyEmail from "./screens/VerifyEmail";
import AdminRoutes from "./admin/AdminRoutes";
import AdminLogin from "./admin/pages/AdminLogin";
import Dashboard from "./admin/pages/Dashboard";
import Inventory from "./admin/pages/Inventory";
import Orders from "./admin/pages/Orders";


import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { CartProvider } from './components/ContextReducer';

function App() {
  return (
    <CartProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/myorder" component={MyOrder} />
          <Route exact path="/cart" component={Cart} />
          <Route path="/verify-email" component={VerifyEmail} />

         <Route exact path="/admin/login" component={AdminLogin} />

<Route
  exact
  path="/admin/dashboard"
  render={() => (
    <AdminRoutes>
      <Dashboard />
    </AdminRoutes>
  )}
/>

<Route
  exact
  path="/admin/inventory"
  render={() => (
    <AdminRoutes>
      <Inventory />
    </AdminRoutes>
  )}
/>

<Route
  exact
  path="/admin/orders"
  render={() => (
    <AdminRoutes>
      <Orders />
    </AdminRoutes>
  )}
/>

        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
