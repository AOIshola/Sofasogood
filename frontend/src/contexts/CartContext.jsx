import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const axiosInstance = axios.create({
        baseURL: 'http://localhost:5000/api',
    });

    axiosInstance.interceptors.request.use((config) => {
        const token = localStorage.getItem('token');
        // console.log(token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const fetchCart = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/cart');
            setCart(response.data.cart);
            setLoading(false);
        } catch (err) {
            setError('Failed to load cart items.');
            setLoading(false);
        }
    };

    const addToCart = async (productId) => {
        // const token = localStorage.getItem('token');
        // console.log(token);
        try {
            const response = await axiosInstance.post('/cart', { productId, quantity: 1 });
            fetchCart();
            alert('Product added to cart!');
        } catch (err) {
            console.log(axiosInstance.defaults.headers);
            alert('Failed to add product to cart.');
        }
    };

    const removeFromCart = async (productId) => {
        try {
            await axiosInstance.delete(`/cart/${productId}`);
            fetchCart();
            alert('Product removed from cart.');
        } catch (err) {
            alert('Failed to remove product from cart.');
        }
    };

    const updateQuantity = async (productId, newQuantity) => {
        console.log({ productId, newQuantity });
        if (newQuantity < 1) return;
        try {
            await axiosInstance.put('/cart', { productId, quantity: newQuantity });
            fetchCart();
        } catch (err) {
            alert('Failed to update quantity.');
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, loading, error, fetchCart, addToCart, removeFromCart, updateQuantity }}>
            {children}
        </CartContext.Provider>
    );

};

export const useCart = () => useContext(CartContext);

export default CartContext;