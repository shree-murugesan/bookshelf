import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import bookRoutes from './routes/books.js';

const app = express();
const PORT = process.env.PORT || 4000;
const CONNECTION_URL = 'mongodb+srv://shreemur:DMS93fA0bDsZougg@cluster0.wvg7k.mongodb.net/<dbname>?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(bodyParser.json());
app.use('/books', bookRoutes);

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);