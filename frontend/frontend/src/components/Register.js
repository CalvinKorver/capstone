import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'

import AuthService from '../util/AuthService.js'
import '../util/ApiClient.js'
import SwitchButton from './SwitchButton';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
    this.AuthService = new AuthService();
  }
  handleClick(event) {
    var self = this;
    var payload = {
      // "firstName": this.state.first_name,
      // "lastName": this.state.last_name,
      "username": this.state.user_name,
      "email": this.state.email,
      "password": this.state.password,
      "password2": this.state.confirm_password
    }
    this.AuthService.createNewUser(payload)
  }
  render() {
    return (
      <div>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' color='teal' textAlign='center'>
              <Icon fitted name='game' />
              Register
        </Header>
            <Form size='large'>
              <Segment stacked>
                {/* <Form.Group widths='equal'>
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='first Name'
                    onChange={(event, newValue) => this.setState({ first_name: newValue.value })}
                  />
                  <Form.Input
                    fluid
                    icon='user'
                    iconPosition='left'
                    placeholder='Last Name'
                    onChange={(event, newValue) => this.setState({ last_name: newValue.value })}
                  />
                </Form.Group>
                */}
                <Form.Input
                  fluid
                  icon='mail'
                  iconPosition='left'
                  placeholder='Email'
                  onChange={(event, newValue) => this.setState({ email: newValue.value })}
                /> 
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Username'
                  onChange={(event, newValue) => this.setState({ user_name: newValue.value })}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  onChange={(event, newValue) => this.setState({ password: newValue.value })}
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Confirm Password'
                  type='password'
                  onChange={(event, newValue) => this.setState({ confirm_password: newValue.value })}
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