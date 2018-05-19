import React, {Component} from 'react';
import { Form, Input } from 'semantic-ui-react';


class DateTimeInput extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            day: "",
            month: "",
            year: "",
            minute: "",
            hour: "",
            meri: "AM"
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

    handleTimeChange = (e, {name, value}) => {
        this.setState({ [name]: value }, () => {
            var hour = this.state.hour;
            if (this.state.meri == "PM") { 
                hour = (parseInt(hour) + 12).toString(); 
                this.setState({hour: hour});
            }
            var time = {
                name: this.props.timeName,
                value: hour + ":" + this.state.minute
            }
            this.props.handleChange(e, time);
        })
    }

    render() {
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

        const meriOptions = [
            {text: "AM", value: "AM"},
            {text: "PM", value: "PM"}
        ]

        let hours = ['01','02','03','04','05','06','07','08','09','10','11','12',];
        let hourOptions = hours.map((elem) => {
            return ({text: elem, value: elem});
        })

        const {day, month, year, minute, hour, meri} = this.state;
        let timeField = null;

        if(this.props.time) {
            timeField = (
                <Form.Group widths="equal">
                    <Form.Select fluid name="hour" placeholder="Hour"  value={hour} onChange={this.handleTimeChange} options={hourOptions}/>

                    <Form.Input fluid  name="minute" placeholder="Minutes"  value={this.state.minute} onChange={this.handleTimeChange} />

                    <Form.Select fluid  name="meri" placeholder="AM"  value={this.state.meri} onChange={this.handleTimeChange} options={meriOptions} />
                </Form.Group>
            )
        }
        
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
                {timeField}
            </div>
        );
    }
}

export default DateTimeInput;