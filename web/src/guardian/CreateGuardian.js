import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'

export default class CreateGuardian extends Component {

    mixins: [Navigation];

     constructor(props) {
        super(props);
        this.state = {
            // Child info
            child: this.props.location.state.child,

            // Fields
            firstName: '',
            lastName: '',

            // Error flags
            firstNameEmpty: false,
            lastNameEmpty: false,
            createFailed: false
        };

        // Bind methods
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

      if (this.state.firstName !== undefined
            && this.state.lastName !== undefined) {

        axios.post('http://localhost:8080/guardians',
            {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                childId: this.state.child.id
            })
            .then(response => {
               this.props.history.push({
                  pathname:'/child/' + this.state.child.id,
                  state : {
                    message: 'Guardian created successfully'
                  }
               })
            }).catch(error => {
                this.setState({createFailed: true});
            });
      }
   }


    render() {
        return (
            <div>
                <div>Create Guardian</div>

                {this.state.firstNameEmpty
                    ? <div>First Name must not be empty</div>
                    : null
                }
                {this.state.lastNameEmpty
                    ? <div>Last Name must not be empty</div>
                    : null
                }
                {this.state.createFailed
                    ? <div>Unable to create guardian</div>
                    : null
                }

                <form onSubmit={this.handleSubmit}>
                    <label>First Name:
                        <input type="text" name="firstName" onChange={this.handleInputChange} />
                    </label>
                     <label>Last Name:
                        <input type="text" name="lastName" onChange={this.handleInputChange} />
                    </label>
                  <input type="submit" value="Create" />
                </form>
            </div>
        );
 	}
}