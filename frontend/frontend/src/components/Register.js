import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Icon, Message } from 'semantic-ui-react'
import $ from 'jquery'; 
import * as utils from '../util/Functions';
import ErrorMessage from './subs/ErrorMessage';
import AuthService from '../util/AuthService.js'
import '../util/ApiClient.js'
import SwitchButton from './SwitchButton';
import NavMenu from './subs/NavMenu';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: 'Joseph',
      last_name: 'Reimer',
      username: 'jremis',
      email: 'j@gmail.com',
      password1: 'password1',
      password2: 'password',
      isInError: false,
      errorMessage: ""
    }
    this.AuthService = new AuthService();
  }
  
  
  handleClick(event) {
    var payload = this.state;
    if (utils.isEmpty(payload.first_name) || utils.isEmpty(payload.last_name) || utils.isEmpty(payload.password1) || utils.isEmpty(payload.password2) || utils.isEmpty(payload.email)) {
      this.setState({
        isInError: true,
        errorMessage: "Sorry, please fill out all form fields prior to logging in."
      });
    } else {
      console.log(payload);
      this.AuthService.createNewUser(payload)
        .then(res =>{
          this.props.history.replace('/');
        })
        .catch(err => {
            if (err.response != undefined) {
              this.setState({
                errorMessage: err.response.status + ": " + err.response.statusText,
                isInError: true
              });
            } else {
              this.setState({
                errorMessage: "Unknown Error!",
                isInError: true
              });
            }
        })
    }
  }


  handleChange = (e, { name, value }) => { 
    this.setState({ [name]: value })
  }

  handleErrorClose() {
    this.setState({isInError: false });
  }

  render() {
    const {first_name, last_name, email, username, password1, password2} = this.state;
    return (
      <div>
        <NavMenu/>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Form size='large' id="registration-form">
            <Segment style={{padding: "3em", marginTop: "20%"}}>
            <Header as='h3' textAlign='center'
            style={{marginBottom: "1em"}}>
              Register
            </Header>
              
              <Form.Input
                  id="first_name"
                  name="first_name"
                  value={first_name}
                  fluid
                  placeholder='First Name'
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="last_name"
                  value={last_name}
                  fluid
                  placeholder='Last Name'
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="email"
                  value={email}
                  fluid
                  placeholder='Email'
                  onChange={this.handleChange}
                /> 
                
                <Form.Input
                  name="username"
                  value={username}
                  fluid
                  placeholder='Username'
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password1"
                  value={password1}
                  fluid
                  placeholder='Password'
                  type='password'
                  onChange={this.handleChange}
                />
                <Form.Input
                  name="password2"
                  value={password2}
                  fluid
                  placeholder='Confirm Password'
                  type='password'
                  onChange={this.handleChange}
                />
                <ErrorMessage
                    display={this.state.isInError} 
                    message={this.state.errorMessage}
                    dismissed={this.handleErrorClose.bind(this)}/>
                <br />
                <Button color="blue" fluid size='large' onClick={(event) => this.handleClick(event)}>Register</Button>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
        <SwitchButton message="Already registered? Log in." endpoint="login"/>
      </div>
    );
  }
}

export default Register;