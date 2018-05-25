import React, {Component} from 'react';
import * as utils from '../../util/Functions';
import {
    Icon
  } from 'semantic-ui-react'

class DeleteButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Icon link color="red" name='trash' onClick={(e) => this.props.delete(this.props.id, e)}/>
        )
    }
}

export default DeleteButton;