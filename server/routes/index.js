import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send('We are live on hellobooks');
});

export default router;
