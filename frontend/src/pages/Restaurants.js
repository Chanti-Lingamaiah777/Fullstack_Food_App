import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import Card from '../components/Card';
import { FALLBACK_IMAGE } from '../constants/images';
import { imageOverridesByName } from '../constants/imageOverrides';
import './Restaurants.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    cuisine: searchParams.get('cuisine') || '',
    search: searchParams.get('search') || '',
    minRating: '',
    maxCost: ''
  });

  const fetchRestaurants = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let response;
      
      if (filters.search) {
        response = await restaurantAPI.search(filters.search);
      } else if (filters.cuisine) {
        response = await restaurantAPI.getByCuisine(filters.cuisine);
      } else {
        const filterParams = {};
        if (filters.minRating) filterParams.minRating = filters.minRating;
        if (filters.maxCost) filterParams.maxCost = filters.maxCost;
        
        if (Object.keys(filterParams).length > 0) {
          response = await restaurantAPI.getWithFilters(filterParams);
        } else {
          response = await restaurantAPI.getAll();
        }
      }
      
      if (response.data.success) {
        const normalized = response.data.data.map(r => ({
          ...r,
          imageUrl: imageOverridesByName[r.name] || r.imageUrl || r.image_url
        }));
        setRestaurants(normalized);
      }
    } catch (err) {
      setError('Failed to load restaurants');
      console.error('Error fetching restaurants:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    
    // Update URL params
    const newSearchParams = new URLSearchParams();
    Object.entries(newFilters).forEach(([k, v]) => {
      if (v) newSearchParams.set(k, v);
    });
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setFilters({
      cuisine: '',
      search: '',
      minRating: '',
      maxCost: ''
    });
    setSearchParams({});
  };

  const cuisineOptions = [
    { value: '', label: 'All Cuisines' },
    { value: 'South-Indian', label: 'South Indian' },
    { value: 'North-Indian', label: 'North Indian' },
    { value: 'Biryani', label: 'Biryani' },
    { value: 'Italian', label: 'Italian' },
    { value: 'Japanese', label: 'Japanese' }
  ];

  return (
    <div className="restaurants">
      <div className="restaurants__container">
        <div className="restaurants__header">
          <h1 className="restaurants__title">Restaurants</h1>
          <p className="restaurants__subtitle">
            Discover amazing food from top-rated restaurants
          </p>
        </div>

        <div className="restaurants__filters">
          <div className="restaurants__filter-group">
            <input
              type="text"
              placeholder="Search restaurants..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="restaurants__search-input"
            />
          </div>

          <div className="restaurants__filter-group">
            <select
              value={filters.cuisine}
              onChange={(e) => handleFilterChange('cuisine', e.target.value)}
              className="restaurants__filter-select"
            >
              {cuisineOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="restaurants__filter-group">
            <select
              value={filters.minRating}
              onChange={(e) => handleFilterChange('minRating', e.target.value)}
              className="restaurants__filter-select"
            >
              <option value="">Min Rating</option>
              <option value="4.0">4.0+ Stars</option>
              <option value="4.5">4.5+ Stars</option>
            </select>
          </div>

          <div className="restaurants__filter-group">
            <select
              value={filters.maxCost}
              onChange={(e) => handleFilterChange('maxCost', e.target.value)}
              className="restaurants__filter-select"
            >
              <option value="">Max Cost for Two</option>
              <option value="300">Under ₹300</option>
              <option value="500">Under ₹500</option>
              <option value="800">Under ₹800</option>
            </select>
          </div>

          <button 
            onClick={clearFilters}
            className="restaurants__clear-filters"
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <div className="restaurants__loading">
            <div className="restaurants__spinner"></div>
            <p>Loading restaurants...</p>
          </div>
        ) : error ? (
          <div className="restaurants__error">
            <p>{error}</p>
            <button onClick={fetchRestaurants}>
              Try Again
            </button>
          </div>
        ) : restaurants.length === 0 ? (
          <div className="restaurants__empty">
            <div className="restaurants__empty-icon">🍽️</div>
            <h3>No restaurants found</h3>
            <p>Try adjusting your filters or search terms</p>
            <button onClick={clearFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="restaurants__results">
              <p className="restaurants__count">
                {restaurants.length} restaurant{restaurants.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="restaurants__grid">
              {restaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  to={`/restaurants/${restaurant.id}`}
                  className="restaurants__restaurant-link"
                >
                  <Card className="restaurants__restaurant-card" hoverable>
                    <div className="restaurants__restaurant-image">
                      <img 
                        src={restaurant.imageUrl || restaurant.image_url || FALLBACK_IMAGE} 
                        alt={restaurant.name}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    <div className="restaurants__restaurant-content">
                      <h3 className="restaurants__restaurant-name">{restaurant.name}</h3>
                      <p className="restaurants__restaurant-cuisine">{restaurant.cuisine}</p>
                      <p className="restaurants__restaurant-area">{restaurant.area}</p>
                      <div className="restaurants__restaurant-info">
                        <span className="restaurants__restaurant-rating">
                          ⭐ {restaurant.rating}
                        </span>
                        <span className="restaurants__restaurant-cost">
                          ₹{restaurant.avg_cost_for_two} for two
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
