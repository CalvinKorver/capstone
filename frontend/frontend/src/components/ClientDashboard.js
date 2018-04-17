import React, {Component} from 'react';
import {
    Button,
  } from 'semantic-ui-react'
import SearchClients from './forms/SearchClients';
import Clients from './Clients';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Button> New Case </Button>
                {/* This component needs a combination of two components, the client and the client search */}
                <SearchClients/>
                <hr/>
                <Clients/>
            </div>
        )
    }

}

export default Layout;