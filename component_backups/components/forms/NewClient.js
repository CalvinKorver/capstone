import React, {Component} from 'react';
import { Button, Dropdown, Form, Modal } from 'semantic-ui-react'
import axios from 'axios';

// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import '../react_styles/App.css';
// import Loginscreen from './loginScreen'

class NewClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
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
        const data = new FormData(event.target);
        return axios
            .post(URL + endpoint, data)
            .then(function (response) {
                alert("Submitted");
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

    render() {

        var stateOptions = [{text: "CA", value:"CA"}, {text: "WA", value:"WA"}]
        return (
            <Modal trigger={<Button floated="right">New Client</Button>}>
                <Modal.Header> New Client</Modal.Header>
                    <Modal.Content>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <label>First Name:</label>
                            <input type="text" name="first_name"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Last Name:</label>
                            <input type="text" name="last_name"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Date of birth:</label>
                            <input type="text" name="date_of_birth" placeholder="year-month-day"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Street Address:</label>
                            <input type="text" name="street_address"/>
                        </Form.Field>
                        <Form.Field>
                            <label>City:</label>
                            <input type="text" name="city"/>
                        </Form.Field>
                        <Form.Field>
                            <label>State:</label>
                            <Dropdown placeholder='Select State:' fluid selection options={stateOptions} />
                        </Form.Field>
                        <Form.Field>
                            <label>Zipcode:</label>
                            <input type="text" name="zipcode"/>
                        </Form.Field>
                        <Form.Field>
                            <label>Country:<br/></label>
                            <input type="text" name="country"/>
                        </Form.Field>
                        <Button type="submit">Submit</Button>
                    </Form> 
                </Modal.Content>
            </Modal>
        );
    }
}

export default NewClient;