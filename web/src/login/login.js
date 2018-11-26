import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'

export default class Login extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);
        this.state = {email: ''};
        this.state = {password: ''};
        this.state = {loginFailed: false};
        this.state = {emailEmpty: false};
        this.state = {passwordEmpty: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.email === undefined) {
            this.setState({emailEmpty: true});
        } else {
             this.setState({emailEmpty: false});
        }

        if (this.state.password === undefined) {
            this.setState({passwordEmpty: true});
        } else {
            this.setState({passwordEmpty: false});
        }

        if (this.state.email !== undefined && this.state.password !== undefined) {
            axios.post('http://localhost:8080/security',
                {
                    email: this.state.email,
                    password: this.state.password
                })
                .then(response => {
                    alert(response.status);
                    var user = response.data;
                    if (user.type === 'ADMINISTRATOR') {
                        this.props.history.push('/admin')
                    }
                }).catch(error => {
                    alert(error);
                    this.setState({loginFailed: true});
                });
        }
    }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    render() {
        return (
            <div>
                {this.state.loginFailed
                    ? <div>Email or Password is incorrect</div>
                    : null
                }
                {this.state.emailEmpty
                    ? <div>Email must not be empty</div>
                    : null
                }
                {this.state.passwordEmpty
                    ? <div>Password must not be empty</div>
                    : null
                }
                <form onSubmit={this.handleSubmit}>
                    <label>Email:
                        <input type="text" name="email" onChange={this.handleInputChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" onChange={this.handleInputChange} />
                    </label>
                  <input type="submit" value="Login"  />
                </form>
            </div>
        );
  }
}