import React, {createContext, useContext, useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {loginUser, registerUser} from "../../../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const navigate              = useNavigate();  
    const [user, setUser]       = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for user token on app load 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setUser(token);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await loginUser({email, password});
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            throw error;
        }
    };

    const signup =async(name, email, phone, password) =>{
        try{
            const response = await registerUser({name, email, phone, password});
            setUser(response.data.user);
            console.log(response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');

        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <AuthContext.Provider value={{user, signup, login, logout, loading}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);
