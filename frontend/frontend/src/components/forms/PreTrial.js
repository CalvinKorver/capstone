import React, {Component} from 'react';
import { Button, Checkbox, Dropdown, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery'; 
import DateTimeInput from '../subs/DateTimeInput';


class PreTrial extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            caseNumber: this.props.caseNumber,
            trialDate: "",
            trialStartTime: "",
            startSentence: "",
            endSentence: "",
            finesImposed: "",
            finesSuspended: "",
            communityServiceDays: "",
            communityServiceDueDate: "",
            jurisdictionOfWorkCrew: "",
            dueDateForTimeServed: "",
            dueDateForWorkCrew: "",
            creditForWorkCrew: "",
            jailTimeSuspended: "",
            creditForDaysServed: "",
            waiverOfTimeForTrialEndDate: "",
            nextCourtDate: "",
            reset: "",
            benchWarrant: "",
            jailTimeImposed: false,
            workCrewInLieu: false,
            isPayWorkCrew: false,
            isPayCommunityService: false,
            treatmentOrdered: "",
            caseOutcome: "",
            isPreTrial: this.props.isPreTrial,
            preTrialStatusName: null,
            sentencingStatusName: null,
            isCaseClosed: false,
            isMotion36: false,
            isMotion35: false
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }
//   componentWillMount() {
//     // var gameScreen = [];
//     // gameScreen.push(<Game appContext={this}/>);
//     // this.setState({   gameScreen: gameScreen });
//     var loginPage = [];
//     loginPage.push(<Loginscreen appContext={this} key={"loginScreen"}/>);
//     this.setState({loginPage: loginPage})
//   }
// componentDidMount() {
//   // don't hardcode urls
//   fetch('http://localhost:8000/clients/', {mode: 'cors'})
//       .then(function(response) {
//         return response.json();
//       })
//       .then(clientData => this.setState({
//           clients: clientData
//       }));
// }

    handleSubmit(event) {
        event.preventDefault();
        var URL = "http://localhost:8000/";
        var endpoint = "cases/"
        // console.log(event.target);
        // const data = new FormData(event.target);
        // console.log(data);
        const data = this.state;
        // console.log("data: " + data);
        return axios
            .put(URL + endpoint, data)
            .then(function (response) {
                console.log(response);
            // window.localStorage.setItem('token', response);
            // store.dispatch(setToken(response.data.token));
            });
            // .catch(function (error) {
            //   // raise different exception if due to invalid credentials
            //   if (_.get(error, 'response.status') === 400) {
            //     throw new InvalidCredentialsException(error);
            //   }
            //   throw error;
            // });
    }

    handleChange = (e, { name, value }) => { 
        var checkboxes = ["motion35", "motion36", "caseClosed", "reset", "benchWarrant", 
            "jailTimeImposed", "workCrewInLieu", "payWorkCrew", "payCommunityService"]
        if (checkboxes.includes(name)){
            value = !value;
        }
        this.setState({ [name]: value })
    }

    handleFormChange = (e, { name, value }) => {$("#" + value).toggleClass("hidden");}

    render() {

        const {
            trialDate,
            trialStartTime,
            startSentence,
            endSentence,
            finesImposed,
            finesSuspended,
            communityServiceDays,
            communityServiceDueDate,
            jurisdictionOfWorkCrew,
            dueDateForTimeServed,
            dueDateForWorkCrew,
            creditForWorkCrew,
            jailTimeSuspended,
            creditForDaysServed,
            waiverOfTimeForTrialEndDate,
            nextCourtDate,
            reset,
            benchWarrant,
            jailTimeImposed,
            workCrewInLieu,
            isPayWorkCrew,
            isPayCommunityService,
            treatmentOrdered,
            caseOutcome,
            preTrialStatusName,
            sentencingStatusName,
            isCaseClosed,
            isMotion36,
            isMotion35

        } = this.state
        
        if (caseOutcome == "Entered Plea Bargain" 
            || sentencingStatusName == "Found Guilty of Lesser-Included Offense" 
            || sentencingStatusName == "Found Guilty as Charged"){
            $("#rc-form-b").removeClass("hidden");
        } else {
            $("#rc-form-b").addClass("hidden");
        }

        if (preTrialStatusName == "Set for Trial") {
            $("#sft-form").removeClass("hidden");
        } else {
            $("#sft-form").addClass("hidden");
        }

        if (preTrialStatusName == "Pre-Trial Continuance") {
            $("#ptc-form").removeClass("hidden");
        } else {
            $("#ptc-form").addClass("hidden");
        }

        if (preTrialStatusName == "Resolved Case") {
            $("#rc-form-a").removeClass("hidden");
        } else {
            $("#rc-form-a").addClass("hidden");
        }

        if (preTrialStatusName == "Failed to Appear") {
            $("#fta-form").removeClass("hidden");
        } else {
            $("#fta-form").addClass("hidden");
        }


        var preTrialOptions = [ 
            {text: "Pre-Trial Continuance", value:"Pre-Trial Continuance"},
            {text: "Resolved Case", value:"Resolved Case"},
            {text: "Failed to Appear", value: "Failed to Appear"},
            {text: "Set for Trial", value: "Set for Trial"}];
        
        var sentencingOptions = [
            {text: "Found not guilty", value:"Found not guilty"},
            {text: "Found guilty of lesser-included offense", value:"Found guilty of lesser-included offense"},
            {text: "Found guilty as charged", value:"Found guilty as charged"}
        ]

        var caseOutcomeOptions = [  
            {text: "Dismissed", value:"Dismissed"},
            {text: "Entered Plea Bargain", value:"Entered Plea Bargain"},
            {text: "Compromise of Misdemeanor", value: "Compromise of Misdemeanor"},
            {text: "Stipulated Order of Continuance", value: "Stipulated Order of Continuance"}];

        var jurisdictionOfWorkCrewOptions = [
            {text: "Dismissed", value:"Dismissed"},
            {text: "Entered Plea Bargain", value:"Entered Plea Bargain"},
            {text: "Compromise of Misdemeanor", value: "Compromise of Misdemeanor"},
            {text: "Stipulated Order of Continuance", value: "Stipulated Order of Continuance"}];

        var title;
        var fieldName;
        var options;
        var outcomeOrClosed;
        if(this.state.isPreTrial){
            title = "PreTrial";
            fieldName = "preTrialStatusName";
            options = preTrialOptions;
            outcomeOrClosed = 
            <Form.Field id="rc-form-a" className = "hidden">
                <Form.Select fluid label="Case Outcome" name="caseOutcome" options={caseOutcomeOptions} placeholder='Select an option' onChange={this.handleChange} />
            </Form.Field>;
        } else {
            title = "Sentencing";
            fieldName = "sentencingStatusName";
            options = sentencingOptions;
            outcomeOrClosed =
                <Form.Checkbox
                    label="Has the case been closed?"
                    name="isCaseClosed"
                    value={isCaseClosed}
                    onChange={this.handleChange}/>;
        }
        var triggerStyle = {
            cursor: 'pointer',
            textAlign: 'center'
        }
        
        return (
        <Modal trigger={<h4 style={triggerStyle}>{title}</h4>}>
            <Modal.Header> {title} </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Select fluid label={title +" Status"} name={fieldName} options={options} placeholder='Select an option' onChange={this.handleChange}/>

                        <div id="sft-form" className="hidden">
                            {/* <Form.Input fluid label="Trial Date" name="trialDate" placeholder="MM/DD/YYYY"  value={trialDate} onChange={this.handleChange}/>     */}

                            {/* <Form.Input fluid label="Trial Start Time" name="trialStartTime" placeholder="hh:mm"  value={trialStartTime} onChange={this.handleChange}/> */}
                            <DateTimeInput time={true} name="trialDate" label="Trial Date" handleChange={this.handleChange}/>

                            <Form.Group widths="equal">
                                <Form.Checkbox
                                label="3.5 Motion"
                                name="isMotion35"
                                value={isMotion35}
                                onChange={this.handleChange}/>

                                <Form.Checkbox
                                label="3.6 Motion"
                                name="isMotion36"
                                value={isMotion36}
                                onChange={this.handleChange}/>
                            </Form.Group>
                        </div>


                        <div id="ptc-form" className = "hidden">
                        {/* <Form.Input
                                fluid
                                label="Next Court Date"
                                placeholder="MM/DD/YYYY"
                                name="nextCourtDate"
                                value={nextCourtDate}
                                onChange={this.handleChange}/> */}
                                <DateTimeInput time={false} name="nextCourtDate" label="Next Court Date" handleChange={this.handleChange}/>


                                {/* <Form.Input
                                fluid
                                label="Waiver of Time for Trial End Date"
                                placeholder="MM/DD/YYYY"
                                name="waiverOfTimeForTrialEndDate"
                                value={waiverOfTimeForTrialEndDate}
                                onChange={this.handleChange}/> */}
                                <DateTimeInput time={false} name="waiverOfTimeForTrialEndDate" label="Waiver of Time for Trial End Date" handleChange={this.handleChange}/>


                                <Form.Field>
                                    <label>Failure to Appear</label>
                                </Form.Field>

                                <Form.Group widths="equal">

                                <Form.Checkbox
                                label="Reset"
                                name="reset"
                                value={reset}
                                onChange={this.handleChange}/>

                                <Form.Checkbox
                                label="Bench Warrant"
                                name="benchWarrant"
                                value={benchWarrant}
                                onChange={this.handleChange}/>

                                </Form.Group>

                        </div>

                            {outcomeOrClosed}

                        <div id="rc-form-b" className = "hidden">
                           
                           {/* <Form.Group widths='equal'> */}
                                {/* <Form.Input 
                                fluid 
                                label="Beginning of Sentence" 
                                placeholder="MM/DD/YYYY"
                                name="startSentence"
                                value={startSentence}
                                onChange={this.handleChange}/> */}
                                <DateTimeInput time={false} name="startSentence" label="Beginning of Sentence" handleChange={this.handleChange}/>

                                {/* <Form.Input
                                fluid
                                label="End of Sentence"
                                placeholder="MM/DD/YYYY"
                                name="endSentence"
                                value={endSentence}
                                onChange={this.handleChange}/> */}
                                <DateTimeInput time={false} name="endSentence" label="End of Sentence" handleChange={this.handleChange}/>

                            {/* </Form.Group> */}

                            <Form.Input fluid label="Jail Time Suspended" name="jailTimeSuspended"  placeholder=""  value={jailTimeSuspended} onChange={this.handleChange} />

                            <Form.Checkbox
                                label="Jail Time Imposed?"
                                name="jailTimeImposed"
                                value="jail-time-imposed-form"
                                onChange={this.handleFormChange}/>

                            <div className="hidden" id="jail-time-imposed-form">
                            {/* <Form.Group  widths="equal"> */}
                                <Form.Input fluid label="Credit for Days Served" name="creditForDaysServed"  placeholder=""  value={creditForDaysServed} onChange={this.handleChange} />
                                
                                {/* <Form.Input fluid label="Due Date for Time Served" name="dueDateForTimeServed"  placeholder=""  value={dueDateForTimeServed} onChange={this.handleChange} /> */}
                                <DateTimeInput time={false} name="dueDateForTimeServed" label="Due Date for Time Served" handleChange={this.handleChange}/>
                            {/* </Form.Group> */}
                            </div>

                            <Form.Checkbox
                                label="Authorized work crew in lieu of jail?"
                                name="workCrewInLieu"
                                value="work-crew-form"
                                onChange={this.handleFormChange}/>



                            <div id="work-crew-form" className="hidden">
                                {/* <Form.Group  widths="equal" > */}
                                    <Form.Input fluid label="Credit for Work Crew" name="creditForWorkCrew"  placeholder="0"  value={creditForWorkCrew} onChange={this.handleChange} />

                                    {/* <Form.Input fluid label="Due Date for Work Crew" name="dueDateForWorkCrew"  placeholder="MM/DD/YYYY"
                                    value={dueDateForWorkCrew} onChange={this.handleChange} />
                                    </Form.Group> */}
                                    <DateTimeInput time={false} name="dueDateForWorkCrew" label="Work Crew Due Date" handleChange={this.handleChange}/>


                                <Form.Select fluid label="Jurisdiction of Work Crew" name="jurisdictionOfWorkCrew" options={jurisdictionOfWorkCrewOptions} placeholder='Select an option' onChange={this.handleChange} />

                                {/* <Form.Group widths='equal'> */}
                                    <Form.Input 
                                    fluid 
                                    label="Community Service Days" 
                                    placeholder="0"
                                    name="communityServiceDays"
                                    value={communityServiceDays}
                                    onChange={this.handleChange}/>
                                    {/* <Form.Input
                                    fluid
                                    label="CommunityServiceDueDate"
                                    placeholder="MM/DD/YYYY"
                                    name="communityServiceDueDate"
                                    value={communityServiceDueDate}
                                    onChange={this.handleChange}/> */}
                                    <DateTimeInput time={false} name="communityServiceDueDate" label="Community Service Due Date" handleChange={this.handleChange}/>
                                    
                                {/* </Form.Group> */}


                                <Form.Group widths='equal'>
                                    <Form.Input 
                                    fluid 
                                    label="Fines Imposed" 
                                    placeholder="$0.00"
                                    name="finesImposed"
                                    value={finesImposed}
                                    onChange={this.handleChange}/>
                                    <Form.Input
                                    fluid
                                    label="Fines Suspended"
                                    placeholder="$0.00"
                                    name="finesSuspended"
                                    value={finesSuspended}
                                    onChange={this.handleChange}/>
                                </Form.Group>
                                <Form.Checkbox
                                    label="Can fine pay through work crew?"
                                    name="isPayWorkCrew"
                                    value={isPayWorkCrew}
                                    onChange={this.handleChange}/>
                                <Form.Checkbox
                                    label="Can fine pay through community service?"
                                    name="isPayCommunityService"
                                    value={isPayCommunityService}
                                    onChange={this.handleChange}/>
                                <Form.Input
                                    fluid
                                    label="Treatment Ordered"
                                    name="treatmentOrdered"
                                    value={treatmentOrdered}
                                    onChange={this.handleChange}
                                />
                                {/* </Form.Group> */}
                            </div>
                            </div>
                            <Form.Button  fluid type="submit">Save and Continue</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default PreTrial;