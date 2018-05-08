import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import '../index.css';

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

    componentWillMount() {
        fetch('http://localhost:8000/clients/', {mode: 'cors'})
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
                fetch('http://localhost:8000/cases/', {mode: 'cors'})
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
                        console.log(clients);
                        return clients;
                    })
                    .then(clients => this.setState({
                        clientCases: clients,
                        results: clients,
                        searchResults: clients
                    }))

                fetch('http://localhost:8000/trials/', {mode: 'cors'})
                    .then(function(response){ return response.json();})
                    .then(trials => 
                        this.setState({
                            trials: trials
                        })
                    )
                    // .then(function(trials){
                    //     trials.forEach(function(trial) {
                    //         // console.log("gets here too: " + listOfClients[0].id);
                    //         var caseID = trial.caseID;
                    //         for (var i = 1; i <= Object.keys(results).length; i++) {
                    //             if (clients[i].cases) {
                    //                 clients[i].cases.forEach(function(case){

                    //                 })
                    //             }
                    //         }
                    //         if (clients[clientID]) {
                    //             !clients[clientID].trials ? clients[clientID].trials = [] : null;
                    //             clients[clientID].trials.push(trial);
                    //         }
                    //     })
                    //     console.log("results after: " + clients);
                    //     this.setState({
                    //         results: clients
                    //     })
                    // })
            })
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

    render() {            
        const { isLoading, value, clients, results, trials, searchResults } = this.state;
        var clientRows = [];
        if (searchResults) {
            // get today's date
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd
            } 

            if(mm<10) {
                mm = '0'+mm
            } 

            var dateToday = yyyy + '-' + mm + '-' + dd;
            for (var i = 0; i < Object.keys(searchResults).length; i++) {
                if (searchResults[i]){
                    let nextCourtDate = "None coming up";
                    var openCaseCount = 0;
                    var caseCount;
                    if (searchResults[i].cases) {
                        console.log(searchResults[i]);
                        console.log(searchResults);
                        caseCount = searchResults[i].cases.length;
                        // this is ugly as fuck. Matches trials to cases and determines which is the most recent
                        searchResults[i].cases.forEach(function(singleCase){
                            if (!singleCase.isCaseClosed){
                                openCaseCount += 1;
                            }
                            trials.forEach(function(trial){
                                if(singleCase.id == trial.caseID) {
                                    if( (trial.trialDate > dateToday && nextCourtDate=="None coming up") || (nextCourtDate != "None coming up" && trial.trialDate < nextCourtDate)){
                                        nextCourtDate = trial.trialDate;
                                    }
                                }
                            })
                        })
                    } else {
                        caseCount = 0;
                    }
                    
                    var client = searchResults[i].clientInfo;
                    clientRows.push(
                    <tr key={client.id}>
                        <td>
                            <Link to={{pathname: '/client/'+client.id, state: {client: client} }}>
                                {client.first_name + " " + client.last_name}
                            </Link>
                        </td>
                        <td>
                            {client.date_of_birth}
                        </td>
                        <td>{nextCourtDate}</td>
                        <td>{openCaseCount}</td>
                        <td>{caseCount}</td>
                        {/* <td></td> */}
                    </tr>
                    )
                }
            }
            // clientRows.sort((a,b) => return a.nextCourtDate < b.nextCourtDate)
        }
        return (
            <Container className="wide">
                <Grid>
                    <Grid.Column width={14}>
                        <Header as="h4"  floated="left" style={{marginTop: "8px", marginRight: "2em"}}> Client Search </Header>
                        <Search
                            className="main-search"
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

                    <Grid.Column width={2}>
                        <NewClient/>
                    </Grid.Column>
                    {/* <Clients clients={this.state.searchResults}/> */}
                    <Grid.Column width={16}>
                    <table className="ui celled table">
                        <thead>
                            <tr><th>Name</th>
                            <th>Birth Date</th>
                            <th>Next Court Date</th>
                            <th>Open Cases</th>
                            <th>Total Cases</th>
                            {/* <th>Status</th> */}
                        </tr></thead>
                        <tbody>
                            {clientRows}
                        </tbody>
                        </table>
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

}

export default Dashboard;