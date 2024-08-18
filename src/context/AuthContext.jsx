import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_URL;



export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => sessionStorage.getItem('token'));

    const logIn = async (email, password) => {
        try {
            const response = await axios.post(`${API_URL}/auth/LogIn`, { user_email: email, password: password });
            const data = response.data;

            setToken(data.token);
            sessionStorage.setItem('token', data.token);
        } catch (error) {
            if (error.response) {
                throw new Error(error.response.data.error);
            } else {
                throw new Error("An error occurred logging in. Please try again");
            }
        }
    };

    const logOut = () => {
        setToken(null);
        sessionStorage.removeItem('token');
    };

    const isLoggedIn = () => {
        return !!token;
    };

    return (
        <AuthContext.Provider value={{ token, logIn, logOut, isLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};