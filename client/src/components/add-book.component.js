import React, { Component } from "react";
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import SearchResultBook from './SearchResultBook.component';
import Alert from '@material-ui/lab/Alert';
import { ALERTS } from '../constants.js';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.setAlert = this.setAlert.bind(this);

    this.state = {
      search_text: '',
      search_results: [],
      alertOpen: false,
      alertMessage: '',
    }
  }

  onChangeSearchText(e) {
    this.setState({
      search_text: e.target.value
    });
  }

  getBook() {
    let results = [];
    let book;
    let searchBooksUrl = 'https://www.googleapis.com/books/v1/volumes?maxResults=5&langRestrict=en&q=';
    fetch(searchBooksUrl + '/"' + this.state.search_text + '/"')
      .then(resp => resp.json())
      .then(resp => {
        results = resp.items.map((item) => {
          book = {
            image: item.volumeInfo.imageLinks ? item.volumeInfo.imageLinks.thumbnail : '',
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'Unknown Author',
            desc: item.volumeInfo.description,
            avgRating: item.volumeInfo.averageRating,
            pageCount: item.volumeInfo.pageCount
          }
          return book;
        });
        this.setState({ search_results: results });
      })
  }

  onSearch(e) {
    e.preventDefault();
    console.log(`searching: ${this.state.search_text}`);
    if (this.state.search_text !== '') {
      this.getBook();
    } else {
      this.setState({
        alertOpen: true,
        alertMessage: ALERTS.EMPTY_SEARCH_QUERY,
      });
    }
  }

  setAlert(alertMessage) {
    this.setState({
      alertOpen: true,
      alertMessage: alertMessage,
    });
  }

  handleCloseAlert() {
    this.setState({ alertOpen: false, alertMessage: '' });
  }

  render() {
    const { search_results, alertOpen, alertMessage } = this.state;

    let alert;
    switch (alertMessage) {
      case ALERTS.EMPTY_SEARCH_QUERY:
        alert =
          <Alert icon={<SearchIcon fontSize="inherit" />} onClose={this.handleCloseAlert} severity="info">
            {alertMessage}
          </Alert>;
        break;

      case ALERTS.BOOK_EXISTS:
        alert =
          <Alert onClose={this.handleCloseAlert} severity="error">
            {alertMessage}
          </Alert>;
        break;

      case ALERTS.BOOK_ADDED:
        alert =
          <Alert onClose={this.handleCloseAlert} severity="success">
            {alertMessage}
          </Alert>;
        break;

      default:
        alert = '';
        break;
    }

    return (
      <div>
        <form autoComplete="off" onSubmit={this.onSearch}>
          <Input placeholder="Search" value={this.state.search_text} onChange={this.onChangeSearchText} />
          <IconButton color="primary" onClick={this.onSearch}>
            <SearchIcon />
          </IconButton>
        </form>

        {search_results.map((book) => (
          <SearchResultBook key={book.id} book={book} setAlert={this.setAlert.bind(this)} />
        ))}

        <Snackbar open={alertOpen}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000} onClose={this.handleCloseAlert}>
          {alert}
        </Snackbar>

      </div>
    );
  }
}

export default AddBook;
