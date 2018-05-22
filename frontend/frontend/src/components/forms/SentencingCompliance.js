import React, {Component} from 'react';
import { Button, Checkbox, Dropdown, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';
import $ from 'jquery'; 
import * as utils from '../../util/Functions';
import ErrorMessage from '../subs/ErrorMessage';

const centered={marginLeft: '40%', marginRight: '40%', width: '20%'}


class SentencingCompliance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sentencingComplianceStatus: "",
            isAdmit: false,
            isReserve: false,
            isCaseClosed: false,
            isDisplayError: false,
            errorMessage: "",
            isError: false
        }
        console.log(this.props.caseNumber);
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }

    checkForEmptyFormElements = (payload) => {
        if (utils.isEmpty(payload.violationName) || utils.isEmpty(payload.isAdmit)|| utils.isEmpty(payload.isReserve)) {
            this.setState({isError: true,
                isDisplayError: true,
                errorMessage: "Sorry, please fill out all form fields prior to trying to update the sentence compliance."});
            return false;
        }
        return true;
    }

    handleSubmit(event) {
        event.preventDefault();
        var endpoint = "sentence-compliance/"
        let payload = this.state;
        payload.caseNumber = this.props.caseNumber;
        if (this.checkForEmptyFormElements(payload)) {
            return axios
                .post(utils.globalURL + endpoint, payload)
                .then(response => {
                    this.setState({isError: false,
                        errorMessage: "Submitted new sentence compliance info!",
                        isDisplayError: true
                    })
                })
                .catch(err => {
                    let errorUpdate = utils.processError(err);
                    this.setState(errorUpdate);
                    throw err;
                });
        }
    }

    handleChange = (e, { name, value, text }) => { 
        // if (value == "ad") {
        //     this.setState()
        // }
        this.setState({ [name]: value })
        // console.log("State: " + this.state.violationName);
        // console.log(this.state.preTrialStatus);
        if (name == "violationName") {
            if (value == "New Criminal Law Violation") {
                $("#nclv-form").removeClass("hidden");
            } else {
                $("#nclv-form").addClass("hidden");
            }
        }
    }

    handleErrorClose() {
        this.setState({isDisplayError: false});
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
                            onChange={this.handleChange}/>

                        <Form.Select fluid label="Alleged Violation" name="violationName" options={violationOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <div  id="nclv-form" className="hidden">
                            <Form.Input fluid label="Case Number" name="caseNumber" placeholder=""  value={caseNumber} onChange={this.handleChange}/>    
                        </div>

                        <Form.Select fluid label="Admit or Deny?" name="isAdmite" options={admitOptions} placeholder='Select an option' onChange={this.handleChange}/>

                        <Form.Select fluid label="Reserve or Impose?" name="isReserve" options={reserveOptions} placeholder='Select an option' onChange={this.handleChange}/>

<                       Button type="submit"  color='blue' 
                            style={centered}>Submit</Button>
                        <br/>
                        <ErrorMessage
                            isError={this.state.isError}
                            display={this.state.isDisplayError} 
                            message={this.state.errorMessage}
                            dismissed={this.handleErrorClose.bind(this)}/>
                        
                    </Form>
                </Modal.Content>
            </Modal>
        );
    }
}

export default SentencingCompliance;