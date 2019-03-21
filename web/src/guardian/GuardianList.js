import React, { Component } from 'react';
import GuardianListItem from './GuardianListItem';

export default class GuardianList extends Component {

    render() {
        return (
            <div class="row col-12">
                {
                    this.props.guardians.length === 0
                    ?
                        <div class="row col-12">
                            <span class="col-6">
                                No guardians assigned
                            </span>
                        </div>
                    :
                        <ul>
                            {
                                this.props.guardians.map(function (guardian, index) {
                                    return <li>
                                        <GuardianListItem guardian={guardian}/>
                                    </li>;
                                })
                            }
                        </ul>
                }
            </div>
        );
    }
}