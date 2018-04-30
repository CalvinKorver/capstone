import React, { Component } from 'react'
import { Message } from 'semantic-ui-react'

class ErrorMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: this.props.display
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({visible: newProps.display});
    }

    handleDismiss = () => {
        this.setState({ visible: false })
        this.props.dismissed();
    }

    render() {
        if (this.state.visible) {
            console.log("is visible");
        return (
            <Message
                color="red"
                onDismiss={this.handleDismiss}
                header='Error!'
                content={this.props.message}
            />
        )
        }
        return null;
    }
}

export default ErrorMessage
