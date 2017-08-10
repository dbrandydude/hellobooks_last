'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BooksController = {
    /* Add Book */
    add: function add(req, res) {
        // Validate input
        req.checkBody('isbn', 'ISBN required').notEmpty().isInt();
        req.checkBody('title', 'Title required').notEmpty();
        req.checkBody('author', 'Author required').notEmpty();
        req.checkBody('published', 'Published date required').notEmpty();
        req.checkBody('description', 'Description required').notEmpty();
        req.checkBody('qty', 'QTY required').notEmpty().isInt();

        // Validation result
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                res.status(400).json({ status: 'Validation error', data: result.array() });
            }

            var newBook = {
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                published: req.body.published,
                description: req.body.description,
                qty: req.body.qty
            };

            _models2.default.Book.create(newBook).then(function (book) {
                res.status(201).json({
                    status: 'success',
                    data: book
                });
            }).catch(function (err) {
                res.status(400).send(err);
            });
        });
    },

    /* Update book */
    update: function update(req, res) {
        var bookId = req.params.bookId;

        _models2.default.Book.findById(bookId).then(function (book) {
            if (!book) {
                res.status(404).send({
                    status: 'Not found'
                });
            }

            var updateBook = {
                isbn: req.body.isbn || book.isbn,
                title: req.body.title || book.title,
                author: req.body.author || book.author,
                published: req.body.published || book.published,
                description: req.body.description || book.description,
                qty: req.body.qty || book.isbn
            };
            return book.update(updateBook).then(function () {
                res.status(200).send({ status: 'success' });
            }).catch(function (err) {
                return res.status(400).send(err);
            });
        });
    },

    /* Retrieve all books */
    retrieveAll: function retrieveAll(req, res) {
        _models2.default.Book.all().then(function (books) {
            res.send(books);
        }).catch(function (err) {
            res.send(err);
        });
    },

    /* Retrieve single book */
    retrieve: function retrieve(req, res) {
        var bookId = parseInt(req.params.bookId, 10);
        _models2.default.Book.findById(bookId).then(function (book) {
            if (!book) return res.status(404).send('Not found');
            res.status(200).send(book);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    },

    /* Borrow book */
    borrow: function borrow(req, res) {
        var userId = parseInt(req.params.userId, 10);
        var bookId = req.body.bookId;

        _models2.default.Book.findById(bookId).then(function (book) {
            // TODO: associate
            var bookData = book.title;
            _models2.default.Inventory.create({
                userId: userId,
                book: bookData
            }).then(function (inventory) {
                res.status(200).send(inventory);
            });
        }).catch(function (err) {
            return res.status(400).send(err);
        });
    },

    /* Return borrowed books */
    return: function _return(req, res) {
        var bookId = parseInt(req.body.bookId, 10);
        _models2.default.Inventory.findOne({ where: { bookId: bookId } }).then(function (book) {
            if (!book) {
                res.status(404).send({ status: 'Not found' });
            }
            book.update({ return: true }).then(function () {
                res.status(200).send({ status: 'success' });
            }).catch(function (err) {
                return res.status(400).send(err);
            });
        });
    },

    /* Get books borrowed by user */
    inventory: function inventory(req, res) {
        if (req.query.returned) {
            return _models2.default.Inventory.findAll({
                where: {
                    userId: req.params.userId,
                    return: req.query.returned
                }
            }).then(function (books) {
                res.send(books);
            }).catch(function (err) {
                res.send(err);
            });
        }
        _models2.default.Inventory.findAll({ where: { userId: req.params.userId } }).then(function (books) {
            res.send(books);
        }).catch(function (err) {
            res.send(err);
        });
    }
};

exports.default = BooksController;
//# sourceMappingURL=book.js.map