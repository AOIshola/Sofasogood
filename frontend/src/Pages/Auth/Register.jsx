// Register.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';
import Navs from '../../Navigation/Nav';

function Register() {
    const { register, loading, error } = useAuth();
    const [userDetails, setUserDetails] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        register(userDetails);
    };

    return (
        <>
            <Navs />
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Register</h2>
                    {error && <p className="auth-error">{error}</p>}
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                        required
                    />
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={userDetails.email}
                        onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                        required
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={userDetails.password}
                        onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
                        required
                    />
                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default Register;