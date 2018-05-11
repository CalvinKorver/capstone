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

    var casesInfo = []
    // map the different cases for a client to a list like that for client info
    this.props.cases.map(singleCase => {
        if(singleCase.caseInfo){
            var singleCaseInfo = (
                [
                    <p>Case Number: {singleCase.caseInfo.caseNumber} </p>,
                    <hr/>,
                    <p>Start of Sentence: {singleCase.caseInfo.sentenceStart}</p>,
                    <p>End of Sentence: {singleCase.caseInfo.sentenceEnd}</p>,
                    <p>Suspended Jail Time: {singleCase.caseInfo.jailTimeSuspended + " days"}</p>,
                    <p>Bench Warrant Amount: {"$" + singleCase.caseInfo.benchWarrant}</p>,
                    <p>Treatment Ordered: {singleCase.caseInfo.treatmentOrdered}</p>
                ]);
            if(singleCase.caseInfo.isDomesticViolence){
                singleCaseInfo.push(<p>Domestic Violence Case</p>)
            }
            if(singleCase.caseInfo.isCaseClosed){
                singleCaseInfo.push(<p><b>Case has been closed</b></p>)
            }
        }
        if(singleCase.punishmentInfo){
            singleCase.punishmentInfo.forEach(punishment => {
                singleCaseInfo.push(<p>{punishment.punishmentTypeName + " due on " + punishment.dueDate}</p>)
            })
        }
        singleCaseInfo.push(<br/>,<br/>); // add spacing between different cases information sections   
        casesInfo.push(singleCaseInfo);
    });
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
                {casesInfo}

                </Segment>
            </Grid.Column>

        </Grid>
    )
  }
}
export default InformationView

