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
            .then((book) => { res.status(201).send(book); })
            .catch((err) => { res.status(400).send(err); });
    },

    /* Update book */
    update: (req, res) => {
        const bookId = req.params.bookId;
        const updateBook = {
            isbn: req.body.isbn,
            title: req.body.title,
            author: req.body.author,
            published: req.body.published,
            description: req.body.description,
            qty: req.body.qty
        };


        db.Book
            .findById(bookId)
            .then((book) => {
                if (!book) {
                    res.status(404).send({
                        status: 'Not found'
                    });
                }
                return book
                    .update(updateBook)
                    .then(() => {
                        res.status(200).send({ status: 'success' });
                    })
                    .catch(err => res.status(400).send(err));
            });
    },

    /* Retrieve all books */
    retrieveAll: (req, res) => {
        db.Book
            .all()
            .then((books) => { res.status(200).send(books); })
            .catch((err) => { res.status(400).send(err); });
    },

    /* Retrieve single book */
    retrieve: (req, res) => {
        const bookId = parseInt(req.params.bookId, 10);
        db.Book
            .findById(bookId)
            .then((book) => { res.status(200).send(book); })
            .catch((err) => { res.status(400).send(err); });
    }

};

export default BooksController;
