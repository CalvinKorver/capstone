import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {createNewUser} from './util/Auth.js'
import './util/ApiClient.js'
import LoginScreen from './components/LoginScreen';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginPage: []
    }
  }

  componentWillMount() {
    var loginPage = [];
    loginPage.push(<LoginScreen appContext={this} key={"loginScreen"}/>);
    this.setState({loginPage: loginPage})
  }

  render() {
    return (
      <div className="App">
        {this.state.loginPage}
      </div>
    );
  }
}

export default App;
