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
    function checkDateComingUp(date, label, probationEnd){
        var oneWeek = 604800000; // in milliseconds
        if(probationEnd && probationEnd == "probationEnd") {
            oneWeek = 7884000000; // set "oneweek" to three months for the probation end check
        }
        var importantDate = new Date(date);
        if(importantDate.getTime() < new Date().getTime() + oneWeek && importantDate.getTime() > new Date().getTime()){
            notifications.push(<h4>{label}</h4>)
        }
    }

    // function checkProbationThreeMonths(date, label){
    //     var threeMonths = ; // in milliseconds
    //     var importantDate = new Date(date);
    //     if(importantDate.getTime() < new Date().getTime() + oneWeek && importantDate.getTime() > new Date().getTime()){
    //         notifications.push(<h4>{label}</h4>)
    //     }
    // }

    var duiDates = [];
    this.props.cases.forEach(singleCase => {
        checkDateComingUp(singleCase.caseInfo.sentenceEnd, "Sentence ending soon");

        
        if (singleCase.offense) {
            if(singleCase.offense.isDUI){
                duiDates.push(singleCase.offense.offenseDate);
            }

        }

        singleCase.trialInfo.forEach(singleTrial => {
            var dateTime = moment(singleTrial.trialDate + " " + singleTrial.trialTime).format('MMMM Do YYYY h:mm a')
            checkDateComingUp(singleTrial.trialDate, 
                "Trial coming up on " + dateTime);
        })

        singleCase.punishmentInfo.forEach(singlePunishment => {
            checkDateComingUp(singlePunishment.dueDate, singlePunishment.punishmentTypeName + " due soon");
        })

        singleCase.probationInfo.forEach(singleProbation => {
            checkDateComingUp(singleProbation.probationStart, "Probation starts soon");
            checkDateComingUp(singleProbation.probationEnd, "Probation ends soon", "probationEnd");
        })
        // don't need to do failure to appears since they are in the past
    });
    // duiDates.push("2019-03-25")
    duiDates.sort();
    console.log(duiDates);
    if (duiDates.length > 1) {
        // check if the two most recent dates (last two) are within 7 years of each other
        var earlierDate = new Date(duiDates[duiDates.length - 2]);
        var laterDate = new Date(duiDates[duiDates.length - 1]);
        var sevenYears = 220898482000;
        if(laterDate.getTime() - earlierDate.getTime() < sevenYears){ //&& laterDate > new Date()){
            notifications.push("Two DUI offenses within seven years");
        }
    }
    console.log(duiDates);

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