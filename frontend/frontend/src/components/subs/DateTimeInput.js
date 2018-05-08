import React, {Component} from 'react';
import { Form, Input } from 'semantic-ui-react';


class DateTimeInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            day: "",
            month: "",
            year: ""
        };
    }

    handleChange = (e, {name, value}) => {
        this.setState({ [name]: value }, () => {
            var date = {
                name: this.props.name,
                value: this.state.year + "-" + this.state.month + "-" + this.state.day
            }
            this.props.handleChange(e, date);
        });
    }

    render() {
        console.log(this.state);
        const monthOptions = [
            {text: 'January', value: "01"},
            {text: 'February', value: "02"},
            {text: 'March', value: "03"},
            {text: 'April', value: "04"},
            {text: 'May', value: "05"},
            {text: 'June', value: "06"},
            {text: 'July', value: "07"},
            {text: 'August', value: "08"},
            {text: 'September', value: "09"},
            {text: 'October', value: "10"},
            {text: 'November', value: "11"},
            {text: 'December', value: "12"},
        ];

        const {day, month, year} = this.state;
        
        return (
            <div>
                <Form.Field>
                    <label>{this.props.label}</label>
                </Form.Field>
                <Form.Group widths="equal">
                    <Form.Select fluid name="month" placeholder="Month"  value={month} onChange={this.handleChange} options={monthOptions}/>

                    <Form.Input fluid  name="day" placeholder="Day"  value={this.state.day} onChange={this.handleChange} />

                    <Form.Input fluid  name="year" placeholder="Year"  value={this.state.year} onChange={this.handleChange} />
                </Form.Group>
            </div>
        );
    }
}

export default DateTimeInput;