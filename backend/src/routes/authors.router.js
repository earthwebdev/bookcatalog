import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getAuthors, getAllAuthors,  getAuthorById, createAuthors, updateAuthors, deleteAuthors} from "../controllers/authors.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import AuthorModel from "../models/authors.model.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - finished
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */
router.get('/', filteredResults(AuthorModel), getAuthors);
router.get('/all', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createAuthors);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateAuthors);
router.delete('/:id', AuthMiddleware, authorize, deleteAuthors);

export default router;