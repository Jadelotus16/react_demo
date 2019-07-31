import React, {Component} from 'react';

class Form extends Component {
    constructor(props) {
        super(props);
        this.inisialState = {
            name: '',
            job: ''
        };
        this.state = this.inisialState;
    }

    handleChange = event => {
        const {name, value} = event.target;

        this.setState({
            [name]: value
        })
    }
    onFormSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
        this.setState(this.initialState);
    }

    render() {
        const {name, job} = this.state;
        return (
            <form onSubmit={this.onFormSubmit}>
                <label>name</label>
                <input type="text" name="name" value={name} onChange={this.handleChange}/>
                <label>Job</label>
                <input type="text" name="job" value={job} onChange={this.handleChange}/>
                <button type="submit">Submit</button>
            </form>
        )
    }
}

export default Form;
