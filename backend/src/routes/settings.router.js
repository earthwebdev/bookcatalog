import express from "express";
import { getAllSettings, getSettingsByName, getSettingsById, createSetting, updateSetting, deleteSetting } from "../controllers/settings.controller.js";
import { AuthMiddleware, authorize } from "../middlewares/auth.middleware.js";


const router = express.Router();

router.get('/',  getAllSettings);
router.get('/:id',  getSettingsById);
router.get('/getByName/:name',  getSettingsByName);

router.post('/', AuthMiddleware, authorize,  createSetting);
router.patch('/:id', AuthMiddleware, authorize,  updateSetting);
router.delete('/:id', AuthMiddleware, authorize,  deleteSetting);



export default router;

