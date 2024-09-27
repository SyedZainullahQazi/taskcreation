import express from "express";
const router = express.Router();
import {create, deleteTask, getTask, listing, updateStatus, updateTask} from '../controllers/task.js';
import { 
    validateCreateTask, 
    validateUpdateTask, 
    validateUpdateStatus, 
    validateTaskListing 
  } from '../validations/task.js';


router.post('/create', validateCreateTask , create)
router.post('/listing', validateTaskListing, listing);
router.patch('/:id/status', validateUpdateStatus, updateStatus);    
router.get('/:id', getTask);
router.delete('/:id', deleteTask); 
router.patch('/:id', validateUpdateTask,updateTask);  // Route for updating a task by ID

export default router;