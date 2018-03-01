import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
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
    fetch('localhost:8000')
        .then(function(response) {
            return response.json();
        })
        .then(clientData => this.setState({
            clients: clientData[0]
        }));
}

render() {
  return (
    <div className="Clients">
      {this.state.clients}
      {/* {this.state.gameScreen} */}
    </div>

  );
}
}

export default Clients;