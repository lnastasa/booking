import React, { Component } from 'react';
import axios from 'axios'
import ClassList from './ClassList';

export default class AllClasses extends Component {

    constructor(props) {
        super(props);

        this.state = {
            classInfoLoaded : false
        };
    }

    componentDidMount() {
        this.loadClasses();
    }

    loadClasses = () => {
        let component  = this;
        axios.get('http://localhost:8080/classes')
            .then(function (response) {
                component.setState({
                    classes: response.data,
                    classInfoLoaded: true
                });
            })
    }

    render() {
        return (
            <div class="row col-12">
                {this.state.classInfoLoaded
                    ?
                      <ClassList classes={this.state.classes}/>
                    : <div>'Loading ....'</div>
                }
            </div>
        );
    }
}