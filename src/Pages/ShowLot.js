import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'react-router-dom'
import LotList from "../Components/LotList/LotList";
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
        fetch('http://api.penny-auction.cf/lots/'+ this.props.match.params.id + '/bids', {
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
        fetch('http://api.penny-auction.cf/lots/'+ this.props.match.params.id , {
            mode: 'cors',
            headers: {
                "Access-Token": localStorage.getItem('penny-auction-token')
            }}).then((res)=>res.json().then((data)=>{
            this.setState({ item: data });
        }));
    }

    render() {
        return (
            this.state.item ?
            <div>
            <Header/>
                <div>
                    <div className="image">
                        <img className="image" src={this.state.item.img}/>
                    </div>
                    <div className="item_header">
                        {this.state.item.product_name}
                        <span className="price">
                        {this.state.item.final_price}$
                        <div className="start_price">
                            {this.state.item.start_price}$
                        </div>
                    </span>
                    </div>
                    <div >
                    <span className="tag">
                    {this.state.item.category.name}
                    </span>
                    </div>
                    <div className="description">
                        {this.state.item.product_description}
                    </div>
                </div>
                <label htmlFor="txid">Enter category id</label>
                <form className="new-bid-form" onSubmit={this.handleSubmit}>
                <input id="txid" name="txid" type="number"  onChange={this.onChange}/>
                </form>
            </div>
                : <div className="loader" id="loader-1"/>
        );
    }

}

export default withRouter(ShowLot);

