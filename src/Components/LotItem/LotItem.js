import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'

class LotItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (<div className="item">
                <div className="image">
                    <img className="image" alt="img" src={this.props.item.img}/>
                </div>
                <div className="item_header">
                    {this.props.item.product_name}
                    <span className="price">
                        {this.props.item.final_price}$
                        <div className="start_price">
                            {this.props.item.start_price}$
                        </div>
                    </span>
                </div>
                <div >
                    <span className="tag">
                    {this.props.item.category.name}
                    </span>
                </div>
                <div className="description">
                    {this.props.item.product_description}
                </div>
            </div>
        );
    }
}

export default withRouter(LotItem);