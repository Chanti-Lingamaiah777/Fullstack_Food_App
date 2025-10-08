import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { restaurantAPI, menuAPI } from '../services/api';
import { useCart } from '../contexts/CartContext';
import MenuItemCard from '../components/MenuItemCard';
import Button from '../components/Button';
import './RestaurantDetails.css';
import { FALLBACK_IMAGE } from '../constants/images';
import { imageOverridesByName } from '../constants/imageOverrides';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    veg: '',
    sortBy: '',
    search: ''
  });

  const fetchRestaurantDetails = async () => {
    try {
      const response = await restaurantAPI.getById(id);
      if (response.data.success) {
        const data = response.data.data;
        const normalized = {
          ...data,
          imageUrl: imageOverridesByName[data.name] || data.imageUrl || data.image_url
        };
        setRestaurant(normalized);
      } else {
        setError('Restaurant not found');
      }
    } catch (err) {
      setError('Failed to load restaurant details');
      console.error('Error fetching restaurant:', err);
    }
  };

  const fetchMenuItems = async () => {
    try {
      const response = await menuAPI.getByRestaurant(id, filters);
      if (response.data.success) {
        setMenuItems(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching menu items:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      veg: '',
      sortBy: '',
      search: ''
    });
  };

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  useEffect(() => {
    if (restaurant) {
      fetchMenuItems();
    }
  }, [id, filters, restaurant]);

  if (loading) {
    return (
      <div className="restaurant-details">
        <div className="restaurant-details__loading">
          <div className="restaurant-details__spinner"></div>
          <p>Loading restaurant details...</p>
        </div>
      </div>
    );
  }

  if (error || !restaurant) {
    return (
      <div className="restaurant-details">
        <div className="restaurant-details__error">
          <h2>Restaurant Not Found</h2>
          <p>{error || 'The restaurant you are looking for does not exist.'}</p>
          <Button onClick={() => navigate('/restaurants')}>
            Back to Restaurants
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-details">
      <div className="restaurant-details__container">
        {/* Restaurant Header */}
        <div className="restaurant-details__header">
          <div className="restaurant-details__image">
            <img 
              src={restaurant.imageUrl || restaurant.image_url || FALLBACK_IMAGE} 
              alt={restaurant.name}
              onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
            />
          </div>
          
          <div className="restaurant-details__info">
            <h1 className="restaurant-details__name">{restaurant.name}</h1>
            <p className="restaurant-details__cuisine">{restaurant.cuisine}</p>
            <p className="restaurant-details__area">{restaurant.area}</p>
            
            <div className="restaurant-details__stats">
              <div className="restaurant-details__stat">
                <span className="restaurant-details__stat-label">Rating</span>
                <span className="restaurant-details__stat-value">
                  ⭐ {restaurant.rating}
                </span>
              </div>
              <div className="restaurant-details__stat">
                <span className="restaurant-details__stat-label">Cost for Two</span>
                <span className="restaurant-details__stat-value">
                  ₹{restaurant.avg_cost_for_two}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Filters */}
        <div className="restaurant-details__filters">
          <div className="restaurant-details__filter-group">
            <input
              type="text"
              placeholder="Search menu items..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="restaurant-details__search-input"
            />
          </div>

          <div className="restaurant-details__filter-group">
            <select
              value={filters.veg}
              onChange={(e) => handleFilterChange('veg', e.target.value)}
              className="restaurant-details__filter-select"
            >
              <option value="">All Items</option>
              <option value="true">Vegetarian Only</option>
              <option value="false">Non-Vegetarian Only</option>
            </select>
          </div>

          <div className="restaurant-details__filter-group">
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="restaurant-details__filter-select"
            >
              <option value="">Sort by Name</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>

          <button 
            onClick={clearFilters}
            className="restaurant-details__clear-filters"
          >
            Clear Filters
          </button>
        </div>

        {/* Menu Items */}
        <div className="restaurant-details__menu">
          <h2 className="restaurant-details__menu-title">Menu</h2>
          
          {menuItems.length === 0 ? (
            <div className="restaurant-details__empty-menu">
              <div className="restaurant-details__empty-icon">🍽️</div>
              <h3>No menu items found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <div className="restaurant-details__menu-grid">
              {menuItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  restaurantId={restaurant.id}
                  restaurantName={restaurant.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
