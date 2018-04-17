import React, {Component} from 'react';
import {
    Button,
  } from 'semantic-ui-react'

class Layout extends Component {
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