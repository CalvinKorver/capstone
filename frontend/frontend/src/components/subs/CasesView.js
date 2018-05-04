import React, { Component } from 'react'
// import moment from 'moment'
import TimelineShell from '../TimelineShell';
import {
    Grid,
    Search,
    Header,
    Segment,
    Table,
    Dropdown,
    Dimmer
  } from 'semantic-ui-react';

import NewCase from '../forms/NewCase';
import SentencingCompliance from '../forms/SentencingCompliance';
import PreTrial from '../forms/PreTrial';
import Notifications from './Notifications';

class CasesView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caseTable: []
        }
    }

    componentWillMount() {
        var caseTable = []
        this.props.cases.forEach(singleCase => {
            const forms = [
                // <NewCase first_name={this.props.client.first_name} last_name={this.props.client.last_name}/>,
                <PreTrial caseNumber={singleCase.caseInfo.caseNumber} isPreTrial={true}/>,
                <PreTrial caseNumber={singleCase.caseInfo.caseNumber} isPreTrial={false}/>,
                <SentencingCompliance caseNumer={singleCase.caseInfo.caseNumber}/>
            ];

            caseTable.push(
                <Table.Row key={singleCase.caseInfo.caseNumber}>
                    <Table.Cell>{singleCase.caseInfo.caseNumber}</Table.Cell>
                    <Table.Cell>{singleCase.caseInfo.sentenceStart}</Table.Cell>
                    <Table.Cell>{singleCase.caseInfo.sentenceEnd}</Table.Cell> 
                    <Table.Cell >
                        <Dropdown placeholder='Edit' fluid selection options={forms} />
                    </Table.Cell>   
                </Table.Row>
            )
        });

        this.setState({
            caseTable: caseTable
        })
    }

    render() {
        
        return (
            <Grid>
                <Grid.Column width={12}>
                    <Header as="h4"  floated="left" style={{marginTop: "6px"}}> Case Search </Header>
                        <Search className="main-search" size="small"/>
                </Grid.Column>
                
                <Grid.Column width={4}>
                    <NewCase firstName={this.props.client.first_name} lastName={this.props.client.last_name}/>
                </Grid.Column>

                <Grid.Column width={16}>
                    <Grid.Row>
                        <Segment>
                            <TimelineShell client={this.props.client} cases={this.props.cases}/>
                        </Segment>
                    </Grid.Row>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment>
                        <Header as="h4"  textAlign="center"> Client Case List </Header>

                        <Table padded>
                            <Table.Header>
                                <Table.Row>
                                <Table.HeaderCell >Case Number</Table.HeaderCell>
                                    <Table.HeaderCell>Sentence Start</Table.HeaderCell>
                                    <Table.HeaderCell>Sentence End</Table.HeaderCell>
                                    {/* <Table.HeaderCell>Last Update</Table.HeaderCell> */}
                                </Table.Row>
                                {this.state.caseTable}
                            </Table.Header>
                        </Table>



                    </Segment>
                </Grid.Column>

                <Grid.Column width={4}>
                <Segment>
                <Header as="h4"  textAlign="center"> Notifications </Header>
                    <Notifications cases={this.props.cases}/>
                </Segment>
                    
                </Grid.Column>

            </Grid>
        )
    }
}
export default CasesView

