import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import MONGODB_URI from './config/index.js';

import bookRoutes from './routes/books.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
  res.send('Hello to BookShelf API');
});

// app.use(express.static('client/build'));

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);