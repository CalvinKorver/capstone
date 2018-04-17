
import React, {Component} from 'react';
// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
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
  if(this.state.clients[0]) {
    console.log(this.state.clients[0].id);
    clients = this.state.clients.map(client => 
      // <div key={client.id}>
      //   <h1>{client.first_name} {client.last_name}</h1>
      // </div>
      // <tr>
      //   <th>{client.first_name}</th>
      //   <th>{client.last_name}</th>
      //   <th>{client.date_of_birth}</th>
      //   <th>{client.street_address}</th>
      //   <th>{client.city}</th>
      //   <th>{client.state}</th>
      //   <th>{client.zipcode}</th>
      //   <th>{client.country}</th>
      // </tr>

      // pass client id as prop to client component
      <Client key={client.id} id={client.id}/>
    );
  }
  return (
    <div className="Clients">
      {/* <table style={{width: '100%'}}> */}
        {/* <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
          <th>Street Address</th>
          <th>City</th>
          <th>State</th>
          <th>Zipcode</th>
          <th>Country</th>
        </tr> */}
        {clients}
      {/* </table> */}
    </div>

  );
}
}

export default Clients;