import React, {Component} from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Message
} from 'semantic-ui-react'
import $ from 'jquery';
import * as utils from '../util/Functions';
import ErrorMessage from './subs/ErrorMessage';

import SwitchButton from './SwitchButton';
import NavMenu from './subs/NavMenu';

import AuthService from '../util/AuthService.js'
import '../util/ApiClient.js'
import { isEmpty } from '../util/Functions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isInError: false,
      errorMessage: ""
    }
    this.Auth = new AuthService();
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
  }

  handleErrorClose() {
    this.setState({isInError: false });
  }

  handleClick(event) {
    event.preventDefault();
    console.log("pressed submit");
    if (utils.isEmpty(this.state.username) || utils.isEmpty(this.state.password)) {
      this.setState({
        isInError: true,
        errorMessage: "Sorry, please fill out all form fields prior to logging in."
      });
    } else {
      var payload = {
        "username": this.state.username,
        "password": this.state.password
      }
      this.Auth.login(payload)
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

  render() {
    return (
      <div className="loginscreen">
      <NavMenu/>
        <Grid
            textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'>
          <Grid.Column style={{ maxWidth: 500 }}>
            <Form size='large' id="login-form">
              <Segment style={{padding: "3em", marginTop: "20%"}}>
              <Header as='h3' textAlign='center' style={{marginBottom: "1em"}}>Sign in to view cases</Header>
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
                  color="blue"
                  fluid
                  size='large'
                  onClick={(event) => this.handleClick(event)}>Sign in</Button>
                  <ErrorMessage
                    display={this.state.isInError} 
                    message={this.state.errorMessage}
                    dismissed={this.handleErrorClose.bind(this)}/>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid> 

        <SwitchButton message="New User? Register" endpoint="register"/>
      </div>
      
    );
  }
}
export default Login;