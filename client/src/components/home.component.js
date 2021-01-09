import React, { Component } from "react";
import Book from './Book.component';
import { getBooksCurrentlyReading } from '../actions/books';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
    this.refreshCallback = this.refreshCallback.bind(this);
    this.getCurrentBooks = this.getCurrentBooks.bind(this);
  }

  getCurrentBooks = async () => {
    const books = await getBooksCurrentlyReading();
    this.setState({ books: books });
  }

  componentDidMount() {
    this.getCurrentBooks();
  }

  refreshCallback() {
    console.log('refreshing');
    this.getCurrentBooks();
  }

  render() {
    const { books } = this.state;
    if (books.length === 0) {
      return (
        <div>
          <h2>Currently Not Reading Anything</h2>
        </div>
      );
    } else {
      return (
        <div>
          <h2>Currently Reading These Books</h2>

          {books.map((book) => (
            <Book key={book.volumeId} book={book} refreshCallback={this.refreshCallback} />
          ))}
        </div>
      );
    }
  }
}

export default Home;
