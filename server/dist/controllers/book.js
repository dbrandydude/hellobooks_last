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
        _models2.default.Book.create({
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
            description: req.body.description,
            qty: req.body.qty
        }).then(function (book) {
            res.status(201).send(book);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    },

    /* Retrieve all books */
    retrieveAll: function retrieveAll(req, res) {
        _models2.default.Book.all().then(function (books) {
            res.status(200).send(books);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    },

    /* Retrieve single book */
    retrieve: function retrieve(req, res) {
        var bookId = parseInt(req.params.bookId, 10);
        _models2.default.Book.findById(bookId).then(function (book) {
            res.status(200).send(book);
        }).catch(function (err) {
            res.status(400).send(err);
        });
    }

};

exports.default = BooksController;
//# sourceMappingURL=book.js.map