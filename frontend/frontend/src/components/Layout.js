import React, {Component} from 'react';
import NavMenu from './subs/NavMenu'

class Layout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <NavMenu/>
                
                {/* Dashboard will go here */}
            </div>
        )
    }

}

export default Layout;