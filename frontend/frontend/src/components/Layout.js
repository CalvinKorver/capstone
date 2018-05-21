import React, {Component} from 'react';
import NavMenu from './subs/NavMenu';
import Footer from './subs/Footer';
import Dashboard from './Dashboard';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavMenu/>
                <Dashboard handleLogout={this.props.handleLogout}/>
            </div>
        )
    }

}

export default Layout;