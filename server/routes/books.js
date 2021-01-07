import express from 'express';
import { addBook, getBooks, getBooksCurrentlyReading, updateBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/current', getBooksCurrentlyReading);
router.post('/add', addBook);
router.patch('/:id/update', updateBook);

export default router;