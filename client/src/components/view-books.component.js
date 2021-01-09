import React, { Component } from "react";
import Book from './Book.component';
import { Button } from '@material-ui/core';
import { getBooksCurrentlyReading, getBooksRead, getBooksTBR } from '../actions/books';

const style = {
  paddingLeft: '15px',
};

class ViewBooks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      booksCurrent: [],
      booksRead: [],
      booksTBR: [],
      galleryView: false,
    }
    this.refreshCallback = this.refreshCallback.bind(this);
    this.getAllBooks = this.getAllBooks.bind(this);
    this.changeView = this.changeView.bind(this);
  }

  getAllBooks = async () => {
    const booksCurrent = await getBooksCurrentlyReading();
    const booksRead = await getBooksRead();
    const booksTBR = await getBooksTBR();

    this.setState({
      booksCurrent: booksCurrent ? booksCurrent : [],
      booksRead: booksRead ? booksRead : [],
      booksTBR: booksTBR ? booksTBR : [],
    });
  }

  componentDidMount() {
    this.getAllBooks();
  }

  changeView() {
    this.setState({ galleryView: !this.state.galleryView });
  }

  refreshCallback() {
    console.log('refreshing');
    this.getAllBooks();
  }


  render() {
    const { booksCurrent } = this.state;
    const { booksRead } = this.state;
    const { booksTBR } = this.state;
    const { galleryView } = this.state;

    return (
      <div style={style}>
        <Button size="small" variant="contained" color="default" onClick={this.changeView.bind(this)}> Switch View </Button>
        <div className='currently-reading'>
          <h3>currently reading</h3>
          {booksCurrent.map((book) => (
            <Book key={book.volumeId} book={book}
              galleryView={galleryView} refreshCallback={this.refreshCallback} />
          ))}
        </div>

        <div className='tbr'>
          <h3>tbr</h3>
          {booksTBR.map((book) => (
            <Book key={book.volumeId} book={book}
              galleryView={galleryView} refreshCallback={this.refreshCallback} />
          ))}
        </div>

        <div className='read'>
          <h3>read</h3>
          {booksRead.map((book) => (
            <Book key={book.volumeId} book={book}
              galleryView={galleryView} refreshCallback={this.refreshCallback} />
          ))}
        </div>
      </div>
    );
  }
}

export default ViewBooks;
