import React, { Component } from "react";
import { READ } from '../constants.js';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { addBook } from '../actions/books';
import RatingView from './RatingView.component';
import BookButtons from './BookButtons';
import { ALERTS } from '../constants.js';

const style = {
  paddingLeft: '10px',
};

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

  onClickAddBook = async (status) => {
    const { book } = this.props;
    const { userRating } = this.state;
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

    const respCode = await addBook(newBook);
    if (respCode === '400') {
      this.props.setAlert(ALERTS.BOOK_EXISTS);
    } else if (respCode === '201') {
      this.props.setAlert(ALERTS.BOOK_ADDED);
    }
  }

  openRatingDialog() {
    this.setState({ ratingDialogOpen: true });
  }

  handleClose() {
    this.setState({ ratingDialogOpen: false });
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
      <div style={style}>
        <img alt='' src={book.image} /> <br />
        {book.title} <br />
        {book.author} <br />
        {book.desc} {book.desc ? <br /> : ''}
        Average Rating: <RatingView rating={book.avgRating} /> <br />
        Page Count: {book.pageCount} <br />

        <BookButtons status='SearchResults' onRead={this.openRatingDialog} onUpdateStatus={this.onClickAddBook.bind(this)} />

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
