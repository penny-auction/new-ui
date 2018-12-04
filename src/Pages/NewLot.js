import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'react-router-dom'
import Header from "../Components/Header/Header";

class NewLot extends Component {constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
}

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        fetch('http://localhost:8080/lots', {
            method: 'POST',
            body: data,
            mode: 'cors',
            headers: {
                "Access-Token":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwicHJlZmVycmVkX3VzZXJuYW1lIjoia2VrIn0.lVOalnggcln_P3PxjbpNxNcWO-Fx-VuaezQM6zpuLk0UE-2XwaNF5sY0ypPTSnOtJumcQ2-1oWg5IUh-d6heImZrdIJ7VUq2_7MlEvHMySwnQgUvDYaK0II0uykSFYuP5HuFkPBXLz9uOMdy2hEMbA5iBpxuzYc4tpc7vlZH2Us"
            }
        });
    }

    render() {
        return (
            <div>
                <Header/>
            <form className="new-lot-form" onSubmit={this.handleSubmit}>
                <label htmlFor="user_uid">Enter uid</label>
                <input id="user_uid" name="user_uid" type="string" />

                <label htmlFor="start_price">Enter start price</label>
                <input id="start_price" name="start_price" type="number" />

                <label htmlFor="product_name">Enter product name</label>
                <input id="product_name" name="product_name" type="text" />

                <label htmlFor="product_description">Enter product description</label>
                <input id="product_description" name="product_description" type="text" />

                <label htmlFor="category_id">Enter category id</label>
                <input id="category_id" name="category_id" type="number" />

                <button>Send data!</button>
            </form>
            </div>
        );
    }

}

export default withRouter(NewLot);