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

import SwitchButton from './SwitchButton';
// import {CONST} from './Constants/Constants';

import AuthService from '../util/AuthService.js'
import '../util/ApiClient.js'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.Auth = new AuthService();
  }

  componentWillMount(){
    if(this.Auth.loggedIn())
        this.props.history.replace('/');
  }

  handleClick(event) {
    var self = this;
    var payload = {
      "username": this.state.username,
      "password": this.state.password
    }
    this.Auth.login(payload)
      .then(res =>{
        console.log("succuess")
        this.props.history.replace('/');
      })
      .catch(err =>{
          alert(err);
      })

    
  }
  render() {
    return (
      <div className="loginscreen" style={{padding: '2em'}}>
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

        <SwitchButton message="New User? Register" endpoint="register"/>
      </div>
      
    );
  }
}
export default Login;