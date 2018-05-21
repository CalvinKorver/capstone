import React, { Component } from 'react'
import { Button, Grid, Header, List, Segment } from 'semantic-ui-react'
import './util/ApiClient.js'
import 'styling/semantic.less'

import AuthService from './util/AuthService.js';
import withAuth from './components/withAuth';
import Layout from './components/Layout';

class App extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  handleLogout = () => {
    this.Auth.logout()
    this.props.history.replace('/login');
 }

  render() {
    return (
      <div className = "App" >
        <Layout handleLogout={this.handleLogout}/>
      </div>
    );
  }
}

export default withAuth(App);