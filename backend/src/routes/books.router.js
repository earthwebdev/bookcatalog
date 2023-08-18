import express from "express";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";

import {getBooks, getAllBooks, getBooksById, createBooks, updateBooks, deleteBooks} from "../controllers/books.controller.js";
import upload from "../middlewares/multer.middleware.js";

import filteredResults from '../middlewares/filterresult.middleware.js';
import BookModel from "../models/books.model.js";

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - imageUrl
 *         - genres         
 *         - authors
 *         - ISBN
 *         - price
 *         - stock
 *         - pageCount
 *         - weight
 *         - language
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the book
 *         title:
 *           type: string
 *           description: The title of your book
 *         description:
 *           type: string
 *           description: The book description
 *         imageUrl:
 *           type: string
 *           format: binary
 *           description: The book image url
 *         genres:
 *           type: string
 *           description: The book genres
 *         authors:
 *           type: string
 *           description: The book authors
 *         ISBN:
 *           type: string
 *           description: The book ISBN
 *         price:
 *           type: string
 *           description: The book price
 *         discountPercentage:
 *           type: string
 *           description: The book discount Percentage
 *         stock:
 *           type: string
 *           description: The book stock
 *         pageCount:
 *           type: string
 *           description: The book pageCount
 *         weight:
 *           type: string
 *           description: The book weight
 *         language:
 *           type: string
 *           description: The book language
 *         isFeatured:
 *           type: boolean
 *           default: false
 *           description: The book isFeatured
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date of book was added
 *       example:
 *         id: d5fE_asz
 *         name: The New Turing Omnibus
 *         description: description of the book
 *         imageUrl: 'http://example.com/examples/example.jpg'
 *         genres: genre object id
 *         authors: author object id
 *         ISBN: ISBN Numbber
 *         price: 123
 *         stock: 10
 *         pageCount: 132
 *         weight: 120gms
 *         language: Nepali
 *         isFeatured: true
 *         createdAt: 2023-03-10T04:05:06.157Z
 */

 /**
 * @swagger
 * tags:
 *   name: Authors
 *   description: The books managing API
 * /books:
 *   get:
 *     summary: Lists all the books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 * /books/all:
 *   get:
 *     summary: Lists all the books with title and id only
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of the books with title and id only
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *       401:
 *         description: You are not authorized to access this resource.
 * /books/{id}:
 *   get:
 *     summary: Get the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       404:
 *         description: The book was not found
 *   patch:
 *    summary: Update the book by the id
 *    tags: [Books]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The book id
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            $ref: '#/components/schemas/Book'
 *    responses:
 *      200:
 *        description: The book was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      404:
 *        description: The book was not found
 *      401:
 *         description: You are not authorized to access this resource.
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *
 *     responses:
 *       200:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 *       401:
 *         description: You are not authorized to access this resource.
 */
router.get('/', filteredResults(BookModel, 'authors', 'name'), getBooks);
router.get('/all', getAllBooks);
router.get('/:id', getBooksById);
router.post('/', AuthMiddleware, authorize, upload.single('imageUrl'), createBooks);
router.patch('/:id', AuthMiddleware, authorize, upload.single('imageUrl'), updateBooks);
router.delete('/:id', AuthMiddleware, authorize, deleteBooks);

export default router;