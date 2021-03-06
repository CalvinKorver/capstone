import React, {Component} from 'react';
import {
    Container,
  } from 'semantic-ui-react';
import * as utils from '../util/Functions';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      client: {},
      cases: []
    }
  }

componentDidMount() {
  var id = this.props.id;
  this.setState({
    client: this.props.data
  })
  // this grabs all the cases to check which are linked to our client
  fetch(utils.globalURL + 'cases/', {mode: 'cors'})
      .then(function(response) {
        return response.json();
      })
      .then(function(caseData) {
        var casesMatch = [];
        caseData.forEach(function(singleCase){
          if(singleCase.ClientID === id){
            casesMatch.push(singleCase);
          }
        });
        return casesMatch;
      })
      .then(cases => this.setState({
          cases: cases,
      }));
}

render() {
  var clientInfo;
  var cases;
  if(!this.state.client | !this.state.cases) {
    return <div>seeing this is bad</div>;
  }
  cases = this.state.cases;
  var casesString = JSON.stringify(cases);
  clientInfo = this.state.client;
  return (
    <Container className="ClientContainer">
        <h2>{clientInfo.first_name} {clientInfo.last_name}</h2>
        {/* Cases: {casesString} */}
    </Container>

  );
}
}

export default Client;