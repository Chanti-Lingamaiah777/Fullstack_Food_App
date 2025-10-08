import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  type = 'button',
  ...props 
}) => {
  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    disabled ? 'btn--disabled' : '',
    loading ? 'btn--loading' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn__spinner"></span>}
      <span className={loading ? 'btn__text--loading' : 'btn__text'}>
        {children}
      </span>
    </button>
  );
};

export default Button;
