import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/LoginForm';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = () => {
    navigate('/');
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__content">
          <div className="login__header">
            <h1 className="login__title">Welcome to FoodieHub</h1>
            <p className="login__subtitle">
              Sign in to your account to start ordering delicious food
            </p>
          </div>

          <LoginForm onSuccess={handleLoginSuccess} />

          <div className="login__footer">
            <p className="login__footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="login__footer-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>

        <div className="login__image">
          <div className="login__image-content">
            <h2>Delicious Food Awaits</h2>
            <p>Order from your favorite restaurants and enjoy fresh, hot meals delivered to your door.</p>
            <div className="login__features">
              <div className="login__feature">
                <span className="login__feature-icon">🚚</span>
                <span>Fast Delivery</span>
              </div>
              <div className="login__feature">
                <span className="login__feature-icon">🍽️</span>
                <span>Fresh Food</span>
              </div>
              <div className="login__feature">
                <span className="login__feature-icon">⭐</span>
                <span>Top Rated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
