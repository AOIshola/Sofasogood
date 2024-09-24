import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';
import Navs from '../../Navigation/Nav';

const ProfilePage = () => {
    const { currentUser, logout, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser && !loading) {
            navigate('/login');
        }
    }, [currentUser]);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    const formattedDate = new Date(currentUser.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <>
            <Navs />
            <div className="profile-page">
                <div className="profile-container">
                    <div className="profile-card">
                        <img
                            src={currentUser.avatar || '/png/logoPic.png'}
                            alt="Profile Avatar"
                            className="profile-avatar"
                        />
                        <h2 className="profile-name">{currentUser.name}</h2>
                        <p className="profile-email">{currentUser.email}</p>
                        <p className="profile-created-at">Joined on: {formattedDate}</p>
                        <button className="logout-button" onClick={logout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProfilePage;