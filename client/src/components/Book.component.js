import React, { Component } from "react";

import { updateBook } from '../actions/books';

class Book extends Component {

    constructor(props) {
        super(props);
        this.onUpdateStatus = this.onUpdateStatus.bind(this);
    }

    onUpdateStatus = async (newStatus) => {
      let book = this.props.book;
      console.log(`Updating ${book.volumeId} to ${newStatus} status`);
      book.status = newStatus;
      await updateBook(book._id, book);
      this.props.refreshCallback();
    }

    render() {
      const {book} = this.props;
    return (
      <div>
        <img alt='' src={book.coverLink} /> <br />
        {book.title} <br/>
        {book.author} <br/>
        {book.avgRating} <br/>
        {book.numPages} <br/>
        <button onClick={this.onUpdateStatus.bind(this, 'Read')}>FINISHED</button>
        <button onClick={this.onUpdateStatus.bind(this, 'To Be Read')}>STOPPED</button>
      </div>
    );
  }
}

export default Book;
