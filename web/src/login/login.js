import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'

export default class Login extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);
        this.state = {
            message: this.props.location.state.message,

            email: '',
            password: '',

            loginFailed: false,
            emailEmpty: false,
            passwordEmpty: false
        };

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
                    var user = response.data;
                    this.setState({user: user});
                    if (user.type === 'ADMINISTRATOR') {
                        this.props.history.push({
                           pathname:'/admin',
                           state : { user: user }
                        })
                    }
                    if (user.type === 'TEACHER') {
                        this.props.history.push({
                           pathname:'/teacher',
                           state : { user: user }
                        })
                    }
                }).catch(error => {
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
                {this.state.message !== undefined
                    ? <div>{this.state.message}</div>
                    : null
                }
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