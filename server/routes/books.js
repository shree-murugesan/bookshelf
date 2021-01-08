import express from 'express';
import { addBook, getBooks, getBooksCurrentlyReading, updateBook, getBooksRead, getBooksTBR, getRandomBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/current', getBooksCurrentlyReading);
router.get('/tbr', getBooksRead);
router.get('/read', getBooksTBR);
router.post('/add', addBook);
router.patch('/:id/update', updateBook);
router.get('/random/:genre', getRandomBook);

export default router;