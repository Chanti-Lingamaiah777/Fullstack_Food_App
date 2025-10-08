import React from 'react';
import { useCart } from '../contexts/CartContext';
import Card from './Card';
import { FALLBACK_IMAGE } from '../constants/images';
import Button from './Button';
import './MenuItemCard.css';

const MenuItemCard = ({ 
  item, 
  restaurantId, 
  restaurantName, 
  showAddButton = true 
}) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(item, restaurantId, restaurantName);
  };

  return (
    <Card className="menu-item-card" hoverable>
      <div className="menu-item-card__image-container">
        <img 
          src={item.image_url || item.imageUrl || FALLBACK_IMAGE} 
          alt={item.name}
          className="menu-item-card__image"
          loading="lazy"
          onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
        />
        {item.veg && (
          <span className="menu-item-card__veg-badge" title="Vegetarian">
            🥬
          </span>
        )}
      </div>
      
      <div className="menu-item-card__content">
        <h3 className="menu-item-card__name">{item.name}</h3>
        <p className="menu-item-card__description">{item.description}</p>
        
        <div className="menu-item-card__footer">
          <div className="menu-item-card__price">
            <span className="menu-item-card__currency">₹</span>
            <span className="menu-item-card__amount">{item.price}</span>
          </div>
          
          {showAddButton && (
            <Button 
              size="small" 
              onClick={handleAddToCart}
              className="menu-item-card__add-button"
            >
              Add
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
