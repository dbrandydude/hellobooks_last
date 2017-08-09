'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _serialijse = require('serialijse');

var _serialijse2 = _interopRequireDefault(_serialijse);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersController = {
    /* Register / create user account */
    signup: function signup(req, res) {
        _models2.default.User.create({
            username: req.body.username,
            password: _bcryptjs2.default.hashSync(req.body.password, 8),
            email: req.body.email,
            fullname: req.body.fullname,
            role: req.body.role,
            level: req.body.level
        }).then(function (user) {
            return res.status(201).json(user);
        }).catch(function (err) {
            return res.status(400).send(err);
        });
    },

    /* Login user */
    login: function login(req, res, next) {
        _passport2.default.authenticate('local', function (err, user) {
            if (err) return next(err);
            if (!user) {
                return res.status(500).send({
                    status: 'Invalid credentials'
                });
            }
            req.login(user, function (err) {
                if (err) return next(err);
                return res.status(200).send(user);
            });
        })(req, res, next);
    },

    /* Borrow book */
    borrow: function borrow(req, res) {
        if (!req.user) return res.status(401).send('Unauthorized');
        var userId = parseInt(req.params.userId, 10);
        var bookId = req.body.bookId;

        _models2.default.Book.findById(bookId).then(function (book) {
            var bookData = _serialijse2.default.serialize(JSON.stringify(book));
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

    /* Get books borrowed by user */
    inventory: function inventory(req, res) {
        if (!req.user) return res.status(401).send('Unauthorized');
        if (req.query.returned) {
            _models2.default.Inventory.findAll({
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
        return _models2.default.Inventory.findAll({ where: { userId: req.params.userId } }).then(function (books) {
            res.send(books);
        }).catch(function (err) {
            res.send(err);
        });
    },

    /* Return borrowed books */
    returnBook: function returnBook(req, res) {
        if (!req.user) return res.status(401).send('Unauthorized');
        var inventoryId = parseInt(req.body.inventoryId, 10);
        _models2.default.Inventory.findById(inventoryId).then(function (book) {
            if (!book) {
                res.status(404).send({ status: 'Not found' });
            }
            book.update({ return: true }).then(function () {
                res.status(200).send({ status: 'success' });
            }).catch(function (err) {
                return res.status(400).send(err);
            });
        });
    }

};

exports.default = UsersController;
//# sourceMappingURL=user.js.map