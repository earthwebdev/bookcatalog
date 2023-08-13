import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getAuthors, getAllAuthors,  getAuthorById, createAuthors, updateAuthors, deleteAuthors} from "../controllers/authors.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import AuthorModel from "../models/authors.model.js";

const router = express.Router();

router.get('/', filteredResults(AuthorModel), getAuthors);
router.get('/all', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createAuthors);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateAuthors);
router.delete('/:id', AuthMiddleware, authorize, deleteAuthors);

export default router;