import axios from "axios";
const API_URL = 'http://localhost:8000/api';

export const getUser = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/user`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.message || 'Failed to fetch user');
    }
};

export const updateUser = async (token, userData) => {
    try {
        const response = await axios.put(`${API_URL}/user`, userData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to update user');
    }
};

export const changePassword = async (token, passwordData) => {
    try {
        const response = await axios.put(`${API_URL}/user/change/password`, passwordData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message || 'Failed to change password');
    }
}
