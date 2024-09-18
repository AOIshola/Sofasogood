import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ErrorPage.css'; // Import the CSS file

function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="error-page-container">
      <div className="error-page-content">
        <div className="error-page-box">
          <div className="error-page-header">
            <h1 className="error-page-title">404</h1>
            <h1 className="error-page-subtitle">Oops! Page not found</h1>
            <p className="error-page-text">
              Oops! The page you are looking for does not exist. It might have been moved or deleted. Let's take you
              <em className="error-page-link">
                <Link to="/">home</Link>
              </em>
            </p>
            <button
              className="error-page-button"
              onClick={() => navigate('/')}
            >
              HOME
            </button>
            <button
              className="error-page-button"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;