// file: src/util/Auth.js
import axios from 'axios';
import _ from 'lodash';
// import store from '../store';
// import { setToken } from '../actions'
// import { URL, LOGIN } from '../config/Api';

export function InvalidCredentialsException(message) {
    this.message = message;
    this.name = 'InvalidCredentialsException';
}

export function createNewUser(userPayload) {
  var URL = "http://localhost:8000/rest-auth/";
  var LOGIN = "registration/"
    return axios
      .post(URL + LOGIN, {
        username: userPayload.username,
        password1: userPayload.password,
        password2: userPayload.password2,
        email: userPayload.email
      })
      .then(function (response) {
        console.log(response);
        window.localStorage.setItem('token', response);
        // store.dispatch(setToken(response.data.token));
      })
      .catch(function (error) {
        // raise different exception if due to invalid credentials
        if (_.get(error, 'response.status') === 400) {
          throw new InvalidCredentialsException(error);
        }
        throw error;
      });
}

export function login(userPayload) {
  var URL = "http://localhost:8000/";
  var LOGIN = "rest-auth/login/";
  console.log(userPayload.username + userPayload.password);
  return axios
      .post(URL + LOGIN, {
        username: userPayload.username,
        password: userPayload.password,
      })
      .then(function (response) {
        console.log(response);
        window.localStorage.setItem('token', response);
        // store.dispatch(setToken(response.data.token));
      })
      .catch(function (error) {
        // raise different exception if due to invalid credentials
        if (_.get(error, 'response.status') === 400) {
          throw new InvalidCredentialsException(error);
        }
        throw error;
      });
}

// export function loggedIn() {
//   return store.getState().token == null;
// }