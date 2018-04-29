import React, {Component} from 'react';
import {
    Container,
    Header,
  } from 'semantic-ui-react'
import NavMenu from './subs/NavMenu';
import RibbonMenu from './subs/RibbonMenu';
import CasesView from './subs/CasesView';
import InformationView from './subs/InformationView';
import NewCase from './forms/NewCase';
import '../react_styles/ClientDashboard.css';
import SentencingCompliance from './forms/SentencingCompliance';


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientView: [
                // <CasesView client={null} key="1"/>,
                // <InformationView key="info" />
            ],
            client: {},
            cases: {}
        }
        console.log(this.state.cases);
    }

    componentWillMount() {
        console.log("comp mounted");
        var id = this.props.match.params.id;
        fetch('http://localhost:8000/clients/' + id +'/', {mode: 'cors'})
            .then(function(response) {
              return response.json();
            })
            .then(clientData => this.setState({
                client: clientData,
                // clientView: [<InformationView key="info" client={clientData}/>] THIS WILL BE THE DEFAULT ????
            }));
        // this grabs all the cases to check which are linked to our client
        fetch('http://localhost:8000/cases/', {mode: 'cors'})
            .then(function(response) {
              return response.json();
            })
            .then(function(caseData) {
              var casesMatch = [];
              caseData.forEach(function(singleCase){
                if(singleCase.clientID == id){
                  casesMatch.push(singleCase);
                }
              });
              return casesMatch;
            })
            .then(cases => this.setState({
                cases: cases,
                clientView: [<CasesView key="info" client={this.state.client} cases={cases}/>]
            }));
      }
    
      ribbonChange = (e) => {
          console.log(e);
          if (e === "Cases") {
              this.setState({
                  clientView: [<CasesView key="timeline" client={this.state.client} cases={this.state.cases}/>]
              });
          } else if (e === "Information") {
            this.setState({
                clientView: [<InformationView key="info" client={this.state.client} cases={this.state.cases}/>]
            });
          }
      };

    render() {
        var client = this.state.client;
        console.log("first case: " + this.state.cases[0]);
        var sentenceCompliance;
        if (this.state.cases[0]){
            sentenceCompliance = <SentencingCompliance caseNumber={this.state.cases[0].caseNumber}/>
        }
        return (
            <div>
                <NavMenu/>
                <Container className="ribbon-container">
                    <Header as='h1'>{client.first_name + " " + client.last_name}
                    </Header>
                    <RibbonMenu onChange={this.ribbonChange}/>
                </Container>

                <Container className = "wide">
                    <NewCase firstName={this.state.client.first_name} lastName={this.state.client.last_name}/>
                    {/* <SentencingCompliance caseNumber={this.state.cases[0].caseNumber} /> */}
                    {sentenceCompliance}
                    {this.state.clientView}
                </Container>

                {/* <NewCase firstName={this.state.FirstName} lastName={this.state.LastName}/> */}
                {/* <PreTrial />
                <SentencingCompliance />
                <Button> New Case </Button>
                <Client id={id}/> */}
            </div>
        )
    }

}

export default ClientDashboard;