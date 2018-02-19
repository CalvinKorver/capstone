import React, {Component} from 'react';
import 'semantic-ui-css/semantic.min.css';
// import injectTapEventPlugin from 'react-tap-event-plugin'; Needed for
// onTouchTap http://stackoverflow.com/a/34015469/988941 injectTapEventPlugin();
import './App.css';
import Loginscreen from './loginScreen'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      gameScreen: []
    }
  }
  componentWillMount() {
    // var gameScreen = [];
    // gameScreen.push(<Game appContext={this}/>);
    // this.setState({   gameScreen: gameScreen });
    var loginPage = [];
    loginPage.push(<Loginscreen appContext={this} key={"loginScreen"}/>);
    this.setState({loginPage: loginPage})
  }
render() {
  return (
    <div className="App">
      {this.state.loginPage}
      {/* {this.state.gameScreen} */}
    </div>

  );
}
}

export default App;