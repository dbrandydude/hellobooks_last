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
        db.Book.all()
            .then((users) => { res.send(users); })
            .catch((err) => { res.send(err); });
    },

    /* Retrieve single book */
    retrieve: (req, res) => {
        const bookId = parseInt(req.params.bookId, 10);
        db.Book
            .findById(bookId)
            .then((book) => {
                if (!book) return res.status(404).send('Not found');
                res.status(200).send(book);
            })
            .catch((err) => { res.status(400).send(err); });
    },

    /* Borrow book */
    borrow: (req, res) => {
        const userId = parseInt(req.params.userId, 10);
        const bookId = req.body.bookId;

        db.Book
            .findById(bookId)
            .then((book) => {
                const bookData = book.title;
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

export default BooksController;
