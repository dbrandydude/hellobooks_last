import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
    res.send('YOYO! We are live on dbBooks');
});

export default router;
