import React, { Component } from 'react';
import { Navigation } from 'react-router'
import axios from 'axios'

export default class CreateTeacher extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        //Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // Inputs
        this.state = {firstName: ''};
        this.state = {lastName: ''};
        this.state = {phoneNumber: ''};
        this.state = {email: ''};

        // Error flags
        this.state = {
            firstNameEmpty: false,
            lastNameEmpty: false,
            phoneNumber: false,
            emailEmpty: false,
            createFailed: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.firstName === undefined) {
           this.setState({firstNameEmpty: true});
       } else {
            this.setState({firstNameEmpty: false});
       }

        if (this.state.lastName === undefined) {
              this.setState({lastNameEmpty: true});
          } else {
               this.setState({lastNameEmpty: false});
          }

      if (this.state.phoneNumber === undefined) {
            this.setState({phoneNumberEmpty: true});
        } else {
             this.setState({phoneNumberEmpty: false});
        }

      if (this.state.email === undefined) {
            this.setState({emailEmpty: true});
        } else {
             this.setState({emailEmpty: false});
        }

      if (this.state.firstName !== undefined
            && this.state.lastName !== undefined
            && this.state.phoneNumber !== undefined
            && this.state.email !== undefined) {

        axios.post('http://localhost:8080/users',
            {
                type: 'TEACHER',
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber
            })
            .then(response => {
               this.props.history.push({
                  pathname:'/admin',
                  state : {
                    message: 'Teacher created successfully'
                  }
               })
            }).catch(error => {
                this.setState({createFailed: true});
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
                <div>Create Teacher</div>

                {this.state.firstNameEmpty
                    ? <div>First Name must not be empty</div>
                    : null
                }
                {this.state.lastNameEmpty
                    ? <div>Last Name must not be empty</div>
                    : null
                }
                {this.state.phoneNumberEmpty
                    ? <div>Phone Number must not be empty</div>
                    : null
                }
                {this.state.emailEmpty
                    ? <div>Email must not be empty</div>
                    : null
                }
                {this.state.createFailed
                    ? <div>Unable to create teacher</div>
                    : null
                }

                <form onSubmit={this.handleSubmit}>
                    <label>First Name:
                        <input type="text" name="firstName" onChange={this.handleInputChange} />
                    </label>
                     <label>Last Name:
                        <input type="text" name="lastName" onChange={this.handleInputChange} />
                    </label>
                    <label>Email:
                        <input type="text" name="email" onChange={this.handleInputChange} />
                    </label>
                    <label>Phone Number:
                        <input type="text" name="phoneNumber" onChange={this.handleInputChange} />
                    </label>
                  <input type="submit" value="Create"  />
                </form>
            </div>
        )
    }
}
