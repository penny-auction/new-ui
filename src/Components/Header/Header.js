import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
           authenticated: false
        };
    }
    componentWillMount() {
        if (localStorage.getItem('penny-auction-token')) {
            this.setState({
                authenticated: true
            });
        }
    }
    render() {
        var nav;
        if (this.state.authenticated ) {
            nav =
                <ul className="header">
                <li><a href="/auction"><span>Auction</span></a></li>
                <li><a href="/my-lots"><span>My Lots</span></a></li>
                <li><a href="/new-lot"><span>New Lot</span></a></li>
            </ul>
        } else {
            nav = <ul className="header">
                    <li><a href="/"><span>Home</span></a></li>
                </ul>
        }
        return (
            <div>
                <header>
                    {nav}
                </header>
            </div>
        );
    }
}

export default withRouter(Header);
