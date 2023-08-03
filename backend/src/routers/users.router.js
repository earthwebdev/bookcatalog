import express from "express";
import { getLogin, getRegister, fortgetPassword, resetPassword, getProfile } from "../controllers/users.controller.js";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/login', getLogin);
router.patch('/register', getRegister);
router.post('/forgetpassword', fortgetPassword);
router.post('/resetpassword/:resettoken', resetPassword);

router.get('/profile', AuthMiddleware, getProfile);

export default router;