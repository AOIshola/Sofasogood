import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WishlistProductCard from '../components/WishlistProductCard';
import './WishlistPage.css';
import Navs from '../Navigation/Nav';
import { Link } from 'react-router-dom';

const WishlistPage = () => {
    const [wishlist, setWishlist] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const baseUrl = 'http://localhost:5000/api'
        const fetchWishlist = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`${baseUrl}/wishlists`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setWishlist(response.data.products);
            } catch (err) {
                setError('Failed to load wishlist.');
            }
        };

        fetchWishlist();
    }, []);

    const handleRemove = async (productId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/wishlists/${productId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            setWishlist(wishlist.filter(product => product._id !== productId));
        } catch (err) {
            setError('Failed to remove product from wishlist.');
        }
    };

    return (
        <>
            <Navs />
            <div className="wishlist-page">
                <h1>Your Wishlist</h1>
                {error && <p className="error">{error}</p>}
                {wishlist.length > 0 ? <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <Link to={`/product/${product._id}`} key={product._id}>
                            <WishlistProductCard
                                product={product}
                                handleRemove={handleRemove}
                            />
                        </Link>
                    ))}
                </div>
                    :
                    <p>You do not have any items in your wishlist</p>
                }
            </div>
        </>
    );
};

export default WishlistPage;