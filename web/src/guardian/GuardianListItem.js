import React, { Component } from 'react';

export default class GuardianListItem extends Component {

    render() {
      return (
          <div class="row col-12">
              <span class="col-8">
                  {this.props.guardian.firstName} {this.props.guardian.lastName}
              </span>
          </div>
    );
  }
}