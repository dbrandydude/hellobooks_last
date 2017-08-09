'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _book = require('../controllers/book');

var _book2 = _interopRequireDefault(_book);

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* POST user signup */
router.post('/users/signup', _user2.default.signup);

/* POST user signin */
router.post('/users/signin', _user2.default.login);

/* POST add book */
router.post('/books', _book2.default.add);

/* PUT modify book */
router.put('/books/:bookId', _book2.default.update);

/* GET retrieve all books */
router.get('/books', _book2.default.retrieveAll);

/* GET retrieve single book */
router.get('/books/:bookId', _book2.default.retrieve);

exports.default = router;
//# sourceMappingURL=api.js.map