import axios from "axios";
const API_URL = 'http://localhost:8000/api';

export const registerUser  = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/signup`, userData,{
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export const loginUser = async (userData) => {

    try {
        const response = await axios.post(`${API_URL}/auth/login`, userData, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
