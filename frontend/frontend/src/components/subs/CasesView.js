import React, { Component } from 'react'
import moment from 'moment'
import TimelineShell from '../TimelineShell';
import {
    Grid,
    Form,
    Search,
    Header,
    Segment,
    Table,
    Dropdown,
    Dimmer,
    Icon
  } from 'semantic-ui-react';

import NewCase from '../forms/NewCase';
import SentencingCompliance from '../forms/SentencingCompliance';
import PreTrial from '../forms/PreTrial';
import Notifications from './Notifications';
import axios from 'axios';
import * as utils from '../../util/Functions';

class CasesView extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        var caseTable = []
        if (this.props.cases.length > 0) {
            this.props.cases.forEach(singleCase => {
                var _case = singleCase.caseInfo;
                const forms = [
                    <PreTrial caseNumber={_case.caseNumber} isPreTrial={true}/>,
                    <PreTrial caseNumber={_case.caseNumber} isPreTrial={false}/>,
                    <SentencingCompliance caseNumer={_case.caseNumber}/>
                ];
                caseTable.push(
                    <Table.Row key={_case.caseNumber}>
                        <Table.Cell>{_case.caseNumber}</Table.Cell>
                        <Table.Cell>{
                            _case.sentenceStart ? moment(_case.sentenceStart).format('MMM. Do YYYY'): "none"}</Table.Cell>
                        <Table.Cell>{
                            _case.sentenceEnd ? moment(_case.sentenceEnd).format('MMM. Do YYYY') : "-"}</Table.Cell> 
                        <Table.Cell >
                            <Dropdown upward placeholder='Edit' fluid selection options={forms} />
                        </Table.Cell>   
                        <Table.Cell >
                            <a onClick={() => this.props.deleteCase(_case.caseNumber)} >
                                <Icon color="red" name='trash'/>
                            </a>
                        </Table.Cell>
                    </Table.Row>
                )
            });
        } else {
            caseTable.push(
                <Table.Row key="0">
                    <Table.Cell width={16}>No cases at the moment... </Table.Cell>
                </Table.Row>
            )
        }
        
        return (
            <Grid>
                <Grid.Column width={12}>
                    <Header as="h4"  floated="left" style={{marginTop: "6px"}}> Case Search </Header>
                        <Search className="main-search" size="small"/>
                </Grid.Column>
                <Grid.Column width={4}>
                    <NewCase firstName={this.props.client.first_name} lastName={this.props.client.last_name} refresh={this.props.refresh}/>
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
                                    <Table.HeaderCell width={2}>Case</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>Sentence Start</Table.HeaderCell>
                                    <Table.HeaderCell width={3}>Sentence End</Table.HeaderCell>
                                    <Table.HeaderCell width={6}>Update Information</Table.HeaderCell>
                                    <Table.HeaderCell width={1}>Del</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {caseTable}
                            </Table.Body>
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

