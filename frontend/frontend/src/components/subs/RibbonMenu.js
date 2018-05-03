
import React, {Component} from 'react';

import {
    Menu,
  } from 'semantic-ui-react'

  class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: "Cases"
        };
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
        this.props.onChange(name);
    }
    

    render() {
        let activeItem = this.state.activeItem;
        return(
        <div>
            <Menu pointing secondary>
                    <Menu.Item name='Information' active={activeItem === 'Information'} onClick={this.handleItemClick} />
                    <Menu.Item name='Cases' active={activeItem === 'Cases'} onClick={this.handleItemClick} />
                    {/* <Menu.Item name='Documents' active={activeItem === 'Documents'} onClick={this.handleItemClick} />
                    <Menu.Item name='Notes' active={activeItem === 'Notes'} onClick={this.handleItemClick} /> */}
                    </Menu>
                    
                    </div>
        )
    }
  }

export default NavMenu;



