import express from "express";
const router = express.Router();
import authController from '../controllers/authController.js';
import cors from "cors"

const {test} = authController;

router.get('/',test)

export default router;