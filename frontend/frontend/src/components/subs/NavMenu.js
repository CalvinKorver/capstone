import React, {Component} from 'react';

import {
    Menu,
    Icon
  } from 'semantic-ui-react';

  const menuStyle = {
      backgroundColor: '#333A4E',
      minHeight: '3em'
  }


  class NavMenu extends Component {
    constructor(props) {
        super(props);
        this.activeItem = "nothing";
    }
    

    render() {
        return(
        <div >
            <Menu style={menuStyle} inverted secondary>
                <Menu.Menu position='left'>
                 <Menu.Item as='a'>
                        <Icon name="bars"/>
                    </Menu.Item>
                </Menu.Menu>

                <Menu.Menu>

                    <Menu.Item>
                        <h1>Shield</h1>
                    </Menu.Item>
               
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

