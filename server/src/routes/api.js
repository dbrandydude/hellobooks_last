import express from 'express';

import BooksController from '../controllers/book';

const router = express.Router();

/* POST add book */
router.post('/books', BooksController.add);

/* GET retrieve all books */
router.get('/books', BooksController.retrieveAll);

export default router;
