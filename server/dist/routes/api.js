'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _book = require('../controllers/book');

var _book2 = _interopRequireDefault(_book);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

/* POST add book */
router.post('/books', _book2.default.add);

/* GET retrieve all books */
router.get('/books', _book2.default.retrieveAll);

/* GET retrieve single book */
router.get('/books/:bookId', _book2.default.retrieve);

exports.default = router;
//# sourceMappingURL=api.js.map