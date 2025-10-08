import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurantAPI } from '../services/api';
import Hero from '../components/Hero';
import Card from '../components/Card';
import Button from '../components/Button';
import { useCart } from '../contexts/CartContext';
import { imageOverridesByName } from '../constants/imageOverrides';
import './Home.css';
import { FALLBACK_IMAGE } from '../constants/images';
import Loader from '../components/Loader';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await restaurantAPI.getAll();
        if (response.data.success) {
          const normalized = response.data.data.slice(0, 6).map(r => ({
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

    fetchRestaurants();
  }, []);

  const cuisineTypes = [
    { name: 'South Indian', cuisine: 'South-Indian', icon: '🍛' },
    { name: 'North Indian', cuisine: 'North-Indian', icon: '🍽️' },
    { name: 'Biryani', cuisine: 'Biryani', icon: '🍚' },
    { name: 'Italian', cuisine: 'Italian', icon: '🍕' },
    { name: 'Japanese', cuisine: 'Japanese', icon: '🍣' }
  ];

  const featuredFoods = [
    {
      id: 1001,
      name: 'Classic Burger',
      description: 'Juicy grilled beef patty with fresh veggies',
      price: 199,
      imageUrl: imageOverridesByName['Classic Burger'],
      veg: false
    },
    {
      id: 1002,
      name: 'Fresh Green Salad',
      description: 'Crisp lettuce, cucumbers, and cherry tomatoes',
      price: 149,
      imageUrl: imageOverridesByName['Fresh Green Salad'],
      veg: true
    },
    {
      id: 1003,
      name: 'Chocolate Dessert',
      description: 'Decadent chocolate treat for your sweet tooth',
      price: 129,
      imageUrl: imageOverridesByName['Chocolate Dessert'],
      veg: true
    },
    {
      id: 1004,
      name: 'Grilled Steak',
      description: 'Perfectly grilled steak with herbs',
      price: 349,
      imageUrl: imageOverridesByName['Grilled Steak'],
      veg: false
    }
  ];

  const featuredPlaces = [
    {
      id: 'place1',
      title: 'Restaurant Facade',
      imageUrl: imageOverridesByName['Restaurant Facade']
    },
    {
      id: 'place2',
      title: 'Hotel Exterior',
      imageUrl: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    },
    {
      id: 'place3',
      title: 'Hotel Lobby',
      imageUrl: imageOverridesByName['Hotel Lobby']
    },
    {
      id: 'place4',
      title: 'Restaurant Interior',
      imageUrl: imageOverridesByName['Restaurant Interior']
    }
  ];

  return (
    <div className="home">
      <Hero />
      
      <section className="home__section">
        <div className="home__container">
          <h2 className="home__section-title">Popular Cuisines</h2>
          <div className="home__cuisines">
            {cuisineTypes.map((cuisine) => (
              <Link 
                key={cuisine.cuisine}
                to={`/restaurants?cuisine=${cuisine.cuisine}`}
                className="home__cuisine-card"
              >
                <div className="home__cuisine-icon">{cuisine.icon}</div>
                <span className="home__cuisine-name">{cuisine.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Featured Foods</h2>
          </div>
          <div className="home__restaurants">
            {featuredFoods.map((item) => (
              <Card key={item.id} className="home__restaurant-card" hoverable>
                <div className="home__restaurant-image">
                  <img 
                    src={item.imageUrl || item.image_url || FALLBACK_IMAGE} 
                    alt={item.name} 
                    loading="lazy" 
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="home__restaurant-content">
                  <h3 className="home__restaurant-name">{item.name}</h3>
                  <p className="home__restaurant-cuisine">{item.description}</p>
                  <div className="home__restaurant-info">
                    <span className="home__restaurant-cost">₹{item.price}</span>
                    <Button size="small" onClick={() => addToCart(item, 0, 'Featured')}>Add</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Featured Places</h2>
          </div>
          <div className="home__restaurants">
            {featuredPlaces.map((place) => (
              <Card key={place.id} className="home__restaurant-card" hoverable>
                <div className="home__restaurant-image">
                  <img 
                    src={place.imageUrl || place.image_url || FALLBACK_IMAGE} 
                    alt={place.title} 
                    loading="lazy" 
                    onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                  />
                </div>
                <div className="home__restaurant-content">
                  <h3 className="home__restaurant-name">{place.title}</h3>
                  <p className="home__restaurant-cuisine">Handpicked venues for a great dining experience</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="home__section">
        <div className="home__container">
          <div className="home__section-header">
            <h2 className="home__section-title">Top Restaurants</h2>
            <Link to="/restaurants" className="home__view-all">
              View All →
            </Link>
          </div>
          
          {loading ? (
            <div className="home__loading">
              <Loader text="Loading restaurants..." />
            </div>
          ) : error ? (
            <div className="home__error">
              <p>{error}</p>
              <button onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="home__restaurants">
              {restaurants.map((restaurant) => (
                <Link 
                  key={restaurant.id} 
                  to={`/restaurants/${restaurant.id}`}
                  className="home__restaurant-link"
                >
                  <Card className="home__restaurant-card" hoverable>
                    <div className="home__restaurant-image">
                      <img 
                        src={restaurant.imageUrl || restaurant.image_url || FALLBACK_IMAGE} 
                        alt={restaurant.name}
                        loading="lazy"
                        onError={(e) => { e.currentTarget.src = FALLBACK_IMAGE; }}
                      />
                    </div>
                    <div className="home__restaurant-content">
                      <h3 className="home__restaurant-name">{restaurant.name}</h3>
                      <p className="home__restaurant-cuisine">{restaurant.cuisine}</p>
                      <div className="home__restaurant-info">
                        <span className="home__restaurant-rating">
                          ⭐ {restaurant.rating}
                        </span>
                        <span className="home__restaurant-cost">
                          ₹{restaurant.avg_cost_for_two} for two
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="home__section home__section--cta">
        <div className="home__container">
          <div className="home__cta-content">
            <h2 className="home__cta-title">Ready to Order?</h2>
            <p className="home__cta-subtitle">
              Browse our extensive collection of restaurants and discover your new favorite meal.
            </p>
            <Link to="/restaurants">
              <button className="home__cta-button">
                Start Ordering
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
