import React, {Component} from 'react';
import { Button, Checkbox, Dropdown, Form, Input } from 'semantic-ui-react'
import axios from 'axios';

class SearchClients extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: []
        }
     }

     componentDidMount() {
        // don't hardcode urls
        fetch('http://localhost:8000/clients/', {mode: 'cors'})
            .then(function(response) {
              return response.json();
            })
            .then(clientData => this.setState({
                clients: clientData
            }));
      }
    

    render() {
        var clientData = this.state.clients;
        var clientOptions;
        if(clientData) {
            var clientOptions = clientData.map(client => <option>{client.first_name} {client.last_name}</option>)
        }
        return (
            <div className="SearchClients">
                <div>
                    <Input list='clients' placeholder='Search by Client Name' />
                    <datalist id='clients'>
                        {clientOptions}
                    </datalist>
                </div>
            </div>
        );
    }
}

export default SearchClients;