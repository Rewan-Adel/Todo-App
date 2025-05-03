import axios from "axios";
const API_URL = 'https://your-backend-domain.com/api';

export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/task/get/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch tasks');
    }
};

export const getTask = async (token, taskId) => {
    try {
        const response = await axios.get(`${API_URL}/task/get/one/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch task');
    }
};

export const addTask = async (token, taskData) => {
    try {
        const response = await axios.post(`${API_URL}/task/create`, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const updateTask = async (token, taskId, taskData) => {
    try{
        const response = await axios.put(`${API_URL}/task/update/${taskId}`, taskData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data;
    }catch (error) {
        throw new Error(error.response.data.message || 'Failed to update task');
    }
};

export const deleteTask = async (token, taskId) => {
    try{
        const response = await axios.delete(`${API_URL}/task/delete/one/${taskId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error) {
        throw new Error(error.response.data.message || 'Failed to delete task');
    }
};

export const deleteAllTasks = async (token) => {
    try{
        const response = await axios.delete(`${API_URL}/task/delete/all`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return 'All tasks deleted successfully';
    }catch (error) {
        throw new Error(error.response.data.message || 'Failed to delete all tasks');
    }
};

export const markTask = async (token, taskId) => {
    try{
        const response = await axios.put(`${API_URL}/task/mark/${taskId}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error) {
        throw new Error(error.response.data.message || 'Failed to mark task');
    }
};

export const filterTasks = async (token, status) => {
    try{
        const response = await axios.get(`${API_URL}/task/filter/${status}`, {
            headers: {  
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    }catch (error) {
        throw new Error(error.response.data.message || 'Failed to filter tasks');
    }
};

export const searchTasks = async (token, title) => {
    try{
        const response = await axios.get(`${API_URL}/task/get/title/${title}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message || 'Failed to search tasks');
    }
}
