import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import Button from './Button';
import CartDrawer from './CartDrawer';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getTotalItems, isCartOpen, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = getTotalItems();

  return (
    <>
      <nav className="navbar">
        <div className="navbar__container">
          {/* Logo */}
          <Link to="/" className="navbar__logo">
            🍽️ FoodieHub
          </Link>

          {/* Search Bar */}
          <form className="navbar__search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search restaurants or dishes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="navbar__search-input"
            />
            <button type="submit" className="navbar__search-button">
              🔍
            </button>
          </form>

          {/* Desktop Navigation */}
          <div className="navbar__nav">
            <Link to="/restaurants" className="navbar__link">
              Restaurants
            </Link>
            
            {isAuthenticated ? (
              <>
                <button 
                  className="navbar__cart-button"
                  onClick={toggleCart}
                  aria-label="Shopping cart"
                >
                  🛒
                  {cartItemCount > 0 && (
                    <span className="navbar__cart-badge">{cartItemCount}</span>
                  )}
                </button>
                
                <div className="navbar__user-menu">
                  <button 
                    className="navbar__user-button"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="User menu"
                  >
                    👤 {user?.name}
                  </button>
                  
                  {isMenuOpen && (
                    <div className="navbar__dropdown">
                      <Link 
                        to="/cart" 
                        className="navbar__dropdown-item"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        My Cart
                      </Link>
                      <button 
                        className="navbar__dropdown-item"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="navbar__auth">
                <Link to="/login">
                  <Button variant="outline" size="small">Login</Button>
                </Link>
                <Link to="/signup">
                  <Button size="small">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="navbar__mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar__mobile-menu">
            <Link 
              to="/restaurants" 
              className="navbar__mobile-link"
              onClick={() => setIsMenuOpen(false)}
            >
              Restaurants
            </Link>
            
            {isAuthenticated ? (
              <>
                <button 
                  className="navbar__mobile-link"
                  onClick={() => {
                    toggleCart();
                    setIsMenuOpen(false);
                  }}
                >
                  Cart ({cartItemCount})
                </button>
                <button 
                  className="navbar__mobile-link"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="navbar__mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="navbar__mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  );
};

export default Navbar;
