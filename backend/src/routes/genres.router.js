import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getGenres, getGenreById, getAllGenres, createGenres, updateGenres, deleteGenres} from "../controllers/genres.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import GenreModel from "../models/genres.model.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Genre:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - photo
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the genre
 *         name:
 *           type: string
 *           description: The name of your genre
 *         description:
 *           type: string
 *           description: The book genre description
 *         photo:
 *           type: string
 *           format: binary
 *           description: The genre photo url
 *         parentId:
 *           type: string
 *           description: The parent id of the genre
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of genre was added
 *       example:
 *         id: d5fE_asz
 *         name: The New Turing Omnibus
 *         description: description of the genre
 *         photo: 'http://example.com/examples/example.jpg'
 *         createdAt: 2023-03-10T04:05:06.157Z
 */

 /**
 * @swagger
 * tags:
 *   name: Genres
 *   description: The books managing API
 * /genres:
 *   get:
 *     summary: Lists all the genres
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: The list of the genres
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 *   post:
 *     summary: Create a new genre
 *     tags: [Genres]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Genre'
 *     responses:
 *       200:
 *         description: The created genre.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       500:
 *         description: Some server error
 *       401:
 *         description: You are not authorized to access this resource.
 * /genres/{id}:
 *   get:
 *     summary: Get the genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *     responses:
 *       200:
 *         description: The genre response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Genre'
 *       404:
 *         description: The genre was not found
 *   patch:
 *    summary: Update the genre by the id
 *    tags: [Genres]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The genre id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Genre'
 *    responses:
 *      200:
 *        description: The genre was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *      404:
 *        description: The genre was not found
 *      401:
 *         description: You are not authorized to access this resource.
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the genre by id
 *     tags: [Genres]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The genre id
 *
 *     responses:
 *       200:
 *         description: The genre was deleted
 *       404:
 *         description: The genre was not found
 *       401:
 *         description: You are not authorized to access this resource.
 */
router.get('/', filteredResults(GenreModel), getGenres);
router.get('/all', getAllGenres);
router.get('/:id', getGenreById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createGenres);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateGenres);
router.delete('/:id', AuthMiddleware, authorize, deleteGenres);

export default router;