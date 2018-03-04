import React, {Component} from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react'
// import {CONST} from './Constants/Constants';

import { login } from '../util/Auth.js'
import '../util/ApiClient.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  handleClick(event) {
    var self = this;
    var payload = {
      "username": this.state.username,
      "password": this.state.password
    }
    login(payload);

  }
  render() {
    return (
      <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='teal' textAlign='center'>Log In</Header>
          <Form size='large'>
            <Segment>
              <Form.Input
                fluid
                icon='user'
                iconPosition='left'
                placeholder='Username'
                onChange=
                {(event,newValue) => this.setState({username:newValue.value})}/>
              <Form.Input
                fluid
                icon='lock'
                iconPosition='left'
                placeholder='Password'
                type='password'
                onChange=
                {(event,newValue) => this.setState({password:newValue.value})}/>
              <Button
                color='teal'
                fluid
                size='large'
                onClick={(event) => this.handleClick(event)}>Login</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
export default Login;