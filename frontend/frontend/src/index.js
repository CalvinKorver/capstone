import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App'
import registerServiceWorker from './registerServiceWorker';
import Login from './components/Login';
import Register from './components/Register';
import NewCase from './components/forms/NewCase';
import NewClient from './components/forms/NewClient';
import ClientDashboard from './components/ClientDashboard';

const render = (Component) => {
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
  
}

render(App)
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', () => { render(App) })
}

registerServiceWorker();