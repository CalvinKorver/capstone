import React, {Component} from 'react';
import { Button, Dropdown, Form, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios';
import DateTimeInput from '../subs/DateTimeInput';
import * as utils from '../../util/Functions';
import ErrorMessage from '../subs/ErrorMessage';

import '../../react_styles/NewClient.css';
const centered={marginLeft: '40%', marginRight: '40%', width: '20%'}


// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import '../react_styles/App.css';
// import Loginscreen from './loginScreen'

class NewClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            date_of_birth: "",
            street_address: "1800 Fakestreet Ave NE",
            city: "Seattle",
            state: "WA",
            zipcode: "98115",
            country: "USA",
            isDisplayError: false,
            errorMessage: "",
            isError: false,
            open: false
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    handleSubmit(event) {
        event.preventDefault();
        if (utils.isEmpty(this.state.first_name) || utils.isEmpty(this.state.last_name) ||
            utils.isEmpty(this.state.date_of_birth) || utils.isEmpty(this.state.street_address) ||
            utils.isEmpty(this.state.city) || utils.isEmpty(this.state.state) ||
            utils.isEmpty(this.state.zipcode) || utils.isEmpty(this.state.country)) {
            this.setState({
              isError: true,
              isDisplayError: true,
              errorMessage: "Sorry, please fill out all form fields prior to submitting a new client."
            });
        } else {
            var endpoint = "clients/"
            const payload = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                date_of_birth: this.state.date_of_birth,
                street_address: this.state.street_address,
                city: this.state.city,
                state: this.state.state,
                zipcode: this.state.zipcode,
                country: this.state.country
            }
            return axios
                .post(utils.globalURL + endpoint, payload)
                .then(response => {
                    this.setState({isError: false,
                        errorMessage: "Submitted a new client!",
                        isDisplayError: true
                    });
                    setTimeout(() => { this.close() }, utils.MODAL_EXIT_TIME);
                    this.props.refresh();
                })
                .catch(err => {
                    this.setState({
                        isError: true,
                        errorMessage: err,
                        isDisplayError: true
                    })
                    errorUpdate = utils.processError(err);
                    this.setState(errorUpdate);
                    throw err;
            });
        }
    }

    handleChange = (e, { name, value }) => { 
        this.setState({ [name]: value })
    }

    handleErrorClose() {
        this.setState({isDisplayError: false });
    }

    render() {
        const {first_name, last_name, date_of_birth, street_address, city, state, zipcode, country, open} = this.state
        var stateOptions = utils.STATE_OPTIONS;
        return (
            <Modal 
                id="new-client-modal"
                open={open}
                trigger={<Button color="blue" floated="right" 
                onClick={this.open}
                style={{width: '180px'}}>New Client</Button>}
                scroll>
                <Icon name="delete" link={true} size="large" onClick={this.close}/>
                <Modal.Header> New Client </Modal.Header>
                    <Modal.Content scrolling>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            {/* <label>First Name:</label>
                            <input type="text" name="first_name"/> */}
                            <Form.Input fluid label="First Name"
                            name="first_name"
                            value={first_name} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>Last Name:</label>
                            <input type="text" name="last_name"/> */}
                            <Form.Input fluid label="Last Name"
                            name="last_name"
                            value={last_name} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>Date of birth:</label>
                            <input type="text" name="date_of_birth" placeholder="year-month-day"/> */}
                                <DateTimeInput time={false} name="date_of_birth" label="Date of Birth" handleChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>Street Address:</label>
                            <input type="text" name="street_address"/> */}
                            <Form.Input fluid label="Street Address"
                            name="street_address"
                            value={street_address} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>City:</label>
                            <input type="text" name="city"/> */}
                            <Form.Input fluid label="City"
                            name="city"
                            value={city} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            <label>State:</label>
                            <Dropdown placeholder='Select State:' name="state" value={state} fluid selection options={stateOptions} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>Zipcode:</label>
                            <input type="text" name="zipcode"/> */}
                            <Form.Input fluid label="Zipcode"
                            name="zipcode"
                            value={zipcode} onChange={this.handleChange}/>
                        </Form.Field>
                        <Form.Field>
                            {/* <label>Country:<br/></label>
                            <input type="text" name="country"/> */}
                            <Form.Input fluid label="Country" 
                            name="country"
                            value={country} onChange={this.handleChange}/>
                        </Form.Field>
                        <ErrorMessage
                            isError={this.state.isError}
                            display={this.state.isDisplayError} 
                            message={this.state.errorMessage}
                            dismissed={this.handleErrorClose.bind(this)}/>
                        <Button type="submit"  color='blue' 
                                style={centered}>Submit</Button>
                        <br/>
                    </Form> 
                </Modal.Content>
            </Modal>
        );
    }
}

export default NewClient;