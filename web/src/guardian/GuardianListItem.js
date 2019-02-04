import React, { Component } from 'react';

export default class GuardianListItem extends Component {

    render() {
      return (
          <div>
            {this.props.guardian.firstName} {this.props.guardian.lastName}
          </div>
    );
  }
}