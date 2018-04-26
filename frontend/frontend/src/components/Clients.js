
import React, {Component} from 'react';
import { Link } from 'react-router-dom'
// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
import {
  Button,
  Divider,
} from 'semantic-ui-react';
import Client from './Client';

class Clients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    }
  }
//   componentWillMount() {
//     // var gameScreen = [];
//     // gameScreen.push(<Game appContext={this}/>);
//     // this.setState({   gameScreen: gameScreen });
//     var loginPage = [];
//     loginPage.push(<Loginscreen appContext={this} key={"loginScreen"}/>);
//     this.setState({loginPage: loginPage})
//   }
componentDidMount() {
  // don't hardcode urls
  fetch('http://localhost:8000/clients/', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(clientData => this.setState({
          clients: clientData
      }));
}

render() {
  var clients;
  if(this.props.clients.id){ //way to check for properties, basically a null check
    console.log(this.props.clients);
    const client = this.props.clients;
    clients = 
      <div key={client.id}>
        <Link to={'/client/'+client.id}>Link to Client</Link>
        <Client key={client.id} id={client.id}/>
        <Divider/>
      </div>
  }
  else {
    clients = this.state.clients.map(client => 
      // pass client id as prop to client component
      <div key={client.id}>
        <Link to={'/client/'+client.id}>Link to Client</Link>
        <Client key={client.id} id={client.id}/>
        <Divider/>
      </div>
    );
  }
  return (
    <div className="Clients">
        {clients}
    </div>

  );
}
}

export default Clients;