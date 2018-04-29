import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react'

import AuthService from '../util/AuthService.js'
import '../util/ApiClient.js'
import SwitchButton from './SwitchButton';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: 'Joseph',
      last_name: 'Reimer',
      username: 'jremis',
      email: 'j@gmail.com',
      password1: 'password1',
      password2: 'password'
    }
    this.AuthService = new AuthService();
  }
  handleClick(event) {
    var payload = this.state;
    console.log(payload);
    this.AuthService.createNewUser(payload)
  }


  handleChange = (e, { name, value }) => { 
    this.setState({ [name]: value })
  }

  render() {
    const {first_name, last_name, email, username, password1, password2} = this.state;
    return (
      <div>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              Register
        </Header>
            <Form size='large'>
              <Segment stacked>
              <Form.Input
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

                <br />
                <Button color='teal' fluid size='large' onClick={(event) => this.handleClick(event)}>Register</Button>
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