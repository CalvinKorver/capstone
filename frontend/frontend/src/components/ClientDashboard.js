import React, {Component} from 'react';
import {
    Button,
  } from 'semantic-ui-react'
import SearchClients from './forms/SearchClients';
import Clients from './Clients';
import Dashboard from './Dashboard';

class ClientDashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button> New Case </Button>
                
            </div>
        )
    }

}

export default Layout;