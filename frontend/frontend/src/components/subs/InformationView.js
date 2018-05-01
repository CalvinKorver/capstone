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
                    <p>First Name: {client.FirstName}</p>
                    <p>Last Name: {client.LastName}</p>
                    <p>DOB: {client.DateOfBirth}</p>
                    <p>Phone number: 206-849-0192</p>
                    <p>Mail Address</p>
                    <p>Street: {client.StreetAddress + " " + client.City}</p>
                    <p>State: {client.State}</p>
                    <p>Zip Code: {client.Zipcode}</p>
                    <p>Country: {client.Country}</p>
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

