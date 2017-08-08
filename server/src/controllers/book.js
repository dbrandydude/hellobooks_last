import db from '../models';

const BooksController = {
    /* Add Book */
    add: (req, res) => {
        db.Book
            .create({
                isbn: req.body.isbn,
                title: req.body.title,
                author: req.body.author,
                published: req.body.published,
                description: req.body.description,
                qty: req.body.qty
            })
            .then((book) => {
                res.status(201).send(book);
            })
            .catch((err) => {
                res.status(400).send(err);
            });
    }


};

export default BooksController;
