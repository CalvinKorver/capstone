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
            clients: [],
            results: [],
            value: '',
            isLoading: false,
            searchResults: []
          }
    }

    componentDidMount() {
        // don't hardcode urls
        fetch('http://localhost:8000/clients/', {mode: 'cors'})
            .then(function(response) {
              return response.json();
            })
            .then(function(clientData){
                clientData.forEach(function(client){
                    client.title = client.first_name + " " + client.last_name;
                });
                return clientData;
            })
            .then(clientData => this.setState({
                clients: clientData,
                results: clientData
            }))
    }
    
    componentWillMount() {
        this.resetComponent()
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
        var renderResults;
        // console.log(value);
        // const resultRenderer = ({ first_name }) => <Label content={title} />

        // resultRenderer.propTypes = {
        //     first_name: PropTypes.string,
        //     last_name: PropTypes.string,
        
        // }
        // if(this.state.clients){
        //     console.log(this.state);
        // }
        
        if (this.state.results) {
            renderResults = this.state.results.map(client => 
                // can pass case information through here too
                <div key={client.id}>
                <Link to={'/client/'+client.id}>Review Cases</Link>
                <Client key={client.id} data={client} />
                <Divider/>
                </div>
            );
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
                    {renderResults}
                    </Grid.Column>
                </Grid>
            </Container>
        )
    }

}

export default Dashboard;