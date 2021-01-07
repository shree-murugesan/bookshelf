import axios from 'axios';

const url = 'http://localhost:4000/books';

export const getBooks = () => {
  try {
    axios.get(url);
  } catch (error) {
    console.log(error.message);
  }
};

export const getBooksCurrentlyReading = async () => {
  try {
    const { data } = await axios.get(`${url}/current`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export const getBooksRead = async () => {
  try {
    const { data } = await axios.get(`${url}/read`);
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export const getBooksTBR = async () => {
  try {

    const { data } = await axios.get(`${url}/tbr`);
    return data;

  } catch (error) {
    console.log(error.message);
  }
}

export const addBook = (newBook) => {
  try {
    axios.post(`${url}/add`, newBook).then(res => console.log(res.data));
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateBook(id, updatedBook) {
  try {
    const { data } = await axios.patch(`${url}/${id}/update`, updatedBook);
    console.log(data);
  } catch (error) {
    console.log(error.message);
  }
}