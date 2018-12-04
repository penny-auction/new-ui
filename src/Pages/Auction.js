import React, {Component} from 'react';
import fetch from 'isomorphic-unfetch'
import { withRouter } from 'react-router-dom'
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
        fetch('http://localhost:8080/lots', {
            mode: 'cors',
            headers: {
                "Access-Token":"eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMiwicHJlZmVycmVkX3VzZXJuYW1lIjoia2VrIn0.lVOalnggcln_P3PxjbpNxNcWO-Fx-VuaezQM6zpuLk0UE-2XwaNF5sY0ypPTSnOtJumcQ2-1oWg5IUh-d6heImZrdIJ7VUq2_7MlEvHMySwnQgUvDYaK0II0uykSFYuP5HuFkPBXLz9uOMdy2hEMbA5iBpxuzYc4tpc7vlZH2Us"
            }}).then((res)=>res.json().then((data)=>{
            this.setState({ items: data });
        }));
    }

    render() {
        return (
            this.state.items ?
                <div>
                    <Header/>
                    <LotList items={this.state.items} />
                </div>
                : <div className="loader" id="loader-1"/>
        );
    }

}

export default withRouter(Auction);
