import React, {Component} from 'react';
import Form from 'semantic-ui-react';
import axios from 'axios';

// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

class NewClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
     }
//   componentWillMount() {
//     // var gameScreen = [];
//     // gameScreen.push(<Game appContext={this}/>);
//     // this.setState({   gameScreen: gameScreen });
//     var loginPage = [];
//     loginPage.push(<Loginscreen appContext={this} key={"loginScreen"}/>);
//     this.setState({loginPage: loginPage})
//   }
// componentDidMount() {
//   // don't hardcode urls
//   fetch('http://localhost:8000/clients/', {mode: 'cors'})
//       .then(function(response) {
//         return response.json();
//       })
//       .then(clientData => this.setState({
//           clients: clientData
//       }));
// }

    handleSubmit(event) {
        event.preventDefault();
        var URL = "http://localhost:8000/";
        var endpoint = "clients/"
        console.log(event.target);
        const data = new FormData(event.target);
        console.log(data);
        return axios
            .post(URL + endpoint, data)
            .then(function (response) {
                console.log(response);
            // window.localStorage.setItem('token', response);
            // store.dispatch(setToken(response.data.token));
            });
            // .catch(function (error) {
            //   // raise different exception if due to invalid credentials
            //   if (_.get(error, 'response.status') === 400) {
            //     throw new InvalidCredentialsException(error);
            //   }
            //   throw error;
            // });
    }

    render() {
        return (
            <div className="NewClient">
                <form onSubmit={this.handleSubmit}>
                    First Name:<br/>
                    <input type="text" name="first_name"/><br/>
                    Last Name:<br/>
                    <input type="text" name="last_name"/><br/>
                    Date of birth (year-month-day):<br/>
                    <input type="text" name="date_of_birth"/><br/>
                    Street Address:<br/>
                    <input type="text" name="street_address"/><br/>
                    City:<br/>
                    <input type="text" name="city"/><br/>
                    State (2 letters):<br/>
                    <input type="text" name="state"/><br/>
                    Zipcode:<br/>
                    <input type="text" name="zipcode"/><br/>
                    Country:<br/>
                    <input type="text" name="country"/><br/>
                    {/* can put client type here, maybe as a dropdown */}
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        );
    }
}

export default NewClient;