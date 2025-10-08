import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/api';
import Card from '../components/Card';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart, getCartItemsByRestaurant } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    address: '',
    city: 'Bangalore',
    pincode: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (cartItems.length === 0) {
      navigate('/cart');
      return;
    }
  }, [isAuthenticated, cartItems.length, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const orderData = {
        items: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          restaurantId: item.restaurantId,
          restaurantName: item.restaurantName
        })),
        totalAmount: getTotalPrice(),
        deliveryAddress: `${formData.address}, ${formData.city} - ${formData.pincode}`
      };

      const response = await orderAPI.create(orderData);
      
      if (response.data.success) {
        setOrderSuccess(true);
        clearCart();
      } else {
        setErrors({ general: response.data.message });
      }
    } catch (error) {
      setErrors({ 
        general: error.response?.data?.message || 'Failed to place order. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  const cartItemsByRestaurant = getCartItemsByRestaurant();

  if (orderSuccess) {
    return (
      <div className="checkout">
        <div className="checkout__container">
          <div className="checkout__success">
            <div className="checkout__success-icon">✅</div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your order. We'll start preparing your food right away.</p>
            <div className="checkout__success-actions">
              <Button onClick={() => navigate('/restaurants')}>
                Order More Food
              </Button>
              <Button variant="outline" onClick={() => navigate('/')}>
                Go Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__header">
          <h1 className="checkout__title">Checkout</h1>
          <p className="checkout__subtitle">Complete your order</p>
        </div>

        <div className="checkout__content">
          <div className="checkout__form-section">
            <Card className="checkout__form-card">
              <h2 className="checkout__form-title">Delivery Details</h2>
              
              {errors.general && (
                <div className="checkout__error">
                  {errors.general}
                </div>
              )}

              <form onSubmit={handleSubmit} className="checkout__form">
                <FormInput
                  label="Full Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  error={errors.address}
                  placeholder="Enter your complete address"
                  required
                />

                <div className="checkout__form-row">
                  <FormInput
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled
                    className="checkout__form-input--disabled"
                  />
                  
                  <FormInput
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    error={errors.pincode}
                    placeholder="560001"
                    required
                  />
                </div>

                <FormInput
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={errors.phone}
                  placeholder="9876543210"
                  required
                />

                <div className="checkout__form-actions">
                  <Button
                    type="submit"
                    loading={loading}
                    disabled={loading}
                    size="large"
                    className="checkout__place-order-btn"
                  >
                    Place Order
                  </Button>
                </div>
              </form>
            </Card>
          </div>

          <div className="checkout__summary-section">
            <Card className="checkout__summary-card">
              <h2 className="checkout__summary-title">Order Summary</h2>
              
              <div className="checkout__order-items">
                {Object.entries(cartItemsByRestaurant).map(([restaurantId, group]) => (
                  <div key={restaurantId} className="checkout__restaurant-group">
                    <h3 className="checkout__restaurant-name">{group.restaurantName}</h3>
                    
                    {group.items.map((item) => (
                      <div key={`${item.id}-${item.restaurantId}`} className="checkout__order-item">
                        <div className="checkout__item-details">
                          <span className="checkout__item-name">{item.name}</span>
                          <span className="checkout__item-quantity">× {item.quantity}</span>
                        </div>
                        <span className="checkout__item-price">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="checkout__summary-total">
                <div className="checkout__total-row">
                  <span>Subtotal</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="checkout__total-row">
                  <span>Delivery Fee</span>
                  <span>₹0.00</span>
                </div>
                <div className="checkout__total-row checkout__total-row--final">
                  <span>Total</span>
                  <span>₹{getTotalPrice().toFixed(2)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
