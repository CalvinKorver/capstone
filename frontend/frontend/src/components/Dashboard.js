import React, {Component} from 'react';
import _ from 'lodash';
import {
    Button,
    Search,
  } from 'semantic-ui-react'
import Clients from './Clients';


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
                    client.title = client.first_name + " " +client.last_name
                });
                return clientData;
            })
            .then(clientData => this.setState({
                clients: clientData
            }))
            
            // .then(clientsInfo => this.setState({
            //     clients: clientsInfo
            // }));
    }
    
    componentWillMount() {
        this.resetComponent()
    }

    resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

    handleResultSelect = (e, { result }) => this.setState({ value: result.title, searchResults: result })

    handleSearchChange = (e, { value }) => {
        this.setState({ isLoading: true, value })

        setTimeout(() => {
        if (this.state.value.length < 1) return this.resetComponent()

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
        const isMatch = result => {re.test(result.title)};
        // console.log(this.state.clients);
        this.setState({
            isLoading: false,
            results: _.filter(this.state.clients, isMatch),
        })
        }, 300)
    }

    



    render() {            
        const { isLoading, value, clients } = this.state;
        // const resultRenderer = ({ first_name }) => <Label content={title} />

        // resultRenderer.propTypes = {
        //     first_name: PropTypes.string,
        //     last_name: PropTypes.string,
        
        // }
        // if(this.state.clients){
        //     console.log(this.state);
        // }
        // console.log(clients);
        return (
            <div>
                <Button href='/new-client'> New Client </Button>
                <Search
                    loading={isLoading}
                    onResultSelect={this.handleResultSelect}
                    onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                    results={clients}
                    value={value}
                    {...this.props}
                    // resultRenderer={resultRenderer}
                />  
                <hr/>
                <Clients clients={this.state.searchResults}/>
            </div>
        )
    }

}

export default Dashboard;