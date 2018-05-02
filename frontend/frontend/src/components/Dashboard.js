import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'

import {
    Button,
    Search,
    Divider,
    Grid,
    Container,
    Header
  } from 'semantic-ui-react'
import Client from './Client';
import NewCase from './forms/NewCase';


class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clientCases: {},
            results: {},
            value: '',
            isLoading: false,
            searchResults: []
          }
    }

    componentWillMount() {
        fetch('http://localhost:8000/clients/', {mode: 'cors'})
            .then(function(response) { return response.json(); })
            .then(function(listOfClients) {
                var clients = {};
                listOfClients.map(client => {
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
                        results: clients
                    }))
                return clients;
            })
            .then(clients => this.setState({
                clientCases: clients,
                results: clients
            }))
    }
    
    resetComponent = () => this.setState({ isLoading: false, results: this.state.clients, value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title, searchResults: result })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
            if (this.state.value.length < 1) return this.resetComponent()
            const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
            const isMatch = result => {console.log("Result: " + result.title); let test = re.test(result.title); console.log("test: " + test); return test;};
            this.setState({
                isLoading: false,
                results: _.filter(this.state.clients, isMatch),
            })
            // console.log(this.state.clients)
        }, 300)
    }

    render() {            
        const { isLoading, value, clients, results } = this.state;
        var clientRows = [];
        console.log(results);
        if (results) {
            for (var i = 1; i <= Object.keys(results).length; i++) {
                var openCaseCount;
                var caseCount;
                if (results[i].cases) {
                    caseCount = results[i].cases.length
                } else {
                    caseCount = 0;
                }
                
                var client = results[i].clientInfo;
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
                    <td></td>
                    <td></td>
                    <td>{caseCount}</td>
                    <td></td>
                </tr>
                )
            }
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
                            results={results}
                            value={value}
                            placeholder="Name or case number"
                            {...this.props}
                            // resultRenderer={resultRenderer}
                        /> 
                    </Grid.Column>

                    <Grid.Column width={2}>
                        <Button href='/new-client'> New Client </Button>
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
                            <th>Status</th>
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