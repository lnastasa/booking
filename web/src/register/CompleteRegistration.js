import React, { Component } from 'react';
import { Navigation } from 'react-router'
import axios from 'axios'

export default class CompleteRegistration extends Component {

    mixins: [Navigation];

     constructor(props) {
        super(props);

        this.state = {phoneNumber: ''};
        this.state = {password: ''};
        this.state = {passwordConfirm: ''};

        this.state = {
            phoneNumberEmpty: false,
            passwordEmpty: false,
            passwordConfirmEmpty: false,
            passwordMismatch: false,
            registerFailed: false
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

         if (this.state.phoneNumber === undefined) {
            this.setState({phoneNumberEmpty: true});
        } else {
             this.setState({phoneNumberEmpty: false});
        }

         if (this.state.password === undefined) {
            this.setState({passwordEmpty: true});
        } else {
             this.setState({passwordEmpty: false});
        }

         if (this.state.passwordConfirm === undefined) {
            this.setState({passwordConfirmEmpty: true});
        } else {
             this.setState({passwordConfirmEmpty: false});
        }

        if (this.state.password !== this.state.passwordConfirm) {
            this.setState({passwordMismatch: true});
        } else {
            this.setState({passwordMismatch: false});
        }

        if (this.state.phoneNumber !== undefined
            && this.state.password !== undefined
            && this.state.password === this.state.passwordConfirm) {

            axios.put('http://localhost:8080/users/register',
                {
                    phoneNumber: this.state.phoneNumber,
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
            <div>
                <div> Complete Registration</div>
                {this.state.phoneNumberEmpty
                    ? <div>Phone Number must not be empty</div>
                    : null
                }
                {this.state.passwordEmpty
                    ? <div>Password must not be empty</div>
                    : null
                }
                {this.state.passwordConfirmEmpty
                    ? <div>Confirmation Password must not be empty</div>
                    : null
                }
                {this.state.passwordMismatch
                    ? <div>Passwords must match</div>
                    : null
                }
                {this.state.registerFailed
                    ? <div>Registration Failed</div>
                    : null
                }

                <form onSubmit={this.handleSubmit}>
                    <label>Enter phone number your registration message was sent to:
                        <input type="text" name="phoneNumber" onChange={this.handleInputChange} />
                    </label>
                    <label>Password:
                        <input type="password" name="password" onChange={this.handleInputChange} />
                    </label>
                    <label>Confirm Password:
                        <input type="password" name="passwordConfirm" onChange={this.handleInputChange} />
                    </label>
                  <input type="submit" value="Register"  />
                </form>
            </div>
         )
    }
 }
