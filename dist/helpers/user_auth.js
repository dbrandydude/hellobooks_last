'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isLoggedIn = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.status(401).json({ status: 'Unauthorized' });
};

var notLoggedIn = function notLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) return next();
    res.status(401).json({ status: 'Unauthorized' });
};

exports.isLoggedIn = isLoggedIn;
exports.notLoggedIn = notLoggedIn;
//# sourceMappingURL=user_auth.js.map