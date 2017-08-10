'use strict';

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportLocal = require('passport-local');

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const LocalStrategy = passportLocal.Strategy;

_passport2.default.serializeUser(function (user, done) {
    done(null, user.id);
});

_passport2.default.deserializeUser(function (id, done) {
    _models2.default.User.findById(id).then(function (user) {
        return done(null, user);
    }).catch(function (err) {
        return done(err, null);
    });
});

_passport2.default.use(new _passportLocal.Strategy(function (username, password, done) {
    _models2.default.User.findOne({ where: { username: username } }).then(function (user) {
        if (!user) {
            return done(null, false, { message: 'Incorrect user' });
        }
        if (!_bcryptjs2.default.compareSync(password, user.password)) {
            return done(null, false, { message: 'Incorrect password' });
        }

        return done(null, user);
    }).catch(function (err) {
        return done(err);
    });
}));
//# sourceMappingURL=passport.js.map