
import React, {Component} from 'react';
import '../../react_styles/RibbonMenu.css';

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
        const upper = {
            textTransform: 'uppercase',
            marginRight: '1em'
        }
        let activeItem = this.state.activeItem;
        return(
        <div >
            <Menu id="ribbon-menu" pointing secondary style={{marginTop: '1em'}}>
                <Menu.Item 
                style={{textTransform: 'uppercase',
                        marginRight: '1em',
                        marginLeft: '4em',
                        paddingBottom: '2em'
                        }} 
                        name='Information' active={activeItem === 'Information'} onClick={this.handleItemClick} />
                <Menu.Item style={{textTransform: 'uppercase',
                        marginRight: '1em',
                        // marginLeft: '2em',
                        paddingBottom: '2em'
                        }} class="uppercase-text" name='Cases' active={activeItem === 'Cases'} onClick={this.handleItemClick} />

                {/* <Menu.Item name='Documents' active={activeItem === 'Documents'} onClick={this.handleItemClick} />
                <Menu.Item name='Notes' active={activeItem === 'Notes'} onClick={this.handleItemClick} /> */}
            </Menu>
        </div>
        )
    }
  }

export default NavMenu;



