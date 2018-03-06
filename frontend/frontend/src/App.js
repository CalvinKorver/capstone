import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './util/ApiClient.js'
import LoginScreen from './components/LoginScreen';

import AuthService from './util/AuthService.js';
import withAuth from './components/withAuth';

class App extends Component {

  constructor(props) {
    super(props);
    this.Auth = new AuthService();
  }

  handleLogout(){
    this.Auth.logout()
    this.props.history.replace('/login');
 }

  render() {
    return (
      <div className = "App" >
        <div className="App-header">
            <h2>Welcome {this.props.user.username}</h2>
        </div>
          <button type="button" className="form-submit" onClick={this.handleLogout.bind(this)}>Logout</button>
        </div>
    );
  }
}

export default withAuth(App);