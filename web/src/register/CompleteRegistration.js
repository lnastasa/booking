import React, { Component } from 'react';
import { Navigation } from 'react-router'
import axios from 'axios'

export default class CompleteRegistration extends Component {

    mixins: [Navigation];

     constructor(props) {
        super(props);

        this.state = {
            password: '',
            passwordConfirm: '',

            passwordEmpty: false,
            passwordConfirmEmpty: false,
            passwordMismatch: false,
            registerFailed: false,

            userId : this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
     }

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }

    handleSubmit(event) {
         event.preventDefault();

         if (this.state.password === '') {
            this.setState({passwordEmpty: true});
        } else {
             this.setState({passwordEmpty: false});
        }

         if (this.state.passwordConfirm === '') {
            this.setState({passwordConfirmEmpty: true});
        } else {
             this.setState({passwordConfirmEmpty: false});
        }

        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({passwordMismatch: true});
        } else {
            this.setState({passwordMismatch: false});
        }

        if (this.state.password !== ''
            && this.state.password === this.state.passwordConfirm) {

            axios.put('http://localhost:8080/users/register',
                {
                    userId: this.state.userId,
                    password: this.state.password
                })
                .then(response => {
                   this.props.history.push({
                      pathname:'/',
                      state : {
                        message: 'Registration successful'
                      }
                   })
                }).catch(error => {
                    this.setState({registerFailed: true});
                });
        }
    }

     render() {
        return (
            <div id="component_root">
                <div class="row page_label">
                    <span class="display-4">Complete Registration</span>
                </div>

                {this.state.registerFailed
                    ? <div class="alert alert-danger col-4" role="alert">Registration Failed</div>
                    : null
                }

                <form onSubmit={this.handleSubmit}>

                     {this.state.passwordEmpty
                         ? <div class="alert alert-danger col-4" role="alert">Password must not be empty</div>
                        : null
                     }
                    <div class="row">
                        <label class="col-3">Password</label>
                        <input class="col-5" type="password" name="password" onChange={this.handleInputChange} />
                    </div>

                     {this.state.passwordConfirmEmpty
                         ? <div class="alert alert-danger col-4" role="alert">Confirmation Password must not be empty</div>
                         : null
                     }
                    <div class="row">
                        <label class="col-3">Confirm Password</label>
                        <input class="col-5" type="password" name="passwordConfirm" onChange={this.handleInputChange} />
                    </div>

                     {this.state.passwordMismatch
                         ? <div class="alert alert-danger col-4" role="alert">Passwords must match</div>
                        : null
                     }
                     <div class="row">
                        <input class="col-2 btn btn-info" type="submit" value="Register"/>
                     </div>
                </form>
            </div>
         )
    }
 }
