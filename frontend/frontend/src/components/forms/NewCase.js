import React, {Component} from 'react';
import { Icon, Form, Button, Modal} from 'semantic-ui-react';
import axios from 'axios';
import $ from 'jquery'; 
import DateTimeInput from '../subs/DateTimeInput';
import * as utils from '../../util/Functions';
import ErrorMessage from '../subs/ErrorMessage';

const centered={marginLeft: '40%', marginRight: '40%', width: '20%'}

const courtOptions = [
    { key: 'fedwaymunicipal', text: 'Federal Way Municipal Court', value: "Federal Way Municipal Court"},
    { key: 'kingcountyfederal', text: 'King County Federal Court', value: "King County Federal Court"}
];


const chargeOptions = [
    { key: 'DUI', text: 'DUI', value: "DUI"},
    { key: 'Theft', text: 'Theft', value: 'Theft'}
]

class NewCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            court: "",
            dateOfOffense: "", //02/14/1995
            caseNumber: "",
            charge1: "",
            startTimeCustody1: "",
            endTimeCustody1: "",
            dateFailureToAppear: "", 
            benchWarrantAmount: 0.00,
            displayMessage: false,
            message: "",
            isError: false
        }


        // FOR TESTING

        // this.state = {
        //     caseNumber:"blood",
        //     charge1:"Felony",
        //     court:"Federal Way Municipal Court",
        //     dateFailureToAppear:"02/4/1995",
        //     dateOfOffense:"02/14/1995",
        //     endTimeCustody1:"02/11/1995",
        //     firstName:"Bob",
        //     lastName:"Jones",
        //     startTimeCustody1:"02/10/1995"
        // }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }

    handleSubmit(event) {
        event.preventDefault();
        var endpoint = "cases/"
        var data = this.state;
        data["firstName"] = this.props.firstName;
        data["lastName"] = this.props.lastName;
        return axios
        // this handles the most basic form entry
            .post(utils.globalURL + endpoint, {
                caseNumber: this.state.caseNumber,
                offenseDate: this.state.dateOfOffense,
                chargeTypeName: this.state.charge1,
                clientFirstName: this.props.firstName,
                clientLastName: this.props.lastName,
                jailTimeSuspended: 0,
                benchWarrant: 0,
                isDomesticViolence: false,
                isCaseClosed: false,
                benchWarrant: this.state.benchWarrantAmount,
                failToAppearDate: this.state.dateFailureToAppear
            })
            .then(response => {
                this.setState({
                    isError: false,
                    message: "Submitted a new case!",
                    displayMessage: true
                })
            })
            .catch(err => {
                if (err.response != undefined) {
                    console.log(err.response.data);
                    if (err.response.status == 400) {
                      let message = ""
                      for(let e in err.response.data) {
                        message += err.response.data[e] + "\n";
                      }
                      this.setState({
                        isError: true,
                        message: message,
                        displayMessage:true
                      })
                    } else {
                        this.setState({
                            isError: true,
                            message: err.response.status + ": " + err.response.statusText,
                            displayMessage: true
                        });
                    }
                  } else {
                    this.setState({
                        isError: true,
                        message: "Unknown Error!",
                        displayMessage: true
                    });
                  }
              throw err;
            });
    }

    handleChange = (e, { name, value }) => { 
        this.setState({ [name]: value })
    }

    showOtherForm(e) {
        $('#' + e.target.value).toggleClass("hidden");
    }

    handleErrorClose() {
        this.setState({displayMessage: false });
      }

    addMoreFields(e) {
        switch (e.target.value) {
            case "charges":
                $('#charge-form-group').append(
                    <p>test</p>);
                break;
        
            default:
                break;
        }
    }

    render() {

        const { court, dateOfOffense, caseNumber, charge1,
            startTimeCustody1, endTimeCustody1,dateFailureToAppear, benchWarrantAmount } = this.state

        return (
            <Modal 
                trigger={<Button color="blue"floated="right" style={{width: '180px'}}>New Offense / Case</Button>}
                closeIcon>
            <Modal.Header>Create New Offense </Modal.Header>
                <Modal.Content scrolling>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Select fluid label="Court" name="court" options={courtOptions} placeholder='Select an option'  value={court} onChange={this.handleChange} />
                        
                        <DateTimeInput time={false} name="dateOfOffense" label="Date of offense" handleChange={this.handleChange}/>

                        <Form.Input fluid label="Case Number" name="caseNumber"  placeholder=""  value={caseNumber} onChange={this.handleChange} />

                        <Form.Group id="charge-form-group">
                            <Form.Select fluid label="Charges" name="charge1" options={chargeOptions} value={charge1} onChange={this.handleChange}  placeholder='Select an option'/>
                        </Form.Group>

                        <Form.Field>
                            <Button value='charges' color='blue' onClick={e => this.addMoreFields(e)}>
                                <Icon name="plus"/>
                                Add more charges
                            </Button>
                        </Form.Field>



                        {/* Time in Custody */}
                        <Form.Checkbox 
                            id="time-in-custody-checkbox"
                            label="Time in Custody" 
                            value="time-in-custody-div"
                            onChange={e => this.showOtherForm(e)}/>
                        
                        <div id="time-in-custody-div" className="hidden">
                        <DateTimeInput time={false} name="startTimeCustody1" label="Beginning of time in custody" handleChange={this.handleChange}/>
                        <DateTimeInput time={false} name="endTimeCustody1" label="End of time in custody" handleChange={this.handleChange}/>
                            <Form.Field>
                                <Form.Button  color='blue'  >
                                    <Icon name="plus"/>
                                    Add additional date of time in custody
                                </Form.Button>
                            </Form.Field>
                        </div>


                        {/* Failure to appear & Bench Warrant */}
                        <Form.Group widths='equal'>
                            <Form.Checkbox
                                id="failure-to-appear-checkbox"
                                label="Failure to appear?"
                                value="failure-to-appear-div"
                                onChange={e => this.showOtherForm(e)}/>
                            <Form.Checkbox
                                id="bench-warrant-checkbox"
                                label="Bench warrant?"
                                value="bench-warrant-div"
                                onChange={e => this.showOtherForm(e)}/>
                        </Form.Group>


                        <div className="hidden" id='failure-to-appear-div'>
                        <Form.Group 
                        class="hidden"
                        widths='equal'>
                            {/* <Form.Input fluid label="Date of failure to appear" placeholder="MM/DD/YYYY"
                            name="dateFailureToAppear"
                            value={dateFailureToAppear} onChange={this.handleChange}/> */}
                            <DateTimeInput time={false} name="failToAppearDate" label="Date of failure to appear" handleChange={this.handleChange}/>            
                        </Form.Group>
                        </div>

                        <div className="hidden" id='bench-warrant-div'>
                        <Form.Group  widths='equal'>
                            <Form.Input fluid label="Bench Warrant Amount" placeholder="0.00"
                            name="benchWarrantAmount"
                            value={benchWarrantAmount} onChange={this.handleChange}/>
                        </Form.Group>
                        </div>
                            <Button type="submit"  color='blue' 
                                style={centered}>Submit</Button>
                            <br/>
                        <ErrorMessage
                            isError={this.state.isError}
                            display={this.state.displayMessage} 
                            message={this.state.message}
                            dismissed={this.handleErrorClose.bind(this)}/>
                    </Form>
                </Modal.Content>
             </Modal>
        );
    }
}

export default NewCase;