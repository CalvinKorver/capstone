import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {
    Button,
    Search,
    Divider,
    Grid,
    Container,
    Header
  } from 'semantic-ui-react'
import Client from './Client';
import NewClient from './forms/NewClient';
import NewCase from './forms/NewCase';
import '../react_styles/App.css';
import * as utils from '../util/Functions';
import DashboardTable from './subs/DashboardTable';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientCases: {},
            results: {},
            value: '',
            isLoading: false,
            searchResults: [],
            trials: []
        }
    }

    fetchCases = () => {
        fetch(utils.globalURL + 'clients/', {mode: 'cors'})
        .then(function(response) { return response.json(); })
        .then(function(listClients) {
            var clients = {};
            listClients.forEach(function(client){
                client.title = client.first_name + " " + client.last_name;
            })
            listClients.map(client => {
                clients[client.id] = { 
                    clientInfo: client,
                    openCases: 0
                }
            });
            return clients;
        })
        .then(clients => {
            fetch(utils.globalURL + 'cases/', {mode: 'cors'})
                .then(function(response) { return response.json(); })
                .then(function(cases) {
                    cases.forEach(function(singleCase) {
                        var clientID = singleCase.clientID;
                        if (clients[clientID]) {
                            !clients[clientID].cases ? clients[clientID].cases = [] : null;
                            if (!singleCase.caseClosed) {
                                clients[clientID].openCases++;
                            }
                            clients[clientID].cases.push(singleCase);
                        }
                    });
                    return clients;
                })
                .then(clients => this.setState({
                    clientCases: clients,
                    results: clients,
                    searchResults: clients
                }))

            fetch(utils.globalURL + 'trials/', {mode: 'cors'})
                .then(function(response){ return response.json();})
                .then(trials => 
                    this.setState({
                        trials: trials
                    })
                )
        })
    }

    componentWillMount() {
        this.fetchCases();
    }
    
    resetComponent = () => this.setState({ isLoading: false, searchResults: this.state.results, value: '' })

    handleResultSelect = (e, { result }) => {
        var showOneResult = [];
        showOneResult.push(result);
        this.setState({ value: result.clientInfo.title, results: showOneResult })
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => {console.log("Result: " + result.clientInfo.title); let test = re.test(result.clientInfo.title); console.log("test: " + test); return test;};
            this.setState({
                isLoading: false,
                searchResults: _.filter(this.state.results, isMatch),
            })
            // console.log(this.state.clients)
        }, 300)
    }

    deleteClient = (id) => {
        console.log("trying to delete client");
        console.log(id);
        // let endpoint = 'cases?caseID=' + caseNumber;
        // return axios
        //     .delete(utils.globalURL + endpoint)
        //     .then(response => {
        //         console.log(response.status + response.statusText);
        //         this.refreshCases();
        //     })
        //     .catch(err => {
        //         throw err
        //     })
    }

    render() {            
        const { isLoading, value, clients, results, trials, searchResults } = this.state;
        return (
            <Grid padded>
                    <Grid.Column width={11}>
                            <Header as="h4"  floated="left" style={{marginTop: "8px", marginRight: "2em"}}> Client Search </Header>
                            <Search
                                className= "main-search"
                                loading={isLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                // results={searchResults}
                                showNoResults={false}
                                value={value}
                                placeholder="Name or case number"
                                // {...this.props}
                                // resultRenderer={resultRenderer}
                            /> 
                        </Grid.Column>

                        <Grid.Column width={5}>
                            <div>
                                <Button floated="right" onClick={this.props.handleLogout} style={{width: '120px', marginLeft: '1em', backgroundColor: "#ea1455", color: 'white'}}type="button" className="form-submit" >Logout</Button>
                                <NewClient refresh={this.fetchCases}/>
                            </div>
                        </Grid.Column>
                        <Container>
                    <Grid.Column width={16} >
                        <DashboardTable searchResults={searchResults} trials = {trials} deleteClient = {this.deleteClient}/>
                    </Grid.Column>
                    </Container>
                </Grid>
        )
    }

}

export default Dashboard;