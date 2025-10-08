import React from 'react';
import './Loader.css';

const Loader = ({ text = 'Loading...' }) => {
  return (
    <div className="loader">
      <div className="loader__spinner"></div>
      <div className="loader__text">{text}</div>
    </div>
  );
};

export default Loader;


