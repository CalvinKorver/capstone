
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
  if(!this.state.clients[0]) {
    return <h1>Not updated</h1>;
  }
  return (
    <div className="Clients">
      <h3>Name:{this.state.clients[0].first_name}</h3>
    </div>

  );
}
}

export default Clients;