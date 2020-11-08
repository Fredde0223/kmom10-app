import React from 'react';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import Start from './views/Start';
import Register from './views/Register';
import Login from './views/Login';
import Account from './views/Account';
import Objects from './views/Objects';
import Objectbuy from './views/Objectbuy';
import Objectsell from './views/Objectsell';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li>
                <Link to="/">Start</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/account">Account</Link>
              </li>
              <li>
                <Link to="/objects">Objects</Link>
              </li>
              <li>
                <Link to="/objectbuy">Buy</Link>
              </li>
              <li>
                <Link to="/objectsell">Sell</Link>
              </li>
            </ul>
          </nav>
          <Route exact path="/" component={Start} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/account" component={Account} />
          <Route exact path="/objects" component={Objects} />
          <Route exact path="/objectbuy" component={Objectbuy} />
          <Route exact path="/objectsell" component={Objectsell} />
        </div>
      </Router>
    )
  }
};

export default App;
