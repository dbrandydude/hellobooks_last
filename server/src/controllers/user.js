import bcrypt from 'bcryptjs';
import passport from 'passport';
import _s from 'serialijse';

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
    },

    /* Borrow book */
    borrow: (req, res) => {
        if (!req.user) return res.status(401).send('Unauthorized');
        const userId = parseInt(req.params.userId, 10);
        const bookId = req.body.bookId;

        db.Book
            .findById(bookId)
            .then((book) => {
                const bookData = _s.serialize(JSON.stringify(book));
                db.Inventory
                    .create({
                        userId,
                        book: bookData
                    })
                    .then((inventory) => {
                        res.status(200).send(inventory);
                    });
            })
            .catch(err => res.status(400).send(err));
    },

    /* Get books borrowed by user */
    inventory: (req, res) => {
        if (!req.user) return res.status(401).send('Unauthorized');
        if (req.query.returned) {
            db.Inventory
                .findAll({
                    where: {
                        userId: req.params.userId,
                        return: req.query.returned
                    }
                })
                .then((books) => { res.send(books); })
                .catch((err) => { res.send(err); });
        }
        return db.Inventory
            .findAll({ where: { userId: req.params.userId } })
            .then((books) => { res.send(books); })
            .catch((err) => { res.send(err); });
    },

    /* Return borrowed books */
    returnBook: (req, res) => {
        const inventoryId = parseInt(req.body.inventoryId, 10);
        db.Inventory
            .findById(inventoryId)
            .then((book) => {
                if (!book) {
                    res.status(404).send({ status: 'Not found' });
                }
                book
                    .update({ return: true })
                    .then(() => {
                        res.status(200).send({ status: 'success' });
                    })
                    .catch(err => res.status(400).send(err));
            });
    }

};

export default UsersController;
