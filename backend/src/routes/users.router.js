import express from "express";
import { getLogin, getRegister, fortgetPassword, resetPassword, getProfile } from "../controllers/users.controller.js";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();
/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     name: Login
 *     summary: Logs in a user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           //$ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *               format: password
 *         required:
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User found and logged in successfully
 *       '400':
 *         description: Please enter correct email and password
 */
router.post('/login', getLogin);
/**
 * @swagger
 *  /users/register:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Register a user.
 *     requestBody:
 *      content:
 *       aplication/json:
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *           example:
 *             name: abcdef
 *             email: abc@email.com
 *             password: Abcdefg1
  *         required:
 *           - name
 *           - email
 *           - password
 *     responses:
 *       '200':
 *         description: User created successfully.
 *       '401':
 *         description: This email has already registered.
 *       '400':
 *         description: Please enter name, email and password
 *                   
 */
router.patch('/register', getRegister);
/**
 * @swagger
 *  /users/forgotpassword:
 *   put:
 *     tags:
 *       - Users
 *     summary: forgotpassword a user.
 *     requestBody:
 *      content:
 *       aplication/json:
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *           example:
 *             email: abc@email.com
 *         required:
 *           - email
 *     responses:
 *       '200':
 *         description: Email sent successfully.
 *       '400':
 *         description: Please enter the valid user email.
 *                   
 */
router.put('/forgotpassword', fortgetPassword);
router.post('/resetpassword/:resettoken', resetPassword);

router.get('/profile', AuthMiddleware, getProfile);

export default router;