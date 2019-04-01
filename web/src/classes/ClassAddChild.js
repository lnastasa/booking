import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class ClassAddChild extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        this.state = {
            loaded : false,
            classEmpty: false,

            childrenInClass: [],

            createFailed: false
        };
    }

    componentDidMount() {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + this.props.match.params.id + '/unassigned')
        .then(function (response) {
            component.setState({
                childList: response.data,
                loaded: true
            })
        });
    }

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Add child to class</span>
                </div>
                {
                    this.state.loaded
                        ? this.renderForm()
                        : renderLoadWait()
                }
            </div>
        );
    }

    handleRadioInputChange(event) {
        if (this.state.childrenInClass.includes(event.target.value)) {
            delete this.state.childrenInClass[this.state.childrenInClass.indexOf(event.target.value)]
        } else {
            this.state.childrenInClass.push(event.target.value)
        }
    }

    renderForm() {
        return <form onSubmit={this.handleSubmit}>

            {this.state.classEmpty
                ? <div class="alert alert-danger col-4" role="alert">Please add children to the class</div>
                : null
            }
            <div class="row">
                <label class="col-3">Children</label>
            </div>
            <div>
                <div class="col-5">
                    {this.state.childList.map(function (child, index) {
                        return <div class="row col-12"><label><input type="checkbox" name="child.{child.id}"
                                                                     value={child.id}
                                                                     onChange={this.handleRadioInputChange.bind(this)}/>&nbsp;{child.firstName + ' ' + child.lastName}
                        </label></div>;
                    }, this)}
                </div>
            </div>

            {this.state.createFailed
                ? <div class="alert alert-danger col-4" role="alert">Unable to add children to class</div>
                : null
            }
            <div class="row">
                <div class="col-3">&nbsp;</div>
                <input class="col-2 btn btn-info" type="submit" value="Create"/>
            </div>

        </form>
    }
}