import React, {Component} from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import moment from 'moment';
import {
    Button,
    Search,
    Divider,
    Grid,
    Container,
    Header,
    Icon,
    Table
  } from 'semantic-ui-react'
import Client from '../Client';
import DeleteButton from './DeleteButton';
import '../../react_styles/App.css';
import * as utils from '../../util/Functions';


class DashboardTable extends Component {
    constructor(props) {
        super(props);
    }

    deleteClient = (id) => {
        this.props.deleteClient(id);
    }

    render() {      
        var searchResults = this.props.searchResults;
        var trials = this.props.trials;
        var clientRows = [];
        if (searchResults) {
            var dateToday = utils.getDate();
            var keys = Object.keys(searchResults);
            for (var i = 0; i < keys.length; i++) {
                var index = keys[i];
                if (searchResults[index]){
                    let nextCourtDate = "";
                    var openCaseCount = 0;
                    var caseCount;
                    if (searchResults[index].cases) {
                        caseCount = searchResults[index].cases.length;
                        // this is ugly as fuck. Matches trials to cases and determines which is the most recent
                        searchResults[index].cases.forEach(function(singleCase){
                            if (!singleCase.isCaseClosed){
                                openCaseCount += 1;
                            }
                            trials.forEach(function(trial){
                                if(singleCase.id == trial.caseID) {
                                    if(trial.trialDate > dateToday && utils.isEmpty(nextCourtDate) || (!utils.isEmpty(nextCourtDate) && trial.trialDate < nextCourtDate)){
                                        nextCourtDate = trial.trialDate;
                                    }
                                }
                            })
                        })
                    } else {
                        caseCount = 0;
                    }
                    var client = searchResults[index].clientInfo;
                    clientRows.push(
                        <Table.Row key={client.id}>
                            <Table.Cell>
                                <Link to={{pathname: '/client/'+client.id, state: {client: client} }}>
                                    {client.first_name + " " + client.last_name}
                                </Link>
                            </Table.Cell>
                            <Table.Cell>
                                {client.date_of_birth ? moment(client.date_of_birth).format('MMM DD, YYYY') : "-"}
                            </Table.Cell>
                            <Table.Cell >{nextCourtDate ? moment(nextCourtDate).format('MMM DD, YYYY'): "-"}</Table.Cell>
                            <Table.Cell>{openCaseCount}</Table.Cell>
                            <Table.Cell>{caseCount}</Table.Cell>
                            <Table.Cell>
                                <DeleteButton 
                                    id = {client.id} 
                                    delete={this.props.deleteClient}/>
                            </Table.Cell>
                        </Table.Row>
                    )
                }
            }
            // clientRows.sort((a,b) => return a.nextCourtDate < b.nextCourtDate)
        }
        return (
            <table className="ui celled table">
                <thead>
                <Table.Row>
                    <Table.HeaderCell width={4}>Name</Table.HeaderCell>
                    <Table.HeaderCell width={4}>Birth Date</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Next Court Date</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Open Cases</Table.HeaderCell>
                    <Table.HeaderCell width={2}>Total Cases</Table.HeaderCell>
                    <Table.HeaderCell width={1}>Del</Table.HeaderCell>
                    {/* <th>Status</th> */}
                    </Table.Row>
                </thead>
                <tbody>
                    {clientRows}
                </tbody>
            </table>
        )
    }

}

export default DashboardTable;