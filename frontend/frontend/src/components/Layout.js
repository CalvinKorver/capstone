import React, {Component} from 'react';
import NavMenu from './subs/NavMenu'
import Dashboard from './Dashboard';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavMenu/>
                <Dashboard/>
                {/* Dashboard will go here */}
            </div>
        )
    }

}

export default Layout;