
import React, {Component} from 'react';
// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

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
    clients = this.state.clients.map(client => 
      <div key={client.id}>
        <h1>{client.first_name} {client.last_name}</h1>
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