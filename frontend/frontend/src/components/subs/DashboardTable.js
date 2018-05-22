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
    Header
  } from 'semantic-ui-react'
import Client from '../Client';
import '../../react_styles/App.css';
import * as utils from '../../util/Functions';


class DashboardTable extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
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
                    console.log(searchResults[i]);
                    let nextCourtDate = "";
                    var openCaseCount = 0;
                    var caseCount;
                    if (searchResults[index].cases) {
                        caseCount = searchResults[i].cases.length;
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
                    <tr key={client.id}>
                        <td key='clientLink'>
                            <Link to={{pathname: '/client/'+client.id, state: {client: client} }}>
                                {client.first_name + " " + client.last_name}
                            </Link>
                        </td>
                        <td key='dob'>
                            {client.date_of_birth ? moment(client.date_of_birth).format('MMM DD, YYYY') : "-"}
                        </td>
                        <td key='nextCourtDate'>{nextCourtDate ? moment(nextCourtDate).format('MMM DD, YYYY'): "-"}</td>
                        <td key='openCaseCount'>{openCaseCount}</td>
                        <td key='caseCount'>{caseCount}</td>
                    </tr>
                    )
                }
            }
            // clientRows.sort((a,b) => return a.nextCourtDate < b.nextCourtDate)
        }
        return (
            <table className="ui celled table">
                <thead>
                    <tr><th>Name</th>
                    <th>Birth Date</th>
                    <th>Next Court Date</th>
                    <th>Open Cases</th>
                    <th>Total Cases</th>
                    {/* <th>Status</th> */}
                </tr></thead>
                <tbody>
                    {clientRows}
                </tbody>
            </table>
        )
    }

}

export default DashboardTable;