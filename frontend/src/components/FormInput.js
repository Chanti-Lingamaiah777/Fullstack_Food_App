import React from 'react';
import './FormInput.css';

const FormInput = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const inputClasses = [
    'form-input',
    error ? 'form-input--error' : '',
    disabled ? 'form-input--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="form-input-group">
      {label && (
        <label htmlFor={name} className="form-input__label">
          {label}
          {required && <span className="form-input__required">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {error && <span className="form-input__error-text">{error}</span>}
    </div>
  );
};

export default FormInput;
