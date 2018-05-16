import React, {Component} from 'react';
import {
    Container,
    Header,
    Grid,
    Row
  } from 'semantic-ui-react'
import NavMenu from './subs/NavMenu';
import RibbonMenu from './subs/RibbonMenu';
import CasesView from './subs/CasesView';
import InformationView from './subs/InformationView';
import NewCase from './forms/NewCase';
import '../react_styles/ClientDashboard.css';
import * as utils from '../util/Functions';


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.client = props.location.state.client;
        this.state = {
            clientView: [],
            clientCaseInfo: []
        }
    }

    componentWillMount() {
        var id = this.props.match.params.id;

        // this grabs all the cases to check which are linked to our client
        fetch(utils.globalURL + 'case-info/?id=' + id, {mode: 'cors'})
        .then(function(response) {
          return response.json();
        })
        .then(cases => {
            console.log(cases);
            this.setState({
                clientCaseInfo: cases,
                clientView: [<CasesView key="info" client={this.client} cases={cases}/>]
            })
        })
        .catch(error => {
            console.log(error);
        })
    }
    
      ribbonChange = (e) => {
          console.log(e);
          if (e === "Cases") {
              this.setState({
                  clientView: [<CasesView key="timeline" client={this.client} cases={this.state.clientCaseInfo}/>]
              });
          } else if (e === "Information") {
            this.setState({
                clientView: [<InformationView key="info" client={this.client} cases={this.state.clientCaseInfo}/>]
            });
          }
      };

    render() {
        var client = this.client;
        return (
            <div>
                <NavMenu/>
                <Grid padded>
                    <Grid.Row>
                        <Container className="ribbon-container">
                            <Header as='h1' >{client.first_name + " " + client.last_name}</Header>
                            <RibbonMenu onChange={this.ribbonChange}/>
                        </Container>
                    </Grid.Row>

                <Container className = "wide">
                    {this.state.clientView}
                </Container>

                    
                </Grid>
            </div>
        )
    }

}

export default ClientDashboard;