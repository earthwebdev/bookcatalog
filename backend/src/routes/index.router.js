import express from "express";
import userRouter from './users.router.js';
import genreRouter from './genres.router.js';
import authorRouter from './authors.router.js';
import bookRouter from './books.router.js';
import reviewRouter from './reviews.router.js';
import settingRouter from './settings.router.js';
import stripeRouter from './stripe.router.js';
import swaggerRouter   from './swagger.router.js';
const router = express.Router();

router.get('/', (req, res) => {

    res.status(200).json({status: true, message: 'welcome to the book catalog'});
})

router.use('/users', userRouter);
router.use('/genres', genreRouter);
router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/reviews', reviewRouter);
router.use('/settings', settingRouter);
router.use('/stripe', stripeRouter);
router.use('/swagger', swaggerRouter);
export default router;