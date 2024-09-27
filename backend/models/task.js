import mongoose from 'mongoose';

var taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true  // Task title or short description
  },
  description: {
    type: String,   // Detailed task description
    required: false
  },
  status: {
    type: String,
    enum: ['pending', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: String,  // Store only date as a string (YYYY-MM-DD)
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically stores the current datetime when the task is created
  },
  updatedAt: {
    type: Date,
    default: Date.now  // Automatically stores the current datetime when the task is updated
  }
});

// Export the model
const Task = mongoose.model('Task', taskSchema);
export default Task;
