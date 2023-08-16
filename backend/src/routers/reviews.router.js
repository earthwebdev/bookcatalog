import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";

import {getReviews, getReviewById, getReviewsByBookId, createReviews, updateReviews, deleteReviews} from "../controllers/reviews.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import ReviewModel from "../models/reviews.model.js";


const router = express.Router();
router.get('/', filteredResults(ReviewModel), getReviews);
router.get('/:id', getReviewById);
router.get('/book/:bookId', getReviewsByBookId);
router.post('/', AuthMiddleware, createReviews);
router.patch('/:id', AuthMiddleware, updateReviews);
router.delete('/:id', AuthMiddleware, deleteReviews);

export default router;