import db from '../models';

const UsersController = {
    /* Register / create user account */
    signup: (req, res) => {
        db.User
            .create({
                username: req.body.username,
                password: req.body.password,
                email: req.body.email,
                fullname: req.body.fullname,
                role: req.body.role,
                level: req.body.level
            })
            .then(user => res.status(201).json(user))
            .catch(err => res.status(400).send(err));
    }
};

export default UsersController;
