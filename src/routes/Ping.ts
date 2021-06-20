import express from 'express';

const router = express.Router();

router.route('/ping').get((req, res) => {
  res.status(200).send('Hi there, stranger!');
});

export default router;
