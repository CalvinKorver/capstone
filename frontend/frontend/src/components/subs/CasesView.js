import React, { Component } from 'react'
// import moment from 'moment'
import TimelineShell from '../TimelineShell';
import {
    Grid,
    Search,
    Header,
    Segment,
    Table,
    Dropdown
  } from 'semantic-ui-react';

import NewCase from '../forms/NewCase';
import SentencingCompliance from '../forms/SentencingCompliance';
import PreTrial from '../forms/PreTrial';

class CasesView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            caseTable: []
        }
    }

    componentWillMount() {
        var caseTable = []
        this.props.cases.forEach(element => {
            console.log(element);
            const forms = [
                <NewCase first_name={this.props.client.first_name} last_name={this.props.client.last_name}/>,
                <PreTrial caseNumber={element.caseNumber}/>,
                <SentencingCompliance caseNumer={element.caseNumber}/>
            ];

            caseTable.push(
                <Table.Row>
                    <Table.Cell>{element.caseNumber}</Table.Cell>
                    <Table.Cell>{element.sentenceStart}</Table.Cell>
                    <Table.Cell>{element.sentenceEnd}</Table.Cell> 
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

                {/* <Grid.Column width={4}>
                    <NewCase/>
                </Grid.Column> */}

                <Grid.Column width={16}>
                    <TimelineShell client={this.props.client}/>
                </Grid.Column>

                <Grid.Column width={12}>
                    <Segment>
                        <Header as="h4"  textAlign="centered"> Client Case List </Header>

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
                <Header as="h4"  textAlign="centered"> Notification </Header>

                </Segment>
                    
                </Grid.Column>

            </Grid>
        )
    }
}
export default CasesView

