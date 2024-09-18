import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css'; // Import the CSS file
import Navs from '../../Navigation/Nav';

const ForgotPassword = () => {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await forgotPassword(email);
            setMessage('Password reset email sent successfully!');
            setEmail('');
        } catch (error) {
            setMessage(error.message || 'Failed to send reset link.');
        }
    };

    return (
        <>
            <Navs />
            <div className="auth-container">
                <h2>Forgot Password</h2>
                {message && <div className={message.includes('success') ? 'success' : 'error'}>{message}</div>}
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit">Send Reset Link</button>
                </form>
            </div>
        </>
    );
};

export default ForgotPassword;