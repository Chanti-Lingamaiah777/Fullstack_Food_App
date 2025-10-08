import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/Card';
import Button from '../components/Button';
import './Cart.css';

const Cart = () => {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    getTotalPrice,
    getCartItemsByRestaurant 
  } = useCart();
  const { isAuthenticated } = useAuth();

  const cartItemsByRestaurant = getCartItemsByRestaurant();

  const handleQuantityChange = (itemId, restaurantId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId, restaurantId);
    } else {
      updateQuantity(itemId, restaurantId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      window.location.href = '/login';
      return;
    }
    window.location.href = '/checkout';
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart">
        <div className="cart__container">
          <div className="cart__empty">
            <div className="cart__empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <Link to="/restaurants">
              <Button size="large">
                Browse Restaurants
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart__container">
        <div className="cart__header">
          <h1 className="cart__title">Your Cart</h1>
          <p className="cart__subtitle">
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div className="cart__content">
          <div className="cart__items">
            {Object.entries(cartItemsByRestaurant).map(([restaurantId, group]) => (
              <Card key={restaurantId} className="cart__restaurant-group">
                <h3 className="cart__restaurant-name">{group.restaurantName}</h3>
                
                <div className="cart__restaurant-items">
                  {group.items.map((item) => (
                    <div key={`${item.id}-${item.restaurantId}`} className="cart__item">
                      <div className="cart__item-image">
                        <img src={item.image_url} alt={item.name} />
                      </div>
                      
                      <div className="cart__item-details">
                        <h4 className="cart__item-name">{item.name}</h4>
                        <div className="cart__item-price">
                          ₹{item.price}
                        </div>
                        {item.veg && (
                          <span className="cart__item-veg" title="Vegetarian">🥬</span>
                        )}
                      </div>

                      <div className="cart__item-controls">
                        <div className="cart__quantity-controls">
                          <button 
                            className="cart__quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.restaurantId, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span className="cart__quantity">{item.quantity}</span>
                          <button 
                            className="cart__quantity-btn"
                            onClick={() => handleQuantityChange(item.id, item.restaurantId, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="cart__item-total">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </div>
                        
                        <button 
                          className="cart__remove-btn"
                          onClick={() => removeFromCart(item.id, item.restaurantId)}
                          aria-label="Remove item"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="cart__summary">
            <Card className="cart__summary-card">
              <h3 className="cart__summary-title">Order Summary</h3>
              
              <div className="cart__summary-details">
                <div className="cart__summary-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="cart__summary-row">
                  <span>Delivery Fee</span>
                  <span>₹0.00</span>
                </div>
                <div className="cart__summary-row cart__summary-row--total">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>

              <div className="cart__summary-actions">
                <Link to="/restaurants">
                  <Button variant="outline" className="cart__continue-shopping">
                    Continue Shopping
                  </Button>
                </Link>
                <Button 
                  size="large"
                  onClick={handleCheckout}
                  className="cart__checkout-btn"
                >
                  {isAuthenticated ? 'Proceed to Checkout' : 'Login to Checkout'}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
