// file: src/util/AuthService.js
import axios from 'axios';
import _ from 'lodash';

import decode from 'jwt-decode';

export default class AuthService {
  constructor(domain) {
    this.domain = domain || 'http://localhost:8080' // API server domain
    this.fetch = this
      .fetch
      .bind(this) // React binding stuff
    this.login = this
      .login
      .bind(this)
    this.getProfile = this
      .getProfile
      .bind(this)
    this.createNewUser = this
      .createNewUser
      .bind(this)
    // this.setToken = this.setToken.bind(this);
  }

  // InvalidCredentialsException(message) {
  //   this.message = message;
  //   this.name = 'InvalidCredentialsException';
  // }

  createNewUser(userPayload) {
    var URL = "http://localhost:8000/rest-auth/";
    var LOGIN = "registration/"
    return axios
      .post(URL + LOGIN, {
        username: userPayload.username,
        password1: userPayload.password1,
        password2: userPayload.password2,
        email: userPayload.email
      })
      .then(function (response) {
        console.log("setting id_token: " + response.data.token);
        window.localStorage.setItem('id_token', response.data.token)
        // store.dispatch(setToken(response.data.token));
      })
      .catch(function (error) {
        // raise different exception if due to invalid credentials
        if (_.get(error, 'response.status') === 400) {
          // throw new this.InvalidCredentialsException(error);
          console.error(error);
        }
        throw error;
      });
  }

  loggedIn() {
    console.log("checking if logged in");
    // Checks if there is a saved token and it's still valid
    const token = this.getToken() // GEtting token from localstorage
    console.log("token");
    console.log(token);

    console.log("isExpired");
    console.log(!this.isTokenExpired(token));
    return !!token && !this.isTokenExpired(token) // handwaiving here
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) { // Checking if token is expired. N
        return true;
      } else 
        return false;
      }
    catch (err) {
      return false;
    }
  }

  setToken(idToken) {
    console.log("here");
    // Saves user token to localStorage
    window.localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from localStorage
    return window.localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from localStorage
    window.localStorage.removeItem('id_token');
  }

  getProfile() {
    // Using jwt-decode npm package to decode the token
    return decode(this.getToken());
  }


  login(userPayload) {
    var URL = "http://localhost:8000/";
    var LOGIN = "rest-auth/login/";
    console.log(userPayload.username + userPayload.password);
    return axios
      .post(URL + LOGIN, {
        username: userPayload.username,
        password: userPayload.password
      })
      .then(function (response) {
        console.log(response);
        console.log("beforesetToken");
        window
        .localStorage
        .setItem('id_token', response.data.token);
        // this.setToken(response.data.token);
        console.log("after settToken");
        return Promise.resolve(response);
      })
      .catch(function (error) {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            throw error;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            // console.log(error.request);
            throw error;
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
      });
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    // Setting Authorization header Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
        headers,
        ...options
      })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}