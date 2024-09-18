import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './singleProduct.css';
import "react-toastify/dist/ReactToastify.css";
import { useCart } from '../../contexts/CartContext';
import Navs from '../../Navigation/Nav';
import ReviewModal from '../../components/ReviewModal';
import { useReviews } from '../../contexts/ReviewContext';
import StarRating from '../../components/StarRating';

const SingleProduct = () => {
    const { id } = useParams(); // id refers to product ID
    const [product, setProduct] = useState(null);
    const [productReviews, setProductReviews] = useState([]); // To store product-specific reviews
    const [baseUrl, setBaseUrl] = useState('http://localhost:5000/api');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToCart } = useCart();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showReview, setShowReview] = useState(false);

    const { getSingleProductReviews } = useReviews(); // Import the function from context

    const toggleShowReviews = () => {
        setShowReview(!showReview);
    };

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${baseUrl}/products/${id}`);
                setProduct(response.data.product);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch product details.');
                setLoading(false);
            }
        };

        const fetchProductReviews = async () => {
            try {
                const reviews = await getSingleProductReviews(id); // Fetch product-specific reviews
                setProductReviews(reviews);
            } catch (err) {
                console.error('Failed to fetch reviews:', err);
            }
        };

        fetchProduct();
        fetchProductReviews(); // Fetch the reviews when the product loads
    }, [id, baseUrl, getSingleProductReviews]);

    const handleAddToCart = async () => {
        await addToCart(id);
    };

    const handleAddToWishlist = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${baseUrl}/wishlists/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            toast.success('Added to wishlist!');
        } catch (error) {
            setError(error);
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const handleSubmitReview = async (reviewData) => {
        try {
            const token = localStorage.getItem('token');
            await axios.post(`${baseUrl}/reviews`, { ...reviewData, product: id }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            alert('Review submitted successfully!');
            setIsModalOpen(false); // Close modal after submitting
        } catch (error) {
            console.error(error);
            alert('Failed to submit review');
        }
    };

    if (loading) return <p>Loading product details...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <Navs />
            <div className="singleProduct">
                <img src={`/${product.imageUrl}`} alt={product.name} className="productImage" />
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <p>Price: {product.price}</p>
                <div className='btn-div'>
                    <button onClick={handleAddToCart} className='add-cart' >Add to Cart</button>
                    <button onClick={handleAddToWishlist} className='add-cart' >Add to Wishlist</button>
                    <button onClick={openModal} className='add-cart'>Leave a Review</button>
                </div>
                <button onClick={toggleShowReviews}>Check Reviews</button>
            </div>
            {showReview && productReviews && (
                <div className='reviews'>
                    <h3>Reviews</h3>
                    {productReviews.map((review) => (
                        <div className='product-review' key={review._id}>
                            <p>Customer name: {review.user.name}</p>
                            <div style={{ display: 'flex', margin: 'auto' }}>Rating: <StarRating rating={review.rating} /></div>
                            <p>Review: {review.comment}</p>
                        </div>
                    ))}
                </div>
            )}

            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleSubmitReview}
            />
            <ToastContainer />
        </>
    );
};

export default SingleProduct;
