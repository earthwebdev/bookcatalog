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
 *       '401':
 *         description: Bad username, not found in db
 *       '403':
 *         description: Username and password don't match
 */
router.post('/login', getLogin);
router.patch('/register', getRegister);
router.put('/forgotpassword', fortgetPassword);
router.post('/resetpassword/:resettoken', resetPassword);

router.get('/profile', AuthMiddleware, getProfile);

export default router;