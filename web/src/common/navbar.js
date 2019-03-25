import React, { Component } from 'react';
import { Navigation } from 'react-router'
import {Link} from 'react-router-dom';

export default class NavBar extends Component {

    mixins: [Navigation];

    constructor(props) {
        super(props);

        this.state = {
            user: window.store.getState().user
        }
    }

    render() {
        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light bottom-spacer-10">
                <Link to={{
                    pathname:'/' + this.state.user.type.toLowerCase()
                }}>
                    <svg id="i-home" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentcolor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                        <path d="M12 20 L12 30 4 30 4 12 16 2 28 12 28 30 20 30 20 20 Z" />
                    </svg>
                </Link>

                <div class="navbar-collapse collapse w-100 order-3 dual-collapse2">
                    <ul class="navbar-nav ml-auto">
                        <li class="nav-item">
                            <a class="nav-link" href="http://localhost:3000">
                                <span>{this.state.user.firstName}, Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    };



}