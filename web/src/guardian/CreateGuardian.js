import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'
import NavBar from '../common/navbar'

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

      if (this.state.firstName !== ''
            && this.state.lastName !== '') {

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
            <div id="component_root" class="col-12">
                <NavBar/>

                <div class="row page_label">
                    <span class="display-4">Create Guardian</span>
                </div>

                <form onSubmit={this.handleSubmit}>

                    {this.state.firstNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">First Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">First Name</label>
                        <input class="col-5"  type="text" name="firstName" onChange={this.handleInputChange} />
                    </div>

                    {this.state.lastNameEmpty
                        ? <div class="alert alert-danger col-4" role="alert">Last Name must not be empty</div>
                        : null
                    }
                    <div class="row">
                        <label class="col-3">Last Name</label>
                        <input class="col-5"  type="text" name="lastName" onChange={this.handleInputChange} />
                    </div>

                    {this.state.createFailed
                        ? <div class="alert alert-danger col-4" role="alert">Unable to create guardian</div>
                        : null
                    }
                    <div class="row">
                        <div class="col-3">&nbsp;</div>
                        <input class="col-2 btn btn-info" type="submit" value="Create" />
                    </div>
                </form>
            </div>
        );
 	}
}