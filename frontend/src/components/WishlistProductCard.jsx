import React from 'react';
import './WishlistProductCard.css';

const WishlistProductCard = ({ product, handleRemove }) => {
    return (
        <div className="wishlist-product-card">
            <img src={product.imageUrl} alt={product.name} className="wishlist-product-image" />
            <div className="wishlist-product-details">
                <h3 className="wishlist-product-title">{product.name}</h3>
                <p className="wishlist-product-price">Price: ${product.price}</p>
                <button className="wishlist-remove-btn" onClick={() => handleRemove(product._id)}>
                    Remove from Wishlist
                </button>
            </div>
        </div>
    );
};

export default WishlistProductCard;