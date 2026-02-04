import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import Cart from './screens/Cart';
import VerifyEmail from "./screens/VerifyEmail";


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
        </Switch>
      </Router>
    </CartProvider>
  );
}

export default App;
