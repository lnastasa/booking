import React, { Component } from 'react';
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';

export default class CreateTeacher extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);
        this.state = {user: this.props.location.state.user};

        // Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // Inputs
        this.state = {firstName: ''};
        this.state = {lastName: ''};
        this.state = {email: ''};

        // Error flags
        this.state = {firstNameEmpty: false};
        this.state = {lastNameEmpty: false};
        this.state = {emailEmpty: false};
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

      if (this.state.email === undefined) {
            this.setState({emailEmpty: true});
        } else {
             this.setState({emailEmpty: false});
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
                {this.state.emailEmpty
                    ? <div>Email must not be empty</div>
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
                  <input type="submit" value="Create"  />
                </form>
            </div>
        )
    }
}
