import React, { Component } from 'react'
import moment from 'moment'
import {
    Header,
  } from 'semantic-ui-react'



class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {    }
  }

  render() {
    var notifications = [];

    // this function takes a date in ISO format and a string describing the notification
    // checks if the date is in less than a week from now, then adds it to the notification list if so
    function checkDateComingUp(date, label){
        var oneWeek = 604800000; // in milliseconds
        var importantDate = new Date(date);
        if(importantDate.getTime() < new Date().getTime() + oneWeek && importantDate.getTime() > new Date().getTime()){
            notifications.push(<h3>{label}</h3>)
        }
    }
    this.props.cases.forEach(singleCase => {
        checkDateComingUp(singleCase.caseInfo.sentenceEnd, "Sentence ending soon");
    
        singleCase.trialInfo.forEach(singleTrial => {
            checkDateComingUp(singleTrial.trialDate, "Trial coming up");
        })

        singleCase.punishmentInfo.forEach(singlePunishment => {
            checkDateComingUp(singlePunishment.dueDate, singlePunishment.punishmentTypeName + " due soon");
        })

        singleCase.probationInfo.forEach(singleProbation => {
            checkDateComingUp(singleProbation.probationStart, "Probation starts soon");
            checkDateComingUp(singleProbation.probationEnd, "Probation ends soon");
        })
        // don't need to do failure to appears since they are in the past
    });

    if(!notifications[0]){
        notifications = "Nothing coming up in the next week"
    }
    return (
      <div className="App">
        {notifications}
      </div>
    )
  }
}

export default Notifications