import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class ClassListItem extends Component {

    render() {
      return (
          <div class="row col-12">
            <Link to={{
                pathname:'/class/' + this.props.class.id
            }}>{this.props.class.name}</Link>
          </div>
    );
  }
}