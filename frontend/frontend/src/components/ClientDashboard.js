import React, {Component} from 'react';
import {
    Container,
    Button,
  } from 'semantic-ui-react'
import SearchClients from './forms/SearchClients';
import Client from './Client';
import Dashboard from './Dashboard';
import NewCase from './forms/NewCase';
import PreTrial from './forms/PreTrial';
import SentencingCompliance from './forms/SentencingCompliance';

class ClientDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Jim",
            lastName: "Jack"
        }
    }

    render() {
        console.log(this.props);
        // gets value passed in from clients
        const id = this.props.match.params.id;
        return (
            <div>
                <NewCase firstName={this.state.firstName} lastName={this.state.lastName}/>
                <PreTrial />
                <SentencingCompliance />
                <Button> New Case </Button>
                <Client id={id}/>
            </div>
        )
    }

}

export default ClientDashboard;