import express from "express";
const router = express.Router();
import {create, deleteTask, getTask, listing, updateStatus} from '../controllers/task.js';

router.post('/create',create)
router.post('/listing', listing);
router.patch('/:id/status', updateStatus);    
router.get('/:id', getTask);
router.delete('/:id', deleteTask); 
export default router;