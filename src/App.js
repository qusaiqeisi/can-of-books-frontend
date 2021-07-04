import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { withAuth0 } from '@auth0/auth0-react';
import Home from './componant/Home'
import Profile from './componant/Profile'
import Content from './componant/Content'
import LoginButton from './componant/LoginButton'
import LogoutButton from './componant/LogoutButton'


export class App extends Component {
  render() {
    return (
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {
              this.props.auth0.isAuthenticated ?
            <>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
            
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            </>:
            <li>
              <Link to="/login">Login</Link>
            </li>
            }
            
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Profile">
            <Profile />
            <Content/>
          </Route>
          <Route path="/Login">
            <LoginButton />
          </Route>
          <Route path="/Logout">
            <LogoutButton />
          </Route>
        </Switch>


      </Router >
    )
  }
}

export default withAuth0(App);
