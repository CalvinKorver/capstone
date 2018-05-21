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
import Footer from './subs/Footer';
import '../react_styles/ClientDashboard.css';
import * as utils from '../util/Functions';
import axios from 'axios';


class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.client = props.location.state.client;
        this.state = {
            clientView: [],
            clientCaseInfo: {}
        }
    }


    deleteCase = (caseNumber) => {
        let endpoint = 'cases?caseID=' + caseNumber;
        return axios
            .delete(utils.globalURL + endpoint)
            .then(response => {
                console.log(response.status + response.statusText);
                this.refreshCases();
            })
            .catch(err => {
                throw err
            })
    }

    refresh() {
        this.refreshCases();
    }


    refreshCases = () => {
        var id = this.props.match.params.id;
        fetch(utils.globalURL + 'case-info/?id=' + id, {mode: 'cors'})
            .then(function(response) {
                return response.json();
            })
            .then(newCases => {
                console.log(newCases);
                this.setState({
                    clientCaseInfo: newCases,
                    clientView: <CasesView key="info" client={this.client} cases={newCases} deleteCase={this.deleteCase} refresh={() => this.refresh()}/>
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    componentWillMount() {
        this.refreshCases()
    }
    
      ribbonChange = (e) => {
          console.log(e);
          if (e === "Cases") {
              this.setState({
                  clientView: <CasesView key="timeline" client={this.client} cases={this.state.clientCaseInfo} refresh={this.refreshCases}/>
              });
          } else if (e === "Information") {
            this.setState({
                clientView: <InformationView key="info" client={this.client} cases={this.state.clientCaseInfo}/>
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
                <Footer/>
            </div>
        )
    }

}

export default ClientDashboard;