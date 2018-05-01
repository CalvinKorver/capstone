import React, { Component } from 'react'
// import moment from 'moment'
import {
    Grid,
    Segment,
    Header
  } from 'semantic-ui-react'

class InformationView extends Component {

    constructor(props) {
        super(props);
        console.log(this.props);
    }

  render() {
    let client = this.props.client;
    return (
        <Grid>
            <Grid.Column width={8}>
                <Segment>
                    <Header as="h3">
                        Contact Information
                    </Header>
                    <p>First Name: {client.first_name}</p>
                    <p>Last Name: {client.last_name}</p>
                    <p>DOB: {client.date_of_birth}</p>
                    <p>Phone number: 206-849-0192</p>
                    <p>Mail Address</p>
                    <p>Street: {client.street_address + " " + client.city}</p>
                    <p>State: {client.state}</p>
                    <p>Zip Code: {client.zipcode}</p>
                    <p>Country: {client.country}</p>

                </Segment>
            </Grid.Column>

            <Grid.Column width={8}>
            <Segment>
            <Header as="h3">
                        Legal Information
                    </Header>

                </Segment>
            </Grid.Column>

        </Grid>
    )
  }
}
export default InformationView

