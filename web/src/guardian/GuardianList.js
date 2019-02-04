import React, { Component } from 'react';
import GuardianListItem from './GuardianListItem';

export default class GuardianList extends Component {

    render() {
        return (
            <div>
                {
                    this.props.guardians.length === 0
                    ?
                        null
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