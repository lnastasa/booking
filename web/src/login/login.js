import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'

export default class Login extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',

            loginFailed: false,
            emailEmpty: false,
            passwordEmpty: false,

            message : this.props.location.state !== undefined && this.props.location.state.message !== undefined ? this.props.location.state.message : undefined
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.email === "") {
            this.setState({emailEmpty: true});
        } else {
             this.setState({emailEmpty: false});
        }

        if (this.state.password === "") {
            this.setState({passwordEmpty: true});
        } else {
            this.setState({passwordEmpty: false});
        }

        if (this.state.email !== "" && this.state.password !== "") {
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
                    if (user.type === 'PARENT') {
                        this.props.history.push({
                           pathname:'/parent',
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
            <div class="jumbotron row col-10 offset-2">
                {this.state.message !== undefined
                    ? <div class="alert alert-primary" role="alert">{this.state.message}</div>
                    : null
                }

                <form class="row col-12" onSubmit={this.handleSubmit}>

                    {this.state.loginFailed
                        ? <div class="alert alert-danger" role="alert">Email or Password is incorrect</div>
                    : null
                    }
                    {this.state.emailEmpty
                        ? <div class="alert alert-danger" role="alert">Email must not be empty</div>
                    : null
                    }

                    <div class="row col-12">
                        <label class="col-2">Email:</label>
                        <input class="col-8" type="text" name="email" onChange={this.handleInputChange} />
                    </div>

                    {this.state.passwordEmpty
                        ? <div class="alert alert-danger" role="alert">Password must not be empty</div>
                    : null
                    }

                    <div class="row col-12">
                        <label class="col-2">Password:</label>
                        <input class="col-8" type="password" name="password" onChange={this.handleInputChange} />
                    </div>
                    <div class="row col-12 top-spacer-10">
                        <div class="col-2">&nbsp;</div>
                        <input class="col-2 btn btn-info" type="submit" value="Login"  />
                    </div>
                </form>
            </div>
        );
  }
}