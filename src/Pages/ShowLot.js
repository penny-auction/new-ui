import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from "../Components/Header/Header";
import {fetchLot, postBid, fetchLotBids} from "../utils/api";

class ShowLot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: '',
            item: null,
            bids: [],
            txid: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        postBid(this.props.match.params.id, this.state.txid)
            .then((responseJson) => {
                fetchLotBids(this.props.match.params.id).then((data) => {
                    this.setState({bids: data});
                });
                this.forceUpdate();
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
        fetchLot(this.props.match.params.id).then((data) => {
            this.setState({item: data});
        });
        fetchLotBids(this.props.match.params.id).then((data) => {
            this.setState({bids: data});
        });
    }

    render() {
        let bids;
        if (this.state.bids.length > 0) {
            bids = <div className='show-bids'>
                <span className="show-label label-big label-bids">Bids</span>
                <div id="cont" className="container card">
                    <table id="table" className="table">
                        <thead>
                        <tr>
                            <th id="1" scope="col">Depositor</th>
                            <th id="2" scope="col">Amount</th>
                            <th id="3" scope="col">Txid</th>
                        </tr>
                        </thead>
                        <tbody>
                        {

                            this.state.bids.map(function (x) {
                                return <tr>
                                    <td>{x.depositor_uid}</td>
                                    <td>{x.amount}$</td>
                                    <td>{x.txid}</td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        } else {
            bids = ''
        }

        return (
            this.state.item ?
                <div>
                    <Header/>
                    <div className='centered'>
                        <h1> {this.state.item.product_name} </h1>
                    </div>
                    <div className="show-container show-flex">
                        <div className="">
                            <img className="image big-photo" src={this.state.item.photo}/>
                        </div>
                        <div>
                            <div className="show-info">
                                <div>
                                    <span className="show-label label-big">Current Price: </span>
                                    <span className="show-price label-big"> {this.state.item.final_price}$ </span>
                                </div>
                                <form className="new-bid-form" onSubmit={this.handleSubmit}>
                                    To bid enter transaction id below
                                    <div className="float-label">
                                        <input placeholder={"Transaction Id"} id="txid" name="txid" type="text"
                                               onChange={this.onChange}/>
                                        <label htmlFor="txid" htmlFor="txid">Enter transaction id</label>
                                    </div>
                                    <button className="btn">Bid</button>
                                </form>
                            </div>
                        </div>
                        {bids}
                    </div>
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }
}

export default withRouter(ShowLot);
