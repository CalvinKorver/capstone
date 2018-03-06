import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Clients from './components/Clients';
import NewCase from './components/NewCase';
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App}/>
      <Route exact path='/login' component={Login}/>
      <Route exact path='/register' component={Register}/>
      <Route path='/clients' component={Clients}/>
      <Route path='/new_case' component={NewCase}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
