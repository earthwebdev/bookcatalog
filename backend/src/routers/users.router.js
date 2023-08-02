import express from "express";
import { getLogin, getRegister, getProfile } from "../controllers/users.controller.js";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.post('/login', getLogin);
router.patch('/register', getRegister);
router.get('/profile', AuthMiddleware, getProfile);

export default router;