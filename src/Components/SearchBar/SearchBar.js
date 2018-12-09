import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          inputValue1: '',
          inputValue2: Infinity,
        };
        this.handleChange1 = this.handleChange1.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
    }
    handleChange1(event) {
      this.setState({
        inputValue1: event.target.value,
      });
    }
    handleChange2(event) {
      this.setState({
        inputValue2: event.target.value,
      });
    }
    search1(){
      let inputValue = this.state.inputValue1.toLowerCase();
      const regexp = `${inputValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`;
      let data = this.props.allItems;
      const result = data.filter(el => {
        return (el.product_name.toLowerCase().indexOf(regexp) !== -1
        || el.product_description.toLowerCase().indexOf(regexp) !== -1) && el.final_price < this.state.inputValue2;
      });
      this.props.searchItems(result);
    }
    search2(){
      let inputValue = this.state.inputValue2;
      let data = this.props.allItems;
      const result = data.filter(el => {
        return el.final_price <= inputValue;
      });
      this.props.searchItems(result);
    }
    componentDidMount(){
      console.log(this.props);
    }
    render () {
        let searchBlock = [
          <div className="search">
            <input
              type="text"
              name="question1"
              placeholder="Seacrh"
              autoComplete="off"
              onChange={this.handleChange1}
              value={this.state.inputValue1}
              className='input'
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.search1();
                }
              }}
            />
            <input
              type="number"
              name="question2"
              placeholder="Seacrh only by price"
              autoComplete="off"
              onChange={this.handleChange2}
              value={this.state.inputValue2}
              className='input'
              onKeyDown={(e) => {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  this.search2();
                }
              }}
            />
          </div>,
        ]
        return searchBlock;
    }
}

export default withRouter(SearchBar);
