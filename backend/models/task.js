import mongoose from 'mongoose';

var taskSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,  // Reference to Users collection
    required: true,
    ref: 'User'
  },
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
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: {
    type: Date  // Stores the due date and time in a single field
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
const Task =  mongoose.model('Task', taskSchema);
export default Task;
