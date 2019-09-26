import React, { Component } from "react";
import { withRouter } from 'react-router'

import axios from "axios";

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }
    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };
    onSubmit = (event) => {
        event.preventDefault();
        const URL_AUTHENTICATE = process.env.REACT_APP_API_AUTHENTICATE;
        console.log('hi')

        axios({
            method: 'post',
            url: URL_AUTHENTICATE,
            data: JSON.stringify(this.state),
            headers:{
                'Content-Type': 'application/json'}
             })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('token', res.data.token);
                    this.props.history.push({
                        pathname: '/postDriver',
                        state: { loggedIn: true }
                      });
                      console.log('hi')
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .catch(err => {
                console.error(err);
                alert('Error logging in please try again');
            });
    };
    render() {
        return (
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
                <label>Username</label>
                <input type="text"
                       name="username"
                       className="form-control"
                       placeholder="Enter username"
                       value={this.state.username}
                       onChange={this.handleInputChange}
                       required/>
            </div>
            <div className="form-group">
                <label>Password</label>
                <input type="password"
                       name="password"
                       className="form-control"
                       placeholder="Enter password"
                       value={this.state.password}
                       onChange={this.handleInputChange}
                       required/>
            </div>
            <button type="submit" value="Submit" className="btn btn-primary">Submit</button>
        </form>
        );
    }
}
export default withRouter(UserLogin);
