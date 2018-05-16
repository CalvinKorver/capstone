import React, {Component} from 'react';
import { Button, Checkbox, Dropdown, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery'; 
import * as utils from '../../util/Functions';


// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

class SentencingCompliance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caseNumber: this.props.caseNumber,
            sentencingComplianceStatus: "",
            isAdmit: false,
            isReserve: false,
            isCaseClosed: false
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

    handleSubmit(event) {
        event.preventDefault();
        var endpoint = "sentence-compliance/"
        // console.log(event.target);
        // const data = new FormData(event.target);
        // console.log(data);
        // if (this.state.caseClosed) {
             // post request to case to set closed to true
        // }
        var data = {
            violationName: this.state.sentencingComplianceStatus,
            isAdmit: this.state.isAdmit,
            isReserve: this.state.isReserve,
            isCaseClosed: this.state.isCaseClosed,
            caseNumber: this.state.caseNumber
        }
        return axios
            .post(utils.globalURL + endpoint, data)
            .then(function (response) {
                console.log(response);
            // window.localStorage.setItem('token', response);
            // store.dispatch(setToken(response.data.token));
            }).then(alert("Submitted!"));
            // .catch(function (error) {
            //   // raise different exception if due to invalid credentials
            //   if (_.get(error, 'response.status') === 400) {
            //     throw new InvalidCredentialsException(error);
            //   }
            //   throw error;
            // });
    }

    handleChange = (e, { name, value, text }) => { 
        // if (value == "ad") {
        //     this.setState()
        // }
        this.setState({ [name]: value })
        // console.log("State: " + this.state.sentencingComplianceStatus);
        // console.log(this.state.preTrialStatus);
        if (name == "sentencingComplianceStatus") {
            if (value == "New Criminal Law Violation") {
                $("#nclv-form").removeClass("hidden");
            } else {
                $("#nclv-form").addClass("hidden");
            }
        }
    }

    render() {
        const { caseNumber, trialStartDate, isCaseClosed } = this.state

        var violationOptions = [ 
            {text: "New Criminal Law Violation", value:"New Criminal Law Violation"},
            {text: "Failure to Comply with Treatment", value:"Failure to Comply with Treatment"},
            {text: "Failure to Comply with Work Crew", value: "Failure to Comply with Work Crew"},
            {text: "Failure to Comply with Community Service", value: "Failure to Comply with Community Service"},
            {text: "Failure to Pay Fines", value: "Failure to Pay Fines"}];
        
        var admitOptions = [ 
            {text: "Admit", value:true},
            {text: "Deny", value:false}];

        var reserveOptions = [ 
            {text: "Reserve", value:true},
            {text: "Impose", value:false}];

        return (
            <Modal trigger={<Button style={{width: '100%', backgroundColor: 'Aliceblue'}}>Sentencing Compliance Modal</Button>}>
            <Modal.Header> Sentence Compliance </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Checkbox
                            label="Has the case been closed?"
                            name="isCaseClosed"
                            value={isCaseClosed}
                            onChange={this.handleChange}/>

                        <Form.Select fluid label="Alleged Violation" name="sentencingComplianceStatus" options={violationOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <div  id="nclv-form" className="hidden">
                            <Form.Input fluid label="Case Number" name="caseNumber" placeholder=""  value={caseNumber} onChange={this.handleChange}/>    
                        </div>

                        <Form.Select fluid label="Admit or Deny?" name="isAdmite" options={admitOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <Form.Select fluid label="Reserve or Impose?" name="isReserve" options={reserveOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <Button type="submit">Save and Continue</Button>
                        

                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default SentencingCompliance;