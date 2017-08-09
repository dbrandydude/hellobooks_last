'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _models = require('../models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UsersController = {
    /* Register / create user account */
    signup: function signup(req, res) {
        _models2.default.User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            fullname: req.body.fullname,
            role: req.body.role,
            level: req.body.level
        }).then(function (user) {
            return res.status(201).json(user);
        }).catch(function (err) {
            return res.status(400).send(err);
        });
    }
};

exports.default = UsersController;
//# sourceMappingURL=user.js.map