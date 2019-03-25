import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class UserListItem extends Component {

    render() {
      return (
          <div class="row col-12">
            {this.props.user.type === 'TEACHER' 
              ?
                <span class="col-12">
                    <Link to={{
                        pathname:'/teacher/' + this.props.user.id,
                        state : { user: this.props.user }
                    }}>{this.props.user.firstName} {this.props.user.lastName}</Link>
                </span>
              :
                ''
            }
            {this.props.user.type === 'PARENT' 
              ?
                <span class="col-12">
                    <Link to={{
                        pathname:'/parent/' + this.props.user.id,
                        state : { user: this.props.user }
                    }}>{this.props.user.firstName} {this.props.user.lastName}</Link>
                </span>
              :
                ''
            }
          </div>
    );
  }
}