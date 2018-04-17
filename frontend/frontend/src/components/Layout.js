import React, {Component} from 'react';
import NavMenu from './subs/NavMenu'
import ClientDashboard from './ClientDashboard';

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavMenu/>
                <ClientDashboard/>
                {/* Dashboard will go here */}
            </div>
        )
    }

}

export default Layout;