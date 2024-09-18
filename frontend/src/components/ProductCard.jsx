import React from 'react';

const ProductCard = ({ product, quantity, handleRemove, handleQuantityChange }) => {
    return (
        <div className="product-card">
            <img src={product.imageUrl} alt={product.title} className="product-image" />
            <div className="product-details">
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Price: ${product.price}</p>
                <div className="quantity-controls">
                    <button onClick={() => handleQuantityChange(product._id, quantity - 1)}>-</button>
                    <span className="quantity">{quantity}</span>
                    <button onClick={() => handleQuantityChange(product._id, quantity + 1)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => handleRemove(product._id)}>Remove</button>
            </div>
        </div>
    );
};

export default ProductCard;
