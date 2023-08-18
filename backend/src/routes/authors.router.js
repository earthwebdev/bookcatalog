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
 *         - name
 *         - description         
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the author
 *         name:
 *           type: string
 *           description: The name of your author
 *         description:
 *           type: string
 *           description: The book author description
 *         photo:
 *           type: string
 *           format: binary
 *           description: The author photo url
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of author was added
 *       example:
 *         id: d5fE_asz
 *         name: The New Turing Omnibus
 *         description: description of the author
 *         photo: 'http://example.com/examples/example.jpg'
 *         createdAt: 2023-03-10T04:05:06.157Z
 */

 /**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The books managing API
 * /authors:
 *   get:
 *     summary: Lists all the authors
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: The list of the authors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'
 *   post:
 *     summary: Create a new author
 *     tags: [Authors]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Author'
 *     responses:
 *       200:
 *         description: The created author.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       500:
 *         description: Some server error
 *       401:
 *         description: You are not authorized to access this resource.
 * /authors/{id}:
 *   get:
 *     summary: Get the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *     responses:
 *       200:
 *         description: The author response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 *       404:
 *         description: The author was not found
 *   patch:
 *    summary: Update the author by the id
 *    tags: [Authors]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The author id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Author'
 *    responses:
 *      200:
 *        description: The author was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      404:
 *        description: The author was not found
 *      401:
 *         description: You are not authorized to access this resource.
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the author by id
 *     tags: [Authors]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The author id
 *
 *     responses:
 *       200:
 *         description: The author was deleted
 *       404:
 *         description: The author was not found
 *       401:
 *         description: You are not authorized to access this resource.
 */
router.get('/', filteredResults(AuthorModel), getAuthors);
router.get('/all', getAllAuthors);
router.get('/:id', getAuthorById);
router.post('/', AuthMiddleware, authorize, upload.single('photo'), createAuthors);
router.patch('/:id', AuthMiddleware, authorize, upload.single('photo'), updateAuthors);
router.delete('/:id', AuthMiddleware, authorize, deleteAuthors);

export default router;