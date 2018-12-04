import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Keycloak from 'keycloak-js';

class Secured extends Component {

    constructor(props) {
        super(props);
        this.state = { keycloak: null, authenticated: false };
    }

    componentDidMount() {
        const keycloak = Keycloak({
            url: 'http://identity.penny-auction.cf/auth',
            realm: 'master',
            clientId: 'penny-auction-ui-public',
        });
        keycloak.init({onLoad: 'login-required'}).then(authenticated => {
            this.setState({ keycloak: keycloak, authenticated: authenticated })
            localStorage.setItem('penny-auction-token', keycloak.token)
        })
    }

    render() {
        if (this.state.keycloak) {
            if (this.state.authenticated) return (
                <div>
                    <Redirect to='/auction' auth={true}/>
                </div>
            ); else return (<div>Unable to authenticate!</div>)
        }
        return (
            <div className="loader" id="loader-1"/>
        );
    }
}
export default Secured;