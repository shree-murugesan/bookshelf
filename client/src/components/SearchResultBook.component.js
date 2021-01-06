import React, { Component } from "react";

class SearchResultBook extends Component {

    constructor(props) {
        super(props);

        this.onClickRead = this.onClickRead.bind(this);
        this.onClickCurrRead = this.onClickCurrRead.bind(this);
        this.onClickToBeRead = this.onClickToBeRead.bind(this);
      }

    onClickRead() {
      console.log(`adding to read: ${this.props.book.id}`);
    }

    onClickCurrRead() {
      console.log(`adding to curr: ${this.props.book.id}`);
    }

    onClickToBeRead() {
      console.log(`adding to tbr: ${this.props.book.id}`);
    }

  render() {
      const {book} = this.props;
    return (
      <div>
        <img alt='' src={book.image} /> <br />
        {book.title} <br/>
        {book.author} <br/>
        {book.desc} <br/>
        {book.avgRating} <br/>
        {book.numPages} <br/>
        <button onClick={this.onClickRead} >READ</button> 
        <button onClick={this.onClickCurrRead} >CURRENTLY READING</button> 
        <button onClick={this.onClickToBeRead} >TO BE READ</button>
      </div>
    );
  }
}

export default SearchResultBook;
