import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        localStorage.removeItem('cart');
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item, restaurantId, restaurantName) => {
    setCartItems(prevItems => {
      // Check if item already exists in cart
      const existingItem = prevItems.find(
        cartItem => cartItem.id === item.id && cartItem.restaurantId === restaurantId
      );

      if (existingItem) {
        // Update quantity
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.restaurantId === restaurantId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // Add new item
        return [
          ...prevItems,
          {
            ...item,
            restaurantId,
            restaurantName,
            quantity: 1
          }
        ];
      }
    });
  };

  const removeFromCart = (itemId, restaurantId) => {
    setCartItems(prevItems =>
      prevItems.filter(
        item => !(item.id === itemId && item.restaurantId === restaurantId)
      )
    );
  };

  const updateQuantity = (itemId, restaurantId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId, restaurantId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId && item.restaurantId === restaurantId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsByRestaurant = () => {
    const restaurantGroups = {};
    cartItems.forEach(item => {
      if (!restaurantGroups[item.restaurantId]) {
        restaurantGroups[item.restaurantId] = {
          restaurantName: item.restaurantName,
          items: []
        };
      }
      restaurantGroups[item.restaurantId].items.push(item);
    });
    return restaurantGroups;
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    getCartItemsByRestaurant
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
