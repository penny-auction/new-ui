import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import LotList from "../Components/LotList/LotList";
import Header from "../Components/Header/Header";
import SearchBar from "../Components/SearchBar/SearchBar";
import {fetchLots} from "../utils/api";

class Auction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            items: null,
            allItems: null,
        };
        this.searchItems = this.searchItems.bind(this);
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

    searchItems(data) {
        this.setState({items: data});
    }

    renderItems() {
        fetchLots().then((data) => {
            const result = data.filter(el => el.category !== null);
            this.setState({items: result, allItems: result});
        });
    }

    render() {
        return (
            this.state.items ?
                <div>
                    <Header/>
                    <SearchBar searchItems={this.searchItems} items={this.state.items} allItems={this.state.allItems}/>
                    <h2>Auction</h2>
                    <LotList items={this.state.items}/>
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }

}

export default withRouter(Auction);
