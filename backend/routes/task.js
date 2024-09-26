import express from "express";
const router = express.Router();
import {create} from '../controllers/task.js';
router.post('/create',create)

export default router;