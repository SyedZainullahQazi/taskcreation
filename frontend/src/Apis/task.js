import axios from 'axios'

export const createTask=async (data)=>{
    console.log('metadata: ',import.meta.env.VITE_API_URL);
    return await axios.post(`http://127.0.0.1:4000/api/task/create`,data);
}