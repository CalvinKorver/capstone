

import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import * as utils from '../util/Functions';



export default class SwitchButton extends Component {

    // constructor(props) {
    //     super(props);
    // }

    handleClick(e) {
        window.location.href = utils.globalURLFrontend + this.props.endpoint;
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
