import bcrypt from 'bcryptjs';
import passport from 'passport';

import db from '../models';

const UsersController = {
    /* Register / create user account */
    signup: (req, res) => {
        db.User
            .create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8),
                email: req.body.email,
                fullname: req.body.fullname,
                role: req.body.role,
                level: req.body.level
            })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(400).send(err));
    },

    /* Login user */
    login: (req, res, next) => {
        passport.authenticate('local', (err, user) => {
            if (err) return next(err);
            if (!user) {
                return res.status(500).send({
                    status: 'Invalid credentials'
                });
            }
            req.login(user, (err) => {
                if (err) return next(err);
                return res.status(200).send(user);
            });
        })(req, res, next);
    }
};

export default UsersController;
