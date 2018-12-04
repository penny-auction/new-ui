import React, {Component} from 'react';
import LotItem from "../LotItem/LotItem";
import { withRouter } from 'react-router-dom'

class LotList extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render () {
        return (
            <div className="items">
                <div className="flex_row">
                    {
                        this.props.items.map(function(x) {
                            return <LotItem item={x} className="item"/>
                        })
                    }
                </div>
            </div>
        );
    }
}

export default withRouter(LotList);