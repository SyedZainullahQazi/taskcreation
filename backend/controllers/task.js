import Task from "../models/task.js";

export const create = async (req, res) => {
  try {
    console.log('hit occured');
    
    const { title, description, priority, dueDate } = req.body; 
    //status will always be pending when you add a task,
    
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
