import React, { Component } from 'react';
import Header from './Components/Header/Header'

class Welcome extends Component {
    render() {
        return (
            <div className="hero">
                <Header/>
                <div className="heroimg">
                    {/*<img src="https://images.unsplash.com/photo-1511344506912-a2a2d4916354?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=92498ef1b05f6d75d1b6463d70151ff7&auto=format&fit=crop&w=1500&q=80" alt="Pixel Skincare"/>*/}
                </div>
                <div className="herotext">
                    <h1>Auctions<br/> Made simple</h1>
                    <a href="/secured" className="btn">Explore</a>
                </div>
            </div>
        );
    }
}
export default Welcome;