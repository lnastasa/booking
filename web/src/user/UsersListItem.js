import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserListItem extends Component {

    render() {
      return (
          <div>
            {this.props.user.type === 'TEACHER' 
              ?
                <Link to={{
                    pathname:'/teacher/' + this.props.user.id,
                    state : { user: this.props.user }
                }}>{this.props.user.firstName} {this.props.user.lastName}</Link>
              :
                ''
            }
            {this.props.user.type === 'PARENT' 
              ?
                <Link to={{
                    pathname:'/parent/' + this.props.user.id,
                    state : { user: this.props.user }
                }}>{this.props.user.firstName} {this.props.user.lastName}</Link>
              :
                ''
            }
          </div>
    );
  }
}