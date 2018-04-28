import React, { Component } from 'react'
// import moment from 'moment'
import TimelineShell from '../TimelineShell';
import {
    Grid,
    Search,
    Header,
    Segment
  } from 'semantic-ui-react';

import NewCase from '../forms/NewCase';

class CasesView extends Component {

  render() {
    return (
        <Grid>
            <Grid.Column width={12}>
                <Header as="h4"  floated="left" style={{marginTop: "6px"}}> Case Search </Header>
                <Search size="small"/>
            </Grid.Column>

            <Grid.Column width={4}>
                <NewCase/>
            </Grid.Column>

            <Grid.Column width={16}>
                <TimelineShell client={this.props.client}/>
            </Grid.Column>

            <Grid.Column width={12}>
                <Segment>
                    <Header as="h4"  textAlign="centered"> Client Case List </Header>
                </Segment>
            </Grid.Column>

            <Grid.Column width={4}>
            <Segment>
            <Header as="h4"  textAlign="centered"> Notification </Header>

            </Segment>
                
            </Grid.Column>

        </Grid>
    )
  }
}
export default CasesView

