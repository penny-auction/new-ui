import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import {withRouter} from 'react-router-dom'
import LotList from "../Components/LotList/LotList";
import Header from "../Components/Header/Header";

class Auction extends Component {
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
        fetch('http://api.penny-auction.cf/lots', {
            mode: 'cors',
            headers: {
                "Access-Token": localStorage.getItem('penny-auction-token')
            }
        }).then((res) => res.json().then((data) => {
            this.setState({items: data});
        }));
    }

    render() {
        return (
            this.state.items ?
                <div>
                    <Header/>
                    <LotList items={this.state.items}/>
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }

}

export default withRouter(Auction);
