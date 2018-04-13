import React, {Component} from 'react';
import { Icon, Form, Container, Header, Button } from 'semantic-ui-react';
import axios from 'axios';
import $ from 'jquery'; 


// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

const courtOptions = [
    { key: 'wa', text: 'Washington', value: "wa"},
    { key: 'ca', text: 'California', value: 'ca'}
];


const chargeOptions = [
    { key: 'wa', text: 'Washington', value: "wa"},
    { key: 'ca', text: 'California', value: 'ca'}
]

class NewCase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            court: '',
            dateOfOffense: '',
            caseNumber: '',
            charge1: '',

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
        console.log(event.target);
        const data = new FormData(event.target);
        console.log(data);
        return axios
            .post(URL + endpoint, data
                // name: userPayload.username,
                // client_id: userPayload.password,
                // case_type_id: userPayload.password2
                )
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

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    showOtherForm(e) {
        console.log(e.target.value);
        $('#' + e.target.value).toggleClass("hidden");
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

        const { court, dateOfOffense, caseNumber, charge1 } = this.state


        return (
            <Container>
                <Header as="h1"> New Offense </Header>
                <Form>
                    <Form.Select fluid label="Court" name="court" options={courtOptions} placeholder='Select an option'  value={court} onChange={this.handleChange} />
                    
                    <Form.Input fluid label="Date of Offense" name="dateOfOffense" placeholder="MM/DD/YYYY"  value={dateOfOffense} onChange={this.handleChange} />

                    <Form.Input fluid label="Case Number" name="caseNumber"  placeholder=""  value={caseNumber} onChange={this.handleChange} />

                    <Form.Group id="charge-form-group">
                        <Form.Select fluid label="Charges" name="charge1" options={chargeOptions} value={charge1} onChange={this.handleChange}  placeholder='Select an option'/>
                    </Form.Group>
                    <Button content='Submit' value='charges' onClick={e => this.addMoreFields(e)}>
                        <Icon name="plus"/>
                        Add more charges
                    </Button>


                    {/* Time in Custody */}
                    <Form.Checkbox 
                        id="time-in-custody-checkbox"
                        label="Time in Custody" 
                        value="time-in-custody-div"
                        onChange={e => this.showOtherForm(e)}/>
                    
                    <div id="time-in-custody-div" class="hidden">
                        <Form.Group widths='equal'>
                            <Form.Input fluid label="Beginning of time in custody" placeholder="MM/DD/YYYY"/>
                            <Form.Input fluid label="End of time in custody" placeholder="MM/DD/YYYY"/>
                        </Form.Group>
                      <Form.Button content='Submit' >
                        <Icon name="plus"/>
                        Add additional date of time in custody
                     </Form.Button>
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
                        <Form.Input fluid label="Date of failure to appear" placeholder="MM/DD/YYYY"/>
                    </Form.Group>
                    </div>

                    <div className="hidden" id='bench-warrant-div'>
                    <Form.Group  widths='equal'>
                        <Form.Input fluid label="Bench Warrant Amount" placeholder="0.00"/>
                    </Form.Group>
                    </div>

                </Form>
            </Container>
        );
    }
}

export default NewCase;