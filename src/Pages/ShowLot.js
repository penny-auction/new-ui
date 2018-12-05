import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import {withRouter} from 'react-router-dom'
import Header from "../Components/Header/Header";

class ShowLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            item: null,
            txid: ''
        };
        console.log(this.props)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.state)
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state)
        fetch('http://api.penny-auction.cf/lots/' + this.props.match.params.id + '/bids', {
            method: 'POST',

            body: JSON.stringify({
                txid: this.state.txid
            }),
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Access-Token": localStorage.getItem('penny-auction-token')
            }
        });
    }

    componentDidMount() {
        let token = localStorage.getItem('penny-auction-token');
        if (token) {
            this.setState({token: token});
            this.renderItem();
        } else {
            this.props.history.push('/');
        }
    }

    renderItem() {
        fetch('http://api.penny-auction.cf/lots/' + this.props.match.params.id, {
            mode: 'cors',
            headers: {
                "Access-Token": localStorage.getItem('penny-auction-token')
            }
        }).then((res) => res.json().then((data) => {
            this.setState({item: data});
        }));
    }

    render() {
        let tag
        if (this.state.item && this.state.item.category.name) {
            tag = <span className="tag">
                    {this.state.item.category.name}
                    </span>

        } else {
            tag = ''
        }
        return (
            this.state.item ?
                <div>
                    <Header/>
                    <div className="show-container show-flex">
                        <div className="">
                            <img className="image" src={this.state.item.photo}/>
                        </div>
                        <div>
                        <div className="show-info">
                            <div>
                                <span className="show-label"> Name: </span>{this.state.item.product_name}
                            </div>
                            <div>
                                <span className="show-label">Current Price: </span>
                                <span className="show-price"> {this.state.item.final_price}$ </span>
                            </div>
                            <div>
                                <span className="show-label">Start Price: </span> {this.state.item.start_price}$
                            </div>
                            <div>
                                {tag}
                            </div>

                            <div>
                                <span className="show-label">Description: </span> {this.state.item.product_description}
                            </div>

                        </div>
                    </div>
                    </div>

                    <form className="new-bid-form" onSubmit={this.handleSubmit}>
                        <div className="float-label">
                        <input placeholder={"Transaction Id"} id="txid" name="txid" type="number" onChange={this.onChange}/>
                        <label for="txid" htmlFor="txid">Enter category id</label>
                        </div>
                        <button className="btn">Bid</button>
                    </form>
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }
}

export default withRouter(ShowLot);
