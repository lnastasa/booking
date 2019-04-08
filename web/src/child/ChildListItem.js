import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { Navigation } from 'react-router'

export default class ChildListItem extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props)

        this.state = {
            classId : this.props.classId
        };
    }

    render() {
      return (
          <div class="row col-12">
            <span class="col-6"><Link to={{
                pathname:'/child/' + this.props.child.id
                }}>{this.props.child.firstName} {this.props.child.lastName}</Link>
            </span>
          </div>
    );
  }
}