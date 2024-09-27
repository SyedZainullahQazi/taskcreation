import Task from "../models/task.js";
import dayjs from 'dayjs';

export const create = async (req, res) => {
  try {
    console.log('hit occurred');
    
    const { title, description, priority, dueDate } = req.body; 
    // Format the dueDate using Day.js
    const formattedDueDate = dueDate?dayjs(dueDate).format('YYYY-MM-DD'):null;

    // Status will always be pending when you add a task
    const newTask = new Task({
      title,
      description,
      priority,
      dueDate: formattedDueDate // Use the formatted date here
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const listing = async (req, res) => {
  const { sortOrder, filters } = req.body; // Expecting 'sortOrder' and 'filters' in the request body

  console.log('Sort Order:', sortOrder);
  console.log('Filters:', filters);

  try {
    let query = Task.find();

    // Handle sorting
    if (sortOrder) {
      const order = sortOrder === 'ascend' ? 1 : -1; // asc -> 1, desc -> -1
      query = query.sort({ dueDate: order });
    }

    // Handle filters for priority
    if (filters && filters.priority) {
      query = query.where('priority').equals(filters.priority);
    }

    // Handle filters for status
    if (filters && filters.status) {
      query = query.where('status').equals(filters.status);
    }

    const tasks = await query;

    const formattedTasks = tasks.map(task => ({
      ...task._doc, // Spread the original task properties
      dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null, // Format dueDate if it exists
      createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null, // Format createdAt
      updatedAt: task.updatedAt ? dayjs(task.updatedAt).format('YYYY-MM-DD') : null, // Format updatedAt
    }));

    // Return the formatted tasks
    res.status(200).json(formattedTasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value. Use 'pending' or 'completed'." });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { status }, // Update the status field
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const formattedTask = {
      ...task._doc,
      dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null,
      createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null,
      updatedAt: task.updatedAt ? dayjs(task.updatedAt).format('YYYY-MM-DD') : null,
    };

    res.status(200).json(formattedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};