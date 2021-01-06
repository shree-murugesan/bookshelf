import React, { Component } from "react";

import { addBook } from '../actions/books';

class SearchResultBook extends Component {

    constructor(props) {
        super(props);
        this.onClickAddBook = this.onClickAddBook.bind(this);
      }

    onClickAddBook(status) {
      console.log(`adding to ${status}: ${this.props.book.id}`);
      const {book} = this.props;
      const newBook = {
        volumeId: book.id,
        title: book.title,
        author: book.author,
        pageCount: book.numPages,
        coverLink: book.image,
        genres: 'Fiction',
        avgRating: book.avgRating,
        status: status
      };

      addBook(newBook);
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
        <button onClick={this.onClickAddBook.bind(this, 'Read')} >READ</button> 
        <button onClick={this.onClickAddBook.bind(this, 'Currently Reading')} >CURRENTLY READING</button> 
        <button onClick={this.onClickAddBook.bind(this, 'To Be Read')} >TO BE READ</button>
      </div>
    );
  }
}

export default SearchResultBook;
