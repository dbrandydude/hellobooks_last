'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _expressSession = require('express-session');

var _expressSession2 = _interopRequireDefault(_expressSession);

var _expressValidator = require('express-validator');

var _expressValidator2 = _interopRequireDefault(_expressValidator);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

require('./auth/passport');

var _index = require('./routes/index');

var _index2 = _interopRequireDefault(_index);

var _api = require('./routes/api');

var _api2 = _interopRequireDefault(_api);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Config environment variable */


/* Routes */
_dotenv2.default.config();
// import path from 'path';
// import favicon from 'serve-favicon';


var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use((0, _expressValidator2.default)());
app.use((0, _cookieParser2.default)());
app.use((0, _expressSession2.default)({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

/* Initialize passport */
app.use(_passport2.default.initialize());
app.use(_passport2.default.session());

app.use('/', _index2.default);
app.use('/api', _api2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
});

app.listen(3000, function () {
    console.log('App listening on port 3000');
});

exports.default = app;
//# sourceMappingURL=app.js.map