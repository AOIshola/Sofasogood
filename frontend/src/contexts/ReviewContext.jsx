import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ReviewsContext = createContext();

export const ReviewsProvider = ({ children }) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all reviews (kept unchanged)
    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reviews');
                setReviews(response.data.reviews);
            } catch (error) {
                setError('Failed to fetch reviews');
                console.error('Error fetching reviews:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, []);

    // Fetch reviews for a specific product
    const getSingleProductReviews = async (productId) => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/reviews/product/${productId}`);
            return response.data.reviews; // Return the reviews for the specific product
        } catch (error) {
            setError('Failed to fetch product-specific reviews');
            console.error('Error fetching product reviews:', error);
            return []; // Return an empty array in case of an error
        } finally {
            setLoading(false);
        }
    };

    return (
        <ReviewsContext.Provider value={{ reviews, loading, error, getSingleProductReviews }}>
            {children}
        </ReviewsContext.Provider>
    );
};

// Custom hook to use reviews context
export const useReviews = () => useContext(ReviewsContext);

export default ReviewsContext;
