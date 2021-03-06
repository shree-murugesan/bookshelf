import express from 'express';
import { addBook, getBooks, getBooksCurrentlyReading, updateBook, getBooksRead, getBooksTBR, getRandomBook } from '../controllers/books.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/current', getBooksCurrentlyReading);
router.get('/tbr', getBooksTBR);
router.get('/read', getBooksRead);
router.post('/add', addBook);
router.patch('/:id/update', updateBook);
router.get('/random/:genre', getRandomBook);

// router.use(function(req, res) {
// 	res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

export default router;