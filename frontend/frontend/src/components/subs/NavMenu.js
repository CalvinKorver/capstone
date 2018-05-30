import React, {Component} from 'react';

import {
    Menu,
    Icon
  } from 'semantic-ui-react';

  const menuStyle = {
      backgroundColor: '#333A4E'
  }

  const menuDiv = {
      height: '50px'
  }

  class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.activeItem = "nothing";
    }
    

    render() {
        return(
        <div style={menuDiv} >
            <Menu style={menuStyle} inverted secondary>
                {/*<Menu.Menu position='left'>
                 <Menu.Item as='a'>
                        <Icon name="bars"/>
                    </Menu.Item>
                </Menu.Menu> */}

                <Menu.Menu>
                <a href="/">
                    <Menu.Item>
                        <h1>Shield</h1>
                    </Menu.Item>
                </a>
                </Menu.Menu>
                {/* <Menu.Menu position='right'>
                    <Menu.Item as='a'>
                        <Icon name="user"/>
                    </Menu.Item>
                </Menu.Menu> */}
            </Menu>
        </div>
        )
    }
  }

export default NavMenu;

