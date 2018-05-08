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
            </div>
        )
    }

}

export default Layout;