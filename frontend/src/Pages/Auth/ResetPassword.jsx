import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useParams } from 'react-router-dom';
import './Auth.css'; // Import the CSS file

const ResetPassword = () => {
    const { resetToken } = useParams();
    const { resetPassword } = useAuth();
    const [newPassword, setNewPassword] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match!');
            return;
        }

        try {
            await resetPassword(resetToken, email, newPassword, confirmPassword);
            setMessage('Password reset successfully!');
        } catch (error) {
            setMessage(error.message || 'Password reset failed.');
        }
    };

    return (
        <div className="auth-container">
            <h2>Reset Password</h2>
            {message && <div className={message.includes('success') ? 'success' : 'error'}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;