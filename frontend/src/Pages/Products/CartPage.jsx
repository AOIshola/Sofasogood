import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import ProductCard from '../../components/ProductCard';
import './CartPage.css';
import Navs from '../../Navigation/Nav';

const CartPage = () => {
    const { cart, loading, error, fetchCart, removeFromCart, updateQuantity } = useCart();
    const [localCart, setLocalCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        fetchCart();
    }, []);

    useEffect(() => {
        if (cart && cart.items) {
            setLocalCart(cart.items);
            calculateTotal(cart.items);
        }
    }, [cart]);

    const calculateTotal = (items) => {
        const cartTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
        setTotal(cartTotal);
    };

    const handleRemove = (productId) => {
        removeFromCart(productId);
        const updatedCart = localCart.filter(item => item.product._id !== productId);
        setLocalCart(updatedCart);
        calculateTotal(updatedCart);
    };

    const handleQuantityChange = (productId, newQuantity) => {
        if (newQuantity < 1) return;
        const updatedCart = localCart.map(item =>
            item.product._id === productId ? { ...item, quantity: newQuantity } : item
        );
        setLocalCart(updatedCart);
        calculateTotal(updatedCart);
    };

    if (loading) return <p>Loading...</p>;
    // if (error) return <p>{error}</p>;

    return (
        <>
            <Navs />
            <div className="cart-page">
                <h1>Your Cart</h1>
                {localCart.length > 0 ? (
                    <div className="cart-items">
                        {localCart.map((item) => (
                            <ProductCard
                                key={item.product._id}
                                product={item.product}
                                quantity={item.quantity}
                                handleRemove={handleRemove}
                                handleQuantityChange={handleQuantityChange}
                            />
                        ))}
                        <h2 className="cart-total">Total: ${total.toFixed(2)}</h2>
                    </div>
                ) : (
                    <p>Your cart is empty.</p>
                )}
            </div>
        </>
    );
};

export default CartPage;