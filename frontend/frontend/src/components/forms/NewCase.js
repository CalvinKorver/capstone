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
    { key: 'kingcountyfederal', text: 'King County Federal Court', value: "King County Federal Court"},
    { key: 'county courts', text: 'Lynnwood County Court', value: "Lynnwood County Court"},
    { key: 'EverettMetroCourthouse', text: 'Everett Metro Courthouse', value: "Everett Metro Courthouse"}
];


const chargeOptions = [
    { key: 'DUI', text: 'DUI', value: "DUI"},
    { key: 'Theft', text: 'Theft', value: 'Theft'},
    { key: 'Homicide', text: 'Homicide', value: 'Homicide'},
    { key: '3rd Degree Murder', text: '3rd Degree Murder', value: '3rd Degree Murder'}
]

class NewCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            court: "",
            dateOfOffense: "",
            caseNumber: "",
            chargeTypeName: "",
            startTimeCustody: "",
            endTimeCustody: "",
            failtoAppearDate: "", 
            benchWarrant: 0.00,
            isDomesticViolence: false,
            isCaseClosed: false,
            isDisplayError: false,
            errorMessage: "",
            isError: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
     }

    handleSubmit(event) {
        event.preventDefault();
        var endpoint = "cases/"
        let payload = this.state;
        payload["clientFirstName"] = this.props.firstName;
        payload["clientLastName"] = this.props.lastName;
        
        if (utils.isEmpty(payload.caseNumber) || utils.isEmpty(payload.dateOfOffense) || utils.isEmpty(payload.chargeTypeName)) {
            this.setState({isError: true,
                isDisplayError: true,
                errorMessage: "Sorry, please fill out all form fields prior to submitting a new case."});
        } else {
            return axios
            .post(utils.globalURL + endpoint, payload)
            .then(response => {
                this.setState({isError: false,
                    errorMessage: "Submitted a new case!",
                    isDisplayError: true
                })
            })
            .catch(err => {
                errorUpdate = utils.processError(err);
                this.setState(errorUpdate);
                throw err;
            });
        }
    }

    handleChange = (e, { name, value }) => { 
        console.log(name, value);
        this.setState({ [name]: value })
    }

    showOtherForm(e) {
        $('#' + e.target.value).toggleClass("hidden");
    }

    handleErrorClose() {
        this.setState({isDisplayError: false });
    }

    render() {

        const { court, dateOfOffense, caseNumber, chargeTypeName,
            startTimeCustody, endTimeCustody, failtoAppearDate, benchWarrant } = this.state

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
                            <Form.Select label="Charges" name="chargeTypeName" options={chargeOptions} value={chargeTypeName} onChange={this.handleChange}  placeholder='Select an option'/>
                        </Form.Group>

                        <Form.Field>
                            <Button value='charges' color='blue' disabled={true} onClick={e => this.addMoreFields(e)}>
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
                        <DateTimeInput time={false} name="startTimeCustody" label="Beginning of time in custody" handleChange={this.handleChange}/>
                        <DateTimeInput time={false} name="endTimeCustody" label="End of time in custody" handleChange={this.handleChange}/>
                            <Form.Field style={{marginBottom: '1em'}}>
                                <Form.Button  color='blue' disabled={true}>
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
                        <DateTimeInput time={false} name="failToAppearDate" label="Date of failure to appear" handleChange={this.handleChange}/>            
                        </div>

                        <div className="hidden" id='bench-warrant-div'>
                        <Form.Group  widths='equal'>
                            <Form.Input fluid label="Bench Warrant Amount" placeholder="0.00"
                            name="benchWarrant"
                            value={benchWarrant} onChange={this.handleChange}/>
                        </Form.Group>
                        </div>
                            <Button type="submit"  color='blue' 
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

export default NewCase;