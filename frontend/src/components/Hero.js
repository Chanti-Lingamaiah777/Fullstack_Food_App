import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__overlay"></div>
      </div>
      
      <div className="hero__content">
        <div className="hero__container">
          <h1 className="hero__title">
            Delicious Food Delivered to Your Door
          </h1>
          <p className="hero__subtitle">
            Order from your favorite restaurants and enjoy fresh, hot meals in minutes.
            From traditional Indian cuisine to international flavors, we've got you covered.
          </p>
          <div className="hero__actions">
            <Link to="/restaurants">
              <Button size="large" className="hero__cta">
                Order Now
              </Button>
            </Link>
            <Link to="/restaurants?cuisine=South-Indian">
              <Button variant="outline" size="large">
                Explore Cuisines
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
