import React, { Component } from "react";

class SearchResultBook extends Component {

    // constructor(props) {
    //     super(props);

    //     this.state = {
    //       title
    //     }
    //   }

  render() {
      const {book} = this.props;
    return (
      <div>
        <img alt='' src={book.image} />
        {book.id} <br />
        {book.title} <br/>
        {book.author} <br/>
        {book.desc} <br/>
        {book.avgRating} <br/>
        {book.numPages} <br/>
        <button>READ</button>
      </div>
    );
  }
}

export default SearchResultBook;
