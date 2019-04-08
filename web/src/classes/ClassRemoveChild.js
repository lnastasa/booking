import React, { Component } from 'react';
import axios from 'axios'
import { Navigation } from 'react-router'
import renderLoadWait from '../common/loadUtil';
import NavBar from '../common/navbar'

export default class ClassRemoveChild extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        this.state = {
            loaded : false,
            classEmpty: false,
            createFailed: false,

            childrenToRemove: [],

            classId: this.props.match.params.id
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        let component  = this;
        axios.get('http://localhost:8080/classes/' + this.props.match.params.id + '/children')
            .then(function (response) {
                component.setState({
                    childList: response.data,
                    loaded: true
                })
            });
    }

    handleRadioInputChange(event) {
        if (this.state.childrenToRemove.includes(event.target.value)) {
            delete this.state.childrenToRemove[this.state.childrenToRemove.indexOf(event.target.value)]
        } else {
            this.state.childrenToRemove.push(event.target.value)
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.put('http://localhost:8080/classes/' + this.state.classId + '/removeChildren', this.state.childrenToRemove)
            .then(response => {
                this.props.history.push({
                    pathname:'/class/' + this.props.match.params.id
                })
            }).catch(error => {
            this.setState({createFailed: true});
        });
    }

    render() {
        return (
            <div id="component_root" class="col-12">
                <NavBar/>
                <div class="row page_label">
                    <span class="display-4">Remove child from class</span>
                </div>
                {
                    this.state.loaded ?
                        <form onSubmit={this.handleSubmit}>

                            {this.state.classEmpty
                                ? <div class="alert alert-danger col-4" role="alert">Please select children to be removed</div>
                                : null
                            }
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
                                ? <div class="alert alert-danger col-4" role="alert">Unable to remove children from class</div>
                                : null
                            }
                            <div class="row">
                                <div class="col-3">&nbsp;</div>
                                <input class="col-2 btn btn-info" type="submit" value="Remove Children"/>
                            </div>

                        </form>
                        : renderLoadWait()
                }
            </div>
        );
    }
}