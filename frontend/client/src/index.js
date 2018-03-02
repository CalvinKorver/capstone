import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Clients from './Clients';
import registerServiceWorker from './registerServiceWorker';

import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path='/' component={App}/>
      <Route path='/clients' component={Clients}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();











// import {Router, Route, IndexRoute, hashHistory} from "react-router";

// var router = (
//     <Router history={hashHistory}>
//         <Route path="/" component={App}>
//             <IndexRoute component={Products}></IndexRoute>
//             <Route path="/cart" component={Cart}></Route>
//         </Route>
//     </Router>
// );

// render(router, document.getElementById("app"));