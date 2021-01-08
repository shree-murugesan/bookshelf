import React, { Component } from "react";
import { READ } from '../constants.js';
import { updateBook } from '../actions/books';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import RatingView from './RatingView.component';
import BookButtons from './BookButtons';

const style = {
  paddingLeft: '10px',
  display: 'inline-block',
};

class Book extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ratingDialogOpen: false,
    };
    this.onUpdateStatus = this.onUpdateStatus.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.openRatingDialog = this.openRatingDialog.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
  }

  onUpdateStatus = async (newStatus) => {
    let book = this.props.book;
    console.log(`Updating ${book.volumeId} to ${newStatus} status`);

    book.status = newStatus;
    await updateBook(book._id, book);
    this.props.refreshCallback();
  }

  openRatingDialog() {
    this.setState({ratingDialogOpen: true});
  }

  handleClose() {
    this.setState({ratingDialogOpen: false});
  }

  handleRatingChange = async (e) => {
    this.setState({ratingDialogOpen: false});
    let book = this.props.book;
    console.log(`Updating ${book.volumeId} to ${READ} status`);
    book.status = READ;
    book.userRating = e.target.value;
    await updateBook(book._id, book);
    this.props.refreshCallback();
  }

  render() {
    const { book } = this.props;
    const { ratingDialogOpen } = this.state;
    
    let rating, ratingTitle;
    if (book.userRating === 0) {
      rating = book.avgRating;
      ratingTitle = 'Average Rating';
    } else {
      rating = book.userRating;
      ratingTitle = 'Your Rating';
    }

    if (this.props.galleryView) {
      return (
        <div style={style}>
          <img alt='' src={book.coverLink} /> <br />
          {book.title} <br />
          {book.author}
        </div>
      );
    } else {
      return (
        <div style={style}>
          <img alt='' src={book.coverLink} /> <br />
          {book.title} <br />
          {book.author} <br />
          {ratingTitle}: <RatingView rating={rating}/> <br />
          <BookButtons status={book.status} onRead={this.openRatingDialog} onUpdateStatus={this.onUpdateStatus.bind(this)} />

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
}

export default Book;
