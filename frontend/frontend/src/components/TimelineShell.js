import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment';
import {
    Header,
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
      if (sentenceStart) {
        var sentence = {id: i++, content: 'Sentence', start: sentenceStart, end: sentenceEnd};
        items.push(sentence);
      }
      singleCase.trialInfo.forEach(singleTrial => {
        checkDate(singleTrial.trialDate);
        var trial = {id: i++, content: 'Trial', start: singleTrial.trialDate, type: 'point'};
        items.push(trial);
      })
      singleCase.punishmentInfo.forEach(singlePunishment => {
        checkDate(singlePunishment.dueDate);
        var punishment = {id: i++, content: singlePunishment.punishmentTypeName, start: singlePunishment.dueDate, type: 'point'};
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
        var failToAppear = {id: i++, content: 'Failed to Appear', start: singleFailToAppear.failToAppearDate, type: 'point'};
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
        <Header padded as="h2" textAlign="center">
            Client Timeline
        </Header>
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