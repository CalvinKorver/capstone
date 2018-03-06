

import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react'


export default class SwitchButton extends Component {

    constructor(props) {
        super(props);
    }

    handleClick(e) {
        window.location.href = 'http://localhost:3000/' + this.props.endpoint;
    }

    render() {
        return(
            <div>
                <Grid
                textAlign='center'
                style={{ height: '100%' }}
                verticalAlign='middle'>
                <div id='login-nav-div' style={{ padding: '2em' }}>
                    <Button primary={true} onClick={(event) => this.handleClick(event)}>
                    {this.props.message}
                    </Button>
                </div>
                </Grid>
            </div>
        )
    }
}
