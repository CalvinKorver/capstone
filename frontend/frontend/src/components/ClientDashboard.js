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


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.client = props.location.state.client;
        this.state = {
            clientView: [
                // <CasesView client={null} key="1"/>,
                // <InformationView key="info" />
            ],
            cases: {}
        }
    }

    componentWillMount() {
        console.log("comp mounted");
        var id = this.props.match.params.id;

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
            clientView: [<CasesView key="info" client={this.client} cases={cases}/>]
        }));
    }
    
      ribbonChange = (e) => {
          console.log(e);
          if (e === "Cases") {
              this.setState({
                  clientView: [<CasesView key="timeline" client={this.client} cases={this.state.cases}/>]
              });
          } else if (e === "Information") {
            this.setState({
                clientView: [<InformationView key="info" client={this.client} cases={this.state.cases}/>]
            });
          }
      };

    render() {
        var client = this.client;
        return (
            <div>
                <NavMenu/>
                <Container className="ribbon-container">
                    <Header as='h1'>{client.first_name + " " + client.last_name}
                    </Header>
                    <RibbonMenu onChange={this.ribbonChange}/>
                </Container>

                <Container className = "wide">
                    <NewCase firstName={client.first_name} lastName={client.last_name}/>
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