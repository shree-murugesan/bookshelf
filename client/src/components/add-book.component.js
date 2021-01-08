import React, { Component } from "react";
import Input from '@material-ui/core/Input';
import SearchResultBook from './SearchResultBook.component';

class AddBook extends Component {

  constructor(props) {
    super(props);

    this.onChangeSearchText = this.onChangeSearchText.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.state = {
      search_text: '',
      search_executed: false,
      search_results: []
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
            author: item.volumeInfo.authors[0],
            desc: item.volumeInfo.description,
            avgRating: item.volumeInfo.averageRating,
            numPages: item.volumeInfo.pageCount
          }
          return book;
        });
        this.setState({ search_results: results });
      })
  }

  onSearch(e) {
    e.preventDefault();
    console.log(`searching: ${this.state.search_text}`);
    this.setState({ search_executed: true }, this.getBook);
  }

  render() {
    const { search_results } = this.state;
    return (
      <div>
        <form autoComplete="off" onSubmit={this.onSearch}>
          <Input placeholder="Search" value={this.state.search_text} onChange={this.onChangeSearchText} />
        </form>

        {search_results.map((book) => (
          <SearchResultBook key={book.id} book={book} />
        ))}

      </div>
    );
  }
}

export default AddBook;
