import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getBooks, getBooksById, createBooks, updateBooks, deleteBooks} from "../controllers/books.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import BookModel from "../models/books.model.js";

const router = express.Router();

router.get('/', filteredResults(BookModel, 'authors', 'name'), getBooks);
router.get('/:id', getBooksById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createBooks);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateBooks);
router.delete('/:id', AuthMiddleware, authorize, deleteBooks);

export default router;