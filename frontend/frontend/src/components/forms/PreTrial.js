import React, {Component} from 'react';
import { Button, Checkbox, Dropdown, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery'; 

// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

class NewClient extends Component {
    constructor(props) {
        super(props);
        this.state = { trialDate: "",
            trialStartDate: "",
            threePointFiveMotion: "",
            threePointSixMotion: "",
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
            workCrewInLieu: false
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
        var endpoint = "clients/"
        console.log(event.target);
        const data = new FormData(event.target);
        console.log(data);
        return axios
            .post(URL + endpoint, data)
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
        this.setState({ [name]: value })
        console.log(name, value);
        if (name == "preTrialStatus") {
            if (value == "sft") {
                $("#sft-form").removeClass("hidden");
            } else {
                $("#sft-form").addClass("hidden");
            }
            
            if (value == "ptc") {
                $("#ptc-form").removeClass("hidden");
            } else {
                $("#ptc-form").addClass("hidden");
            }

            if (value == "rc") {
                $("#rc-form-a").removeClass("hidden");
            } else {
                $("#rc-form-a").addClass("hidden");
            }
        }

        if (value == "epb") {
            $("#rc-form-b").removeClass("hidden");
        } else {
            $("#rc-form-b").addClass("hidden");
        }

        if (value == "fta") {
            $("#fta-form").removeClass("hidden");
        } else {
            $("#fta-form").addClass("hidden");
        }

    }

    handleFormChange = (e, { name, value }) => {$("#" + value).toggleClass("hidden");}

    render() {

        const {
            trialDate,
            trialStartDate,
            threePointFiveMotion,
            threePointSixMotion,
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
            workCrewInLieu

        } = this.state

        var preTrialOptions = [ 
            {text: "Pre-Trial Continuance", value:"ptc"},
            {text: "Resolved Case", value:"rc"},
            {text: "Failed to Appear", value: "fta"},
            {text: "Set for Trial", value: "sft"}];

        var caseOutcomeOptions = [  
            {text: "Dismissed", value:"d"},
            {text: "Entered Plea Bargain", value:"epb"},
            {text: "Compromise of Misdemeanor", value: "com"},
            {text: "Stipulated Order of Continuance", value: "sooc"}];

        var jurisdictionOfWorkCrewOptions = [
            {text: "Dismissed", value:"d"},
            {text: "Entered Plea Bargain", value:"epb"},
            {text: "Compromise of Misdemeanor", value: "com"},
            {text: "Stipulated Order of Continuance", value: "sooc"}];
        
        return (
            <Modal trigger={<Button>Pre-Trial Modal</Button>}>
            <Modal.Header> Pre Trial </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Select fluid label="Pre-Trial Status" name="preTrialStatus" options={preTrialOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <div id="sft-form" className="hidden">
                            <Form.Input fluid label="Trial Date" name="trialDate" placeholder="MM/DD/YYYY"  value={trialDate} onChange={this.handleChange}/>    

                            <Form.Input fluid label="Trial Start Date" name="trialStartDate" placeholder="MM/DD/YYYY"  value={trialStartDate} onChange={this.handleChange}/> 

                            <Form.Group widths="equal">
                                <Form.Checkbox
                                label="3.5 Motion"
                                name="threePointFiveMotion"
                                value={threePointFiveMotion}
                                onChange={this.handleChange}/>

                                <Form.Checkbox
                                label="3.6 Motion"
                                name="threePointSixMotion"
                                value={threePointSixMotion}
                                onChange={this.handleChange}/>
                            </Form.Group>
                        </div>


                        <div id="ptc-form" className = "hidden">
                        <Form.Input
                                fluid
                                label="Next Court Date"
                                placeholder="MM/DD/YYYY"
                                name="nextCourtDate"
                                value={nextCourtDate}
                                onChange={this.handleChange}/>

                                <Form.Input
                                fluid
                                label="Waiver of Time for Trial End Date"
                                placeholder="MM/DD/YYYY"
                                name="waiverOfTimeForTrialEndDate"
                                value={waiverOfTimeForTrialEndDate}
                                onChange={this.handleChange}/>

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

                            <Form.Field id="rc-form-a" className = "hidden">
                                <Form.Select fluid label="Case Outcome" name="outcome" options={caseOutcomeOptions} placeholder='Select an option' onChange={this.handleChange} />
                            </Form.Field>

                        <div id="rc-form-b" className = "hidden">
                           
                           <Form.Group widths='equal'>
                                <Form.Input 
                                fluid 
                                label="Beginning of Sentence" 
                                placeholder="MM/DD/YYYY"
                                name="startSentence"
                                value={startSentence}
                                onChange={this.handleChange}/>
                                <Form.Input
                                fluid
                                label="End of Sentence"
                                placeholder="MM/DD/YYYY"
                                name="endSentence"
                                value={endSentence}
                                onChange={this.handleChange}/>
                            </Form.Group>

                            <Form.Input fluid label="Jail Time Suspended" name="jailTimeSuspended"  placeholder=""  value={jailTimeSuspended} onChange={this.handleChange} />

                            <Form.Checkbox
                                label="Jail Time Imposed?"
                                name="jailTimeImposed"
                                value="jail-time-imposed-form"
                                onChange={this.handleFormChange}/>

                            <div className="hidden" id="jail-time-imposed-form">
                            <Form.Group  widths="equal">
                                <Form.Input fluid label="Credit for Days Served" name="creditForDaysServed"  placeholder=""  value={creditForDaysServed} onChange={this.handleChange} />
                                
                                <Form.Input fluid label="Due Date for Time Served" name="dueDateForTimeServed"  placeholder=""  value={dueDateForTimeServed} onChange={this.handleChange} />
                            </Form.Group>
                            </div>

                            <Form.Checkbox
                                label="Authorized work crew in lieu of jail?"
                                name="workCrewInLieu"
                                value="work-crew-form"
                                onChange={this.handleFormChange}/>



                            <div id="work-crew-form" className="hidden">
                                <Form.Group  widths="equal" >
                                    <Form.Input fluid label="Credit for Work Crew" name="creditForWorkCrew"  placeholder="0"  value={creditForWorkCrew} onChange={this.handleChange} />

                                    <Form.Input fluid label="Due Date for Work Crew" name="dueDateForWorkCrew"  placeholder="MM/DD/YYYY"
                                    value={dueDateForWorkCrew} onChange={this.handleChange} />
                                    </Form.Group>

                                <Form.Select fluid label="Jurisdiction of Work Crew" name="jurisdictionOfWorkCrew" options={jurisdictionOfWorkCrewOptions} placeholder='Select an option' onChange={this.handleChange} />

                                <Form.Group widths='equal'>
                                    <Form.Input 
                                    fluid 
                                    label="Community Service Days" 
                                    placeholder="0"
                                    name="communityServiceDays"
                                    value={communityServiceDays}
                                    onChange={this.handleChange}/>
                                    <Form.Input
                                    fluid
                                    label="CommunityServiceDueDate"
                                    placeholder="MM/DD/YYYY"
                                    name="communityServiceDueDate"
                                    value={communityServiceDueDate}
                                    onChange={this.handleChange}/>
                                </Form.Group>


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
                            </div>
                            </div>
                            <Form.Button  fluid type="submit">Save and Continue</Form.Button>
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default NewClient;