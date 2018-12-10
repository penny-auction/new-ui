import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Header from "../Components/Header/Header";
import {postLot} from '../utils/api';

class NewLot extends Component {
    constructor() {
        super();
        this.state = {
            product_name: '',
            start_price: 0,
            product_description: '',
            category_id: 0,
            photo: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        let token = localStorage.getItem('penny-auction-token');
        if (!token) {
            this.props.history.push('/');
        }
    }

    onChange(e) {
        console.log('change');
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        postLot(this.state.product_name,
                this.state.start_price,
                this.state.product_description,
                this.state.category_id,
                this.state.photo)
            .then((responseJson) => {
                this.props.history.push('/my-lots');
            });
    }

    render() {
        return (
            <div>
                <Header/>
                <form className="new-lot-form" id="new-lot-form" onSubmit={this.handleSubmit}>

                    <div className="float-label">

                        <input placeholder={"Start Price"} id="start_price" name="start_price" type="number"
                               onChange={this.onChange}/>
                        <label htmlFor="start_price">Enter start price</label>
                    </div>
                    <div className="float-label">
                        <input placeholder={"Product Name"} id="product_name" name="product_name" type="text"
                               onChange={this.onChange}/>
                        <label htmlFor="product_name">Enter product name</label>
                    </div>

                    <div className="float-label">

                        <input placeholder={"Product Description"} id="product_description" name="product_description"
                               type="text" onChange={this.onChange}/>
                        <label htmlFor="product_description">Enter product description</label>
                    </div>
                    <div className="float-label">
                        <input placeholder={"Category Id"} id="category_id" name="category_id" type="number"
                               onChange={this.onChange}/>
                        <label htmlFor="category_id">Enter category id</label>
                    </div>
                    <div className="float-label">
                        <input placeholder={"Photo"} id="photo" name="photo" type="text" onChange={this.onChange}/>
                        <label htmlFor="photo">Enter category id</label>
                    </div>
                    <button type="submit" form="new-lot-form" className="btn">Create lot</button>
                </form>
            </div>
        );
    }
}

export default withRouter(NewLot);
