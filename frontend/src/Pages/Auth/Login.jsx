import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navs from '../../Navigation/Nav';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function Login() {
    const { login, loading, error, currentUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    useEffect(() => {
        console.log(currentUser);
        if (currentUser) {
            navigate('/', { replace: true });
        }
    }, [currentUser]);

    return (
        <>
            <Navs />
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="auth-button" type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    <Link to={'/forgot-password'}>forgot password</Link>
                </form>
            </div>
        </>
    );
}

export default Login;