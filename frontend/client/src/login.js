import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react'
// import Game from './Game';
import {CONST} from './Constants/Constants';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  handleClick(event) {
    var self = this;
    var payload={
      "email": this.state.email,
      "password": this.state.password
      }
      axios.post(CONST.API_URL +'/v1/sessions', payload)
        .then(function (response) {
          if(response.status == 200){
            var headers = response.headers.authorization;
            if (headers != null ) {
                window.localStorage.setItem("auth", headers);
                window.localStorage.setItem("user", JSON.stringify(response.data))
            }
            // var gameScreen=[];
            // gameScreen.push(<Game appContext={self.props.appContext}/>)
            // self.props.appContext.setState({loginPage:[],gameScreen:gameScreen})
          }
        })
          .catch(function (error) {
          console.log(error);
        });
      }
render() {
    return (
        <div className='login-form'>
    {/*
      Heads up! The styles below are necessary for the correct render of this example.
      You can do same with CSS, the main idea is that all the elements up to the `Grid`
      below must have a height of 100%.
    */}
    <style>{`
      body > div,
      body > div > div,
      body > div > div > div.login-form {
        height: 100%;
      }
    `}</style>
    <Grid
      textAlign='center'
      style={{ height: '100%' }}
      verticalAlign='middle'
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
    <Icon fitted name='game' />
          Log In
        </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input
              fluid
              icon='user'
              iconPosition='left'
              placeholder='E-mail address'
              onChange = {(event,newValue) => this.setState({email:newValue.value})}
              
            />
            <Form.Input
              fluid
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              onChange = {(event,newValue) => this.setState({password:newValue.value})}
            />
            <Button color='teal' fluid size='large' onClick={(event) => this.handleClick(event)}>Login</Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>
  </div>
    );
  }
}
export default Login;