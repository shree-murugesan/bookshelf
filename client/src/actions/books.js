import axios from 'axios';

const url = 'http://localhost:4000/books';

export const getBooks = () => {
    try {
      axios.get(url);
    } catch (error) {
      console.log(error.message);
    }
  };

export const addBook = (newBook) => {
  try {
    axios.post(url + '/add', newBook).then(res => console.log(res.data));
  } catch (error) {
    console.log(error.message);
  }
};