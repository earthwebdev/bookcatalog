import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getGenres, getGenreById, getAllGenres, createGenres, updateGenres, deleteGenres} from "../controllers/genres.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import GenreModel from "../models/genres.model.js";

const router = express.Router();

router.get('/', filteredResults(GenreModel), getGenres);
router.get('/all', AuthMiddleware, authorize, getAllGenres);
router.get('/:id', getGenreById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createGenres);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateGenres);
router.delete('/:id', AuthMiddleware, authorize, deleteGenres);

export default router;