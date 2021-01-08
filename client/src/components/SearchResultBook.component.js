import React, { Component } from "react";
import { TBR, READ, CURRENTLY_READING } from '../constants.js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { addBook } from '../actions/books';

class SearchResultBook extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ratingDialogOpen: false,
      userRating: 0,
    };
    this.handleClose = this.handleClose.bind(this);
    this.openRatingDialog = this.openRatingDialog.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.onClickAddBook = this.onClickAddBook.bind(this);
  }

  onClickAddBook = async(status) => {
    const { book } = this.props;
    const { userRating } = this.state;
    console.log(`adding to ${status}: ${book.id}`);
    const newBook = {
      volumeId: book.id,
      title: book.title,
      author: book.author,
      pageCount: book.pageCount,
      coverLink: book.image,
      genres: 'Fiction',
      avgRating: book.avgRating,
      userRating: userRating,
      status: status
    };

    await addBook(newBook);
  }

  openRatingDialog() {
    this.setState({ratingDialogOpen: true});
  }

  handleClose() {
    this.setState({ratingDialogOpen: false});
  }

  handleRatingChange(e) {
    this.setState({
      ratingDialogOpen: false, 
      userRating: e.target.value,
    });
    this.onClickAddBook(READ);
  }

  render() {
    const { book } = this.props;
    const { ratingDialogOpen } = this.state;
    return (
      <div>
        <img alt='' src={book.image} /> <br />
        {book.title} <br />
        {book.author} <br />
        {book.desc} <br />
        {book.avgRating} <br />
        {book.pageCount} <br />
        <button onClick={this.openRatingDialog}>READ</button>
        <button onClick={this.onClickAddBook.bind(this, CURRENTLY_READING)} >CURRENTLY READING</button>
        <button onClick={this.onClickAddBook.bind(this, TBR)} >TO BE READ</button>

        <Dialog open={ratingDialogOpen} onClose={this.handleClose} >
            <DialogTitle>Rate the Book</DialogTitle>
            <DialogContent>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} onChange={this.handleRatingChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

      </div>
    );
  }
}

export default SearchResultBook;
