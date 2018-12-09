import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import {withRouter} from 'react-router-dom'
import LotList from "../Components/LotList/LotList";
import Header from "../Components/Header/Header";
import { fetchLotsOfUser } from "../utils/api"

class MyLots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            items: null
        };
    }

    componentDidMount() {
        let token = localStorage.getItem('penny-auction-token');
        if (token) {
            this.setState({token: token});
            this.renderItems();
        } else {
            this.props.history.push('/');
        }
    }

    renderItems() {
        fetchLotsOfUser().then((data) => {
            this.setState({items: data});
        });
    }

    render() {
        return (
            this.state.items ?
                <div>
                    <Header/>
                    <h2>My Lots</h2>
                    <LotList items={this.state.items}/>
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }

}

export default withRouter(MyLots);
