'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

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
    }
};

exports.default = UsersController;
//# sourceMappingURL=user.js.map