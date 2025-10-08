import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import SignupForm from '../components/SignupForm';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSignupSuccess = () => {
    navigate('/');
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__content">
          <div className="signup__header">
            <h1 className="signup__title">Join FoodieHub</h1>
            <p className="signup__subtitle">
              Create your account and start exploring amazing restaurants
            </p>
          </div>

          <SignupForm onSuccess={handleSignupSuccess} />

          <div className="signup__footer">
            <p className="signup__footer-text">
              Already have an account?{' '}
              <Link to="/login" className="signup__footer-link">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        <div className="signup__image">
          <div className="signup__image-content">
            <h2>Discover Amazing Food</h2>
            <p>Join thousands of food lovers who trust us for their daily meals.</p>
            <div className="signup__benefits">
              <div className="signup__benefit">
                <span className="signup__benefit-icon">🎯</span>
                <div>
                  <h3>Personalized Recommendations</h3>
                  <p>Get food suggestions based on your preferences</p>
                </div>
              </div>
              <div className="signup__benefit">
                <span className="signup__benefit-icon">💳</span>
                <div>
                  <h3>Easy Payments</h3>
                  <p>Secure and hassle-free payment options</p>
                </div>
              </div>
              <div className="signup__benefit">
                <span className="signup__benefit-icon">📱</span>
                <div>
                  <h3>Track Your Orders</h3>
                  <p>Real-time updates on your food delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
