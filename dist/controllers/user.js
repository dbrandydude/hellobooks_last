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
        // Validate input
        req.checkBody('username', 'Invalid username').notEmpty();
        req.checkBody('password', 'Invalid password').notEmpty().isLength({ min: 5 });
        req.checkBody('email', 'Invalid email').notEmpty().isEmail();
        req.checkBody('firstname', 'Invalid entry - Firstname').notEmpty().isLength({ min: 2 });
        req.checkBody('lastname', 'Invalid entry - Lastname').notEmpty().isLength({ min: 2 });

        // Validation result
        req.getValidationResult().then(function (result) {
            if (!result.isEmpty()) {
                return res.status(400).json({ status: 'Validation error', data: result.array() });
            }

            var newUser = {
                username: req.body.username,
                password: _bcryptjs2.default.hashSync(req.body.password, 8),
                email: req.body.email,
                fullname: req.body.firstname + ' ' + req.body.lastname
            };

            _models2.default.User.create(newUser).then(function (user) {
                return res.status(201).json(user);
            }).catch(function (err) {
                return res.status(400).send(err);
            });
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

    /* logout user */
    logout: function logout(req, res) {
        req.logout();
        res.status(200).json({ status: 'Logged out' });
    }
};

exports.default = UsersController;
//# sourceMappingURL=user.js.map