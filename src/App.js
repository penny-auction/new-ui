import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Welcome from './Welcome';
import Secured from './Secured';
import Auction from './Pages/Auction'
import MyLots from './Pages/MyLots'
import NewLot from './Pages/NewLot'
import './App.css';

class App extends Component {

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Route exact path="/" component={Welcome} />
                    <Route path="/secured" component={Secured} />
                    <Route path="/auction" component={Auction} />
                    <Route path="/my-lots" component={MyLots} />
                    <Route path="/new-lot" component={NewLot} />
                </div>
            </BrowserRouter>
        );
    }
}
export default App;
