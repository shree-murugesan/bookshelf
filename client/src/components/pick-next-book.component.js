import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import Book from './Book.component';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import { getRandomBook } from '../actions/books';

class PickNextBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      random_book: [],
      genre: 'Any',
    }

    this.onSelect = this.onSelect.bind(this);
    this.onChangeGenre = this.onChangeGenre.bind(this);
  }

  onSelect = async () => {
    console.log(`picking book in ${this.state.genre} genre`);
    const book = await getRandomBook(this.state.genre);
    this.setState({ random_book: book });
  }

  onChangeGenre(e) {
    this.setState({genre: e.target.value});
  }

  render() {
    const { random_book } = this.state;
    const { genre } = this.state;

    let book;
    if (random_book.length === 0) {
      book = '';
    } else {
      book = <Book book={random_book[0]}/>;
    }

    return (
      <div>
          <InputLabel>Genre</InputLabel>
          <NativeSelect value={genre} onChange={this.onChangeGenre}>
            <option aria-label="None" value="Any" />
            <option value={'Mystery'}>Mystery</option>
            <option value={'Fantasy'}>Fantasy</option>
            <option value={'Romance'}>Romance</option>
            <option value={'SciFi'}>Sci-Fi</option>
          </NativeSelect>
        <Button variant="contained" onClick={this.onSelect} color="primary">PICK</Button>
        <br/>
        {book}
      </div>
    );
  }
}

export default PickNextBook;
