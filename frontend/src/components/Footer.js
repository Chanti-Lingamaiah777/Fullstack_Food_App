import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">🍽️ FoodieHub</h3>
            <p className="footer__description">
              Your favorite food delivery app. Order delicious meals from the best restaurants in your city.
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Quick Links</h4>
            <ul className="footer__links">
              <li><Link to="/restaurants" className="footer__link">Restaurants</Link></li>
              <li><Link to="/cart" className="footer__link">My Cart</Link></li>
              <li><Link to="/login" className="footer__link">Login</Link></li>
              <li><Link to="/signup" className="footer__link">Sign Up</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Cuisines</h4>
            <ul className="footer__links">
              <li><Link to="/restaurants?cuisine=South-Indian" className="footer__link">South Indian</Link></li>
              <li><Link to="/restaurants?cuisine=North-Indian" className="footer__link">North Indian</Link></li>
              <li><Link to="/restaurants?cuisine=Biryani" className="footer__link">Biryani</Link></li>
              <li><Link to="/restaurants?cuisine=Italian" className="footer__link">Italian</Link></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Contact</h4>
            <div className="footer__contact">
              <p>📧 support@foodiehub.com</p>
              <p>📞 +91 9876543210</p>
              <p>📍 Bangalore, India</p>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2024 FoodieHub. All rights reserved.
          </p>
          <div className="footer__social">
            <a href="https://facebook.com" className="footer__social-link" aria-label="Facebook">📘</a>
            <a href="https://twitter.com" className="footer__social-link" aria-label="Twitter">🐦</a>
            <a href="https://instagram.com" className="footer__social-link" aria-label="Instagram">📷</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
