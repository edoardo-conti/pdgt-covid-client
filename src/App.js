import React, { Component } from 'react';
import Home from './components/home';

import Login from './components/login';
import Users from './components/users';

import TrendNazionale from './components/trendNazionale';
import TrendRegionale from './components/trendRegionale';

import {  BrowserRouter as Router, Link, Route } from 'react-router-dom';
import { isAuthenticated } from './helper';

class App extends Component {

  logOut() {
    // #simpleisthebest
    localStorage.removeItem('x-access-token');
  }

  render() {
    return (
      <Router>
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid container">
            <div className="navbar-header">
              <span className="navbar-brand"><Link to="/">pdgt-covid</Link></span>
            </div>
            <ul className="nav navbar-nav">
              <li>
                <Link to="/trend/nazionale">Trend Nazionale</Link>
              </li>
              <li>
                <Link to="/trend/regionale">Trend Regionale</Link>
              </li>
              <li>
                {
                ( isAuthenticated() ) ? <Link to="/utenti">Utenti</Link>:  ''
                }
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
            {
              ( isAuthenticated() ) ? 
                ( <li onClick={this.logOut}><a href="/">Log out</a> </li>) : 
                ( <li><Link to="/login">Log in</Link></li> )
            }
            </ul>
          </div>
        </nav>
        <Route exact path="/" component={Home} />
        <Route exact path="/trend/nazionale" component={TrendNazionale} />
        <Route exact path="/trend/regionale" component={TrendRegionale} />
        <Route exact path="/utenti" component={Users} />
        <Route exact path="/login" component={Login} />
      </div>
      </Router>
    );
  }
}

export default App;