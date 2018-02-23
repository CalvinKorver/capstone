import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import './LoginScreen.css';
import Login from './login';
import Register from './register';
class Loginscreen extends Component {
  constructor(props){
    super(props);
    this.state={
      username:'',
      password:'',
      loginscreen:[],
      loginmessage:'',
      buttonLabel:'Register',
      isLogin:true
    }
  }
  componentWillMount(){
    var loginscreen=[];
    loginscreen.push(<Login key={"login"} parentContext={this} appContext={this.props.appContext}/>);
    var loginmessage = "Not registered yet, Register Now";
    this.setState({
                  loginscreen:loginscreen,
                  loginmessage:loginmessage
                    })
  }
  handleClick(event){
    var loginmessage;
    if(this.state.isLogin){
      var loginscreen=[];
      loginscreen.push(<Register parentContext={this} appContext={this.props.appContext}/>);
      loginmessage = "Have an account? Log in!";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Login",
                     isLogin:false
                   })
    }
    else{
      var loginscreen=[];
      loginscreen.push(<Login parentContext={this} appContext={this.props.appContext}/>);
      loginmessage = "New User? Sign Up!";
      this.setState({
                     loginscreen:loginscreen,
                     loginmessage:loginmessage,
                     buttonLabel:"Register",
                     isLogin:true
                   })
    }
  }
  render() {
    return (
      <div className="loginscreen">
        {this.state.loginscreen}
        <div>
          <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
          >
            <div id='login-nav-div'>
               <Button primary={true} onClick={(event) => this.handleClick(event)}>
               {this.state.loginmessage}
               </Button>
           </div>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Loginscreen;