import React, {Component} from 'react';
import Form from 'semantic-ui-react';
import axios from 'axios';

// import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
// import './App.css';
// import Loginscreen from './loginScreen'

class NewCase extends Component {
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
        var endpoint = "cases/"
        console.log(event.target);
        const data = new FormData(event.target);
        console.log(data);
        return axios
            .post(URL + endpoint, data
                // name: userPayload.username,
                // client_id: userPayload.password,
                // case_type_id: userPayload.password2
                )
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
            <div className="NewCase">
                <form onSubmit={this.handleSubmit}>
                    Name:<br/>
                    <input type="text" name="name"/><br/>
                    {/* <input type="text" name="lastname"/> */}
                    <input type="submit" value="Submit"/>
                </form> 
            </div>
        );
    }
}

export default NewCase;