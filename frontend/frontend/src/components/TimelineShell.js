import React, { Component } from 'react'
import Timeline from 'react-visjs-timeline'
import moment from 'moment'
import {
    Header,
  } from 'semantic-ui-react'


import '../react_styles/TimelineShell.css'

const groupsExample = {
  groups: [],
  items: [],
  options: {
    groupOrder: 'content', // groupOrder can be a property name or a sorting function
  },
}

const now = moment()
  .minutes(0)
  .seconds(0)
  .milliseconds(0)
const groupCount = 3
const itemCount = 20

// create a data set with groups
const names = ['John', 'Alston', 'Lee', 'Grant']
for (let g = 0; g < groupCount; g++) {
  groupsExample.groups.push({ id: g, content: names[g] })
}

// create a dataset with items
for (let i = 0; i < itemCount; i++) {
  const start = now.clone().add(Math.random() * 200, 'hours')
  const group = Math.floor(Math.random() * groupCount)
  groupsExample.items.push({
    id: i,
    group: group,
    content:
      'item ' +
      i +
      ' <span style="color:#97B0F8">(' +
      names[group] +
      ')</span>',
    start: start,
    type: 'box',
  })
}

class TimelineShell extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedIds: [],
    }
  }

  render() {
    var basicExample = {
      // need to play around with this range
      options: {
        start: '2015-01-10',
        end: '2018-10-30',
      },
      items: [
        { id: 1, content: 'Jail Time', start: '2018-01-20', end: '2018-03-20' },
        { id: 2, content: 'Pre-Trial', start: '2018-04-01', type: 'point' },
        { id: 3, content: 'Trial', start: '2018-04-27', type: 'point' },
        { id: 4, content: 'Prison Time', start: '2018-05-16', end: '2018-06-19' },
        { id: 5, content: 'Probation', start: '2018-05-16', end: '2018-09-19' }
        // { id: 6, content: 'item 6', start: '2018-04-27', type: 'point' },
      ],
    }

    var items = [];
    console.log(this.props.cases.caseInfo);
    this.props.cases.forEach(singleCase => {
      console.log(singleCase.caseInfo)
      var sentence = {id: 1, content: 'Sentence', start: singleCase.caseInfo.sentenceStart, end: singleCase.caseInfo.sentenceEnd};
      items.push(sentence);
      var i = 2;
      singleCase.trialInfo.forEach(singleTrial => {
        var trial = {id: i, content: 'Trial', start: singleTrial.trialDate, type: 'point'};
        i += 1;
        items.push(trial);
      })
      singleCase.punishmentInfo.forEach(singlePunishment => {
        var punishment = {id: i, content: singlePunishment.punishmentTypeName, start: singlePunishment.dueDate, type: 'point'};
        i += 1;
        items.push(punishment);
      })
      singleCase.probationInfo.forEach(singleProbation => {
        var probation = {id: i, content: 'Probation', start: singleProbation.probationStart, end: singleProbation.probationEnd};
        i += 1;
        items.push(probation);
      })
      singleCase.failToAppearInfo.forEach(singleFailToAppear => {
        var failToAppear = {id: i, content: 'Failed to Appear', start: singleFailToAppear.failToAppearDate, type: 'point'};
        i += 1;
        items.push(failToAppear);
      })
    });

    basicExample['items'] = items;

    return (
      <div className="App">
        <Header as="h3" textAlign="center">
            Timeline
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