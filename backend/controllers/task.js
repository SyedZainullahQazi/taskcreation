import Task from "../models/task.js";
import dayjs from 'dayjs';

export const create = async (req, res) => {
  try {
    console.log('hit occurred');
    
    const { title, description, priority, dueDate } = req.body; 
    
    // Validate required fields
    if (!title || !description || !priority) {
      return res.status(400).json({ message: "Title, description, and priority are required." });
    }

    // Format the dueDate using Day.js
    const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : null;

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
    res.status(500).json({ message: error.message });
  }
};

export const listing = async (req, res) => {
  const { sortOrder, filters } = req.body;

  try {
    let query = Task.find();

    // Handle filters
    let hasFilters = false; // Flag to check if any filters were applied

    // Handle filters for priority
    if (filters?.priority && Array.isArray(filters.priority) && filters.priority.length > 0) {
      query = query.where('priority').in(filters.priority);
      hasFilters = true;
    }

    // Handle filters for status
    if (filters?.status && Array.isArray(filters.status) && filters.status.length > 0) {
      query = query.where('status').in(filters.status);
      hasFilters = true;
    }

    // Handle filters for title (case insensitive)
    if (filters?.title && Array.isArray(filters.title) && filters.title.length > 0) {
      const titleRegex = new RegExp(filters.title.join("|"), 'i'); // Create regex for case-insensitive matching
      query = query.where('title').regex(titleRegex);
      hasFilters = true;
    }

    // Handle filters for description (case insensitive)
    if (filters?.description && Array.isArray(filters.description) && filters.description.length > 0) {
      const descriptionRegex = new RegExp(filters.description.join("|"), 'i'); // Create regex for case-insensitive matching
      query = query.where('description').regex(descriptionRegex);
      hasFilters = true;
    }

    // Handle filters for dueDate (exact match)
    if (filters?.dueDate && Array.isArray(filters.dueDate) && filters.dueDate.length > 0) {
      const dueDate = dayjs(filters.dueDate[0]).format('YYYY-MM-DD'); // Format to match stored string
      query = query.where('dueDate').equals(dueDate); // Exact match
      hasFilters = true;
    }

    // Execute the query to fetch tasks
    const tasks = await query;

    // If no filters were applied, return all tasks
    if (!hasFilters) {
      const allTasks = await Task.find(); // Fetch all tasks

      // Sort by dueDate if sortOrder is provided
      if (sortOrder) {
        const sortedTasks = allTasks.sort((a, b) => {
          const dateA = new Date(a.dueDate); // Convert dueDate string to Date
          const dateB = new Date(b.dueDate);
          return (sortOrder === 'ascend' ? 1 : -1) * (dateA - dateB);
        });

        return res.status(200).json(sortedTasks.map(task => ({
          ...task._doc,
          dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null,
          createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null,
          updatedAt: task.updatedAt ? dayjs(task.updatedAt).format('YYYY-MM-DD') : null,
        })));
      }

      // Return without sorting if sortOrder is null
      return res.status(200).json(allTasks.map(task => ({
        ...task._doc,
        dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null,
        createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null,
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).format('YYYY-MM-DD') : null,
      })));
    }

    // If filters were applied and no tasks match, return an empty array
    if (tasks.length === 0) {
      return res.status(200).json([]); // Return empty array
    }

    // Sort tasks by dueDate if sortOrder is provided
    if (sortOrder) {
      const sortedTasks = tasks.sort((a, b) => {
        const dateA = new Date(a.dueDate); // Convert dueDate string to Date
        const dateB = new Date(b.dueDate);
        return (sortOrder === 'ascend' ? 1 : -1) * (dateA - dateB);
      });

      const formattedTasks = sortedTasks.map(task => ({
        ...task._doc, // Spread the original task properties
        dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null, // Format dueDate
        createdAt: task.createdAt ? dayjs(task.createdAt).format('YYYY-MM-DD') : null, // Format createdAt
        updatedAt: task.updatedAt ? dayjs(task.updatedAt).format('YYYY-MM-DD') : null, // Format updatedAt
      }));

      // Return the formatted tasks
      return res.status(200).json(formattedTasks);
    }

    // If sortOrder is null, return tasks without sorting
    const formattedTasks = tasks.map(task => ({
      ...task._doc, // Spread the original task properties
      dueDate: task.dueDate ? dayjs(task.dueDate).format('YYYY-MM-DD') : null, // Format dueDate
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

    // Validate status
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }
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
      dueDate: task.dueDate, // dueDate is already in YYYY-MM-DD format
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

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, dueDate } = req.body;

    // Validate required fields
    if (!title || !description || !priority) {
      return res.status(400).json({ message: "Title, description, and priority are required." });
    }

    // Format the dueDate using Day.js
    const formattedDueDate = dueDate ? dayjs(dueDate).format('YYYY-MM-DD') : null;

    // Find the task by ID and update it with the new values
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        priority,
        dueDate: formattedDueDate,
      },
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
