import React from 'react';
import './Card.css';

const Card = ({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false,
  ...props 
}) => {
  const cardClasses = [
    'card',
    hoverable ? 'card--hoverable' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
