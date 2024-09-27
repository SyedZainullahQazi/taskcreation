import express from "express";
const router = express.Router();
import {create, deleteTask, getTask, listing, updateStatus, updateTask} from '../controllers/task.js';

router.post('/create',create)
router.post('/listing', listing);
router.patch('/:id/status', updateStatus);    
router.get('/:id', getTask);
router.delete('/:id', deleteTask); 
router.patch('/:id', updateTask);  // Route for updating a task by ID

export default router;