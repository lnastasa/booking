import React, { Component } from 'react';
import { Navigation } from 'react-router'
import axios from 'axios'
import NavBar from '../common/navbar'

export default class CreateParent extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        // Bind methods
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);

        // Error flags
        this.state = {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            email: '',

            firstNameEmpty: false,
            lastNameEmpty: false,
            phoneNumberEmpty: false,
            emailEmpty: false,
            createFailed: false
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.firstName === '') {
           this.setState({firstNameEmpty: true});
       } else {
            this.setState({firstNameEmpty: false});
       }

        if (this.state.lastName === '') {
              this.setState({lastNameEmpty: true});
          } else {
               this.setState({lastNameEmpty: false});
          }

        if (this.state.phoneNumber === '') {
            this.setState({phoneNumberEmpty: true});
        } else {
             this.setState({phoneNumberEmpty: false});
        }

      if (this.state.email === '') {
            this.setState({emailEmpty: true});
        } else {
             this.setState({emailEmpty: false});
        }

      if (this.state.firstName !== ''
            && this.state.lastName !== ''
            && this.state.phoneNumber !== ''
            && this.state.email !== '') {

        axios.post('http://localhost:8080/users',
            {
                type: 'PARENT',
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                phoneNumber: this.state.phoneNumber
            })
            .then(response => {
               this.props.history.push({
                  pathname:'/createChild',
                  state : {
                    parent: response.data
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
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Create Parent</span>
                </div>

                <form onSubmit={this.handleSubmit}>
                    {this.state.firstNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">First Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">First Name</label>
                        <input class="col-5" type="text" name="firstName" onChange={this.handleInputChange} />
                    </div>

                    {this.state.lastNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">Last Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">Last Name</label>
                        <input class="col-5" type="text" name="lastName" onChange={this.handleInputChange} />
                    </div>

                    {this.state.emailEmpty
                        ? <div class="alert alert-danger col-4" role="alert">Email must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">Email</label>
                        <input class="col-5" type="text" name="email" onChange={this.handleInputChange} />
                    </div>

                    {this.state.phoneNumberEmpty
                        ? <div class="alert alert-danger col-4" role="alert">Phone Number must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">Phone Number</label>
                        <input class="col-5" type="text" name="phoneNumber" onChange={this.handleInputChange} />
                    </div>

                    {this.state.createFailed
                        ? <div class="alert alert-danger col-4" role="alert">Unable to create parent</div>
                        : null
                    }
                    <div class="row">
                        <div class="col-3">&nbsp;</div>
                        <input class="col-2 btn btn-info" type="submit" value="Create"/>
                    </div>
                </form>
            </div>
        )
    }
}
