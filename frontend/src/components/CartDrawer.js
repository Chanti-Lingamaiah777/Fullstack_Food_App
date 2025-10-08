import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Button from './Button';
import { FALLBACK_IMAGE } from '../constants/images';
import './CartDrawer.css';

const CartDrawer = () => {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice 
  } = useCart();
  const { isAuthenticated } = useAuth();

  const handleQuantityChange = (itemId, restaurantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, restaurantId);
    } else {
      updateQuantity(itemId, restaurantId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      window.location.href = '/login';
      return;
    }
    setIsCartOpen(false);
    window.location.href = '/checkout';
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-drawer">
      <div className="cart-drawer__overlay" onClick={() => setIsCartOpen(false)}></div>
      
      <div className="cart-drawer__content">
        <div className="cart-drawer__header">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button 
            className="cart-drawer__close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        <div className="cart-drawer__body">
          {cartItems.length === 0 ? (
            <div className="cart-drawer__empty">
              <div className="cart-drawer__empty-icon">🛒</div>
              <h3>Your cart is empty</h3>
              <p>Add some delicious items to get started!</p>
              <Link to="/restaurants">
                <Button onClick={() => setIsCartOpen(false)}>
                  Browse Restaurants
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-drawer__items">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.restaurantId}`} className="cart-drawer__item">
                    <div className="cart-drawer__item-image">
                      <img 
                        src={item.image_url || item.imageUrl || FALLBACK_IMAGE} 
                        alt={item.name} 
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    
                    <div className="cart-drawer__item-details">
                      <h4 className="cart-drawer__item-name">{item.name}</h4>
                      <p className="cart-drawer__item-restaurant">{item.restaurantName}</p>
                      <div className="cart-drawer__item-price">
                        ₹{item.price} × {item.quantity}
                      </div>
                    </div>

                    <div className="cart-drawer__item-controls">
                      <div className="cart-drawer__quantity-controls">
                        <button 
                          className="cart-drawer__quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.restaurantId, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="cart-drawer__quantity">{item.quantity}</span>
                        <button 
                          className="cart-drawer__quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.restaurantId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button 
                        className="cart-drawer__remove-btn"
                        onClick={() => removeFromCart(item.id, item.restaurantId)}
                        aria-label="Remove item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-drawer__footer">
                <div className="cart-drawer__total">
                  <span className="cart-drawer__total-label">Total:</span>
                  <span className="cart-drawer__total-amount">₹{getTotalPrice().toFixed(2)}</span>
                </div>
                
                <div className="cart-drawer__actions">
                  <Link to="/cart">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsCartOpen(false)}
                      className="cart-drawer__view-cart-btn"
                    >
                      View Cart
                    </Button>
                  </Link>
                  <Button 
                    onClick={handleCheckout}
                    className="cart-drawer__checkout-btn"
                  >
                    {isAuthenticated ? 'Checkout' : 'Login to Checkout'}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
