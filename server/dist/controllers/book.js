'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BookController = {
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
    }

};

exports.default = BookController;
//# sourceMappingURL=book.js.map