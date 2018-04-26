import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Clients from './components/Clients';
import NewCase from './components/forms/NewCase';
import NewClient from './components/forms/NewClient';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import ClientDashboard from './components/ClientDashboard';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route path='/new-case' component={NewCase}/>
      <Route path='/new-client' component={NewClient}/>
      <Route path="/client/:id" component={ClientDashboard}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
