// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            // console.log(response.data.token);
            setLoading(false);
            navigate('/');
        } catch (err) {
            setError(err.response.data.msg);
            setLoading(false);
        }
    };

    const register = async (userDetails) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', userDetails);
            // console.log(response);
            setUser(response.data.user);
            localStorage.setItem('token', response.data.token);
            setLoading(false);
            navigate('/');
            toast.success(`${response.data.msg}`)
        } catch (err) {
            setError(err.response.data.msg);
            setLoading(false);
            toast.error(`${err.response.data.msg}`)
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login');
    };

    const checkLoggedIn = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/profile', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data.user);
            } catch (err) {
                logout();
            }
        }
    };

    const forgotPassword = async (email) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            console.log(response);
            setLoading(false);
            alert('Password reset email sent successfully!');
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    };

    const resetPassword = async (resetToken, email, newPassword, confirmPassword) => {
        setLoading(true);
        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password`, {
                token: resetToken,
                email,
                password: newPassword
            });
            console.log(response);
            setLoading(false);
            alert('Password reset successful. You can now log in.');
            navigate('/login');
        } catch (err) {
            setError(err.response.data.message);
            setLoading(false);
        }
    };


    useEffect(() => {
        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{
            currentUser,
            login,
            register,
            logout,
            forgotPassword,
            resetPassword,
            loading,
            error
        }}>
            {children}
            <ToastContainer />
        </AuthContext.Provider>
    );
};

export const useAuth = () => { return useContext(AuthContext) };

export default AuthContext;