import express from 'express';

import BooksController from '../controllers/book';
import UsersController from '../controllers/user';

const router = express.Router();

/* POST user signup */
router.post('/users/signup', UsersController.signup);

/* POST user signin */
router.post('/users/signin', UsersController.login);

/* POST add book */
router.post('/books', BooksController.add);

/* PUT modify book */
router.put('/books/:bookId', BooksController.update);

/* GET retrieve all books */
router.get('/books', BooksController.retrieveAll);

/* GET retrieve single book */
router.get('/books/:bookId', BooksController.retrieve);

export default router;
