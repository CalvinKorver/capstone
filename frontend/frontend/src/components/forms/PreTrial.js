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
        this.state = {
            preTrialStatus: "",
            threePointFiveMotion: ""
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
        console.log(this.state.preTrialStatus);
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
        }

    }

    render() {

        const { trialDate, trialStartDate, threePointFiveMotion, threePointSixMotion } = this.state

        var preTrialOptions = [ 
            {text: "Pre-Trial Continuance", value:"ptc"},
            {text: "Resolved Case", value:"rc"},
            {text: "Failed to Appear", value: "fta"},
            {text: "Set for Trial", value: "sft"}];

        var caseOutcomeOptions = [  
            {text: "Dismissed", value:"ptc"},
            {text: "Entered Plea Bargain", value:"rc"},
            {text: "Compomise of Misdemeanor", value: "fta"},
            {text: "Stipulated Order of Continuance", value: "sft"}];
        return (
            <Modal trigger={<Button>Pre-Trial Modal</Button>}>
            <Modal.Header> New Offense </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Select fluid label="Options for Pre-Trial" name="preTrialStatus" options={preTrialOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <div  id="sft-form" className="hidden">
                            <Form.Input fluid label="Trial Date" name="trialDate" placeholder="MM/DD/YYYY"  value={trialDate} onChange={this.handleChange}/>    

                            <Form.Input fluid label="Trial Start Date" name="trialStartDate" placeholder="MM/DD/YYYY"  value={trialStartDate} onChange={this.handleChange}/> 

                            <Form.Group>
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
                            <Form.Select fluid label="Case Outcome" name="outcome" options={caseOutcomeOptions} placeholder='Select an option' onChange={this.handleChange} />
                        </div>

                        <div id="ptc-form" className = "hidden">
                            <Form.Select fluid label="Case Outcome" name="outcome" options={caseOutcomeOptions} placeholder='Select an option' onChange={this.handleChange} />
                        </div>

                        
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default NewClient;