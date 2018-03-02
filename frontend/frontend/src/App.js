import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { login } from './util/Auth.js'
import './util/ApiClient.js'

class App extends Component {

  constructor() {
    super();
  }

  handleLogin(e) {
    e.preventDefault();
    console.log("clicked");
    login("calvin", "korver");
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        
        <form>
          First name:<br/>
          <input type="text" name="firstname"/>
            <br/>
          Last name:<br/>
          <input type="text" name="lastname"/>
          <button onClick={e => this.handleLogin(e)}>submit</button>
        </form>
        
      </div>
    );
  }
}

export default App;
