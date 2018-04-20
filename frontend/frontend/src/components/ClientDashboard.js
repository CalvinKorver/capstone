import React, {Component} from 'react';
import {
    Container,
    Button,
  } from 'semantic-ui-react'

import NewCase from './forms/NewCase';

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "Jim",
            lastName: "Jack"
        }
    }

    render() {
        return (
            <div>
                <NewCase firstName={this.state.firstName} lastName={this.state.lastName}/>
            </div>
        )
    }

}

export default Layout;