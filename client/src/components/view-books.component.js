import React, { Component } from "react";
import Book from './Book.component';
import { getBooksCurrentlyReading, getBooksRead, getBooksTBR } from '../actions/books';

class ViewBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booksCurrent: [],
      booksRead: [],
      booksTBR: [],
      coverView: false,
    }
    this.getAllBooks = this.getAllBooks.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  getAllBooks = async () => {
    const booksCurrent = await getBooksCurrentlyReading();
    const booksRead = await getBooksRead();
    const booksTBR = await getBooksTBR();

    this.setState({
      booksCurrent: booksCurrent,
      booksRead: booksRead,
      booksTBR: booksTBR
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  changeView() {
    this.setState({ coverView: !this.state.coverView });
  }


  render() {
    const { booksCurrent } = this.state;
    const { booksRead } = this.state;
    const { booksTBR } = this.state;
    return (
      <div>
        <button onClick={this.changeView.bind(this)}>switch view</button>
        <div className='currently-reading'>
          <h3>currently reading</h3>
          {booksCurrent.map((book) => (
            <Book key={book.volumeId} book={book} coverView={this.state.coverView} />
          ))}
        </div>

        <div className='tbr'>
          <h3>tbr</h3>
          {booksTBR.map((book) => (
            <Book key={book.volumeId} book={book} coverView={this.state.coverView} />
          ))}
        </div>

        <div className='read'>
          <h3>read</h3>
          {booksRead.map((book) => (
            <Book key={book.volumeId} book={book} coverView={this.state.coverView} />
          ))}
        </div>
      </div>
    );
  }
}

export default ViewBooks;
