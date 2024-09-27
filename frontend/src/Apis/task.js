import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:4000';  // Base API URL

export const createTask = async (data) => {
    console.log('metadata: ', API_URL);
    return await axios.post(`${API_URL}/api/task/create`, data);
}

export const listingTask = async (sortOrder) => {
    return await axios.post(`${API_URL}/api/task/listing`, sortOrder);
};

export const updateTaskStatus = async (id, status) => {
    if (!['pending', 'completed'].includes(status)) {
        throw new Error("Invalid status value. Use 'pending' or 'completed'.");
    }
    return await axios.patch(`${API_URL}/api/task/${id}/status`, { status });
}

// Function to get a specific task by ID
export const getTaskById = async (id) => {
    return await axios.get(`${API_URL}/api/task/${id}`);
};

// Function to delete a specific task by ID
export const deleteTask = async (id) => {
    return await axios.delete(`${API_URL}/api/task/${id}`);
};