import React, { Component } from "react";

class Book extends Component {

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
        <img src={book.image} />
        {book.title}
        {book.author}
        {book.genre}
        {book.rating}
        {book.numPages}
      </div>
    );
  }
}

export default Book;
