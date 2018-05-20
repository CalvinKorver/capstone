import React, {Component} from 'react';

import {
    Menu,
    Icon
  } from 'semantic-ui-react';

  class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.activeItem = "nothing";
    }
    

    render() {
        return(
        <div>
            <Menu color='blue' inverted secondary>
                <Menu.Menu position='left'>
                <Menu.Item as='a'>
                        <Icon name="bars"/>
                    </Menu.Item>
                </Menu.Menu>

                <Menu.Menu>
                <a href="/">
                    <Menu.Item>
                        Shield
                    </Menu.Item>
                </a>
                </Menu.Menu>
                <Menu.Menu position='right'>
                    <Menu.Item as='a'>
                        <Icon name="user"/>
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        </div>
        )
    }
  }

export default NavMenu;

