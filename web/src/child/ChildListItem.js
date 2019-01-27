import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ChildListItem extends Component {

    render() {
      return (
          <div>
            <Link to={{
                pathname:'/child/' + this.props.child.id
            }}>{this.props.child.firstName} {this.props.child.lastName}</Link>
          </div>
    );
  }
}