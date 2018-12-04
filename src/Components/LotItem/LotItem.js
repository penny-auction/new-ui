import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom'

class LotItem extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        let tag
        if (this.props.item.category.name) {
             tag = <span className="tag">
                    {this.props.item.category.name}
                    </span>

        } else {
            tag = ''
        }
        return (
            <Link to={"/lot/"+this.props.item.id } className="item">
            <div>
                <div className="image">
                    <img className="image" src={this.props.item.photo}/>
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
                    {tag}
                </div>
                <div className="description">
                    {this.props.item.product_description}
                </div>
            </div>
            </Link>
        );
    }
}

export default withRouter(LotItem);