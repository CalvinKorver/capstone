import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import '../react_styles/TimelineShell.css';
import moment from 'moment';
import {
    Header,
    Label
  } from 'semantic-ui-react'



const groupsExample = {
  groups: [],
  items: []
}

const now = moment()
  .minutes(0)
  .seconds(0)
  .milliseconds(0)
const groupCount = 3
const itemCount = 20

class TimelineShell extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedIds: [],
    }
  }

  render() {
    var basicExample = {
      options: {
        start: '2015-01-10',
        end: '2018-10-30',
      }
    }

    var items = [];
    var i = 0;
    var earliestDate;
    var latestDate;// = getDate();
    
    function checkDate(date) {
      if(!earliestDate) {
        earliestDate = date;
      } else if(date < earliestDate) {
          earliestDate = date;
      }
      if(!latestDate) {
        latestDate = date;
      } else if(date > latestDate) {
        latestDate = date;
      }
    }


    this.props.cases.forEach(singleCase => {
      let sentenceStart = singleCase.caseInfo.sentenceStart;
      let sentenceEnd = singleCase.caseInfo.sentenceEnd;
      checkDate(sentenceStart);
      checkDate(sentenceEnd);
      console.log(singleCase);
      if (sentenceStart) {
        var sentence = {
          id: i++, 
          content: "Sentence (Case " + singleCase.caseInfo.caseNumber + ")",
          start: sentenceStart,
          end: sentenceEnd,
          className: "sentence"
        };
        items.push(sentence);
      }
      singleCase.trialInfo.forEach(singleTrial => {
        checkDate(singleTrial.trialDate);
        var trial = {id: i++, content: 'Trial', start: singleTrial.trialDate, type: 'point'};
        items.push(trial);
      })

      let offense = singleCase.offense;
      checkDate(offense.offenseDate);
      items.push({
        id: i++, 
        className: "offense", 
        content: offense.offenseTypeName + ' Offense', 
        start: offense.offenseDate, 
        type: 'point'})

      singleCase.punishmentInfo.forEach(singlePunishment => {
        checkDate(singlePunishment.dueDate);
        var punishment;
        if(singlePunishment.startDate != "2000-10-10") { // this is the default date, so check if the date is not null basically
          punishment = {id: i++, content: singlePunishment.punishmentTypeName, start: singlePunishment.startDate, end: singlePunishment.dueDate};

        } else {
          punishment = {id: i++, content: singlePunishment.punishmentTypeName, start: singlePunishment.dueDate, type: 'point'};
        }
        items.push(punishment);
      })
      singleCase.probationInfo.forEach(singleProbation => {
        checkDate(singleProbation.probationStart);
        checkDate(singleProbation.probationEnd);
        var probation = {id: i++, content: 'Probation', start: singleProbation.probationStart, end: singleProbation.probationEnd};
        items.push(probation);
      })
      singleCase.failToAppearInfo.forEach(singleFailToAppear => {
        checkDate(singleFailToAppear.failToAppearDate);
        var failToAppear = {
          id: i++, 
          className: "fail-to-appear",
          content: 'Failed to Appear', start: singleFailToAppear.failToAppearDate, type: 'point'};
        items.push(failToAppear);
      })
    });

    let twoMonthsInMS = 5256000000;
    if (earliestDate && latestDate) {
      basicExample['options']['start'] = new Date(earliestDate).getTime() - twoMonthsInMS;
      basicExample['options']['end'] = new Date(latestDate).getTime() + twoMonthsInMS;
      basicExample['items'] = items;
    }

    basicExample['options']['height'] = '200px';
    return (
      <div>
        <Header as="h2" textAlign="center">
            Client Timeline
        </Header>
        <Label 
          className="timeline-helper"
          style={{marginTop: '1em'}} 
          floating>Try zooming!</Label>
        <Timeline {...basicExample} />
      </div>
    )
  }

  clickHandler(props) {
    const { group } = props
    const selectedIds = groupsExample.items
      .filter(item => item.group === group)
      .map(item => item.id)
    this.setState({
      selectedIds,
    })
  }
}

export default TimelineShell