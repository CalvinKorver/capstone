import React, {Component} from 'react';
// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {}
    }
  }

componentDidMount() {
  // don't hardcode urls
  console.log(this.props.id);
  fetch('http://localhost:8000/clients/' + this.props.id +'/', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(clientData => this.setState({
          client: clientData
      }));
}

render() {
  var clientInfo;
  if(!this.state.client) {
    return <div>seeing this is bad</div>;
  }
  clientInfo = this.state.client;
  return (
    <div className="ClientContainer">
        <h2>{clientInfo.first_name} {clientInfo.last_name}</h2>
        <span><button>VineLink</button> <button>DCOR</button></span>
    </div>

  );
}
}

export default Client;