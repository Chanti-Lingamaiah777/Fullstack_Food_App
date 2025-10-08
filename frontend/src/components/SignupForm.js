import React, { useState } from 'react';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';
import FormInput from './FormInput';
import Button from './Button';
import './SignupForm.css';

const SignupForm = ({ onSuccess }) => {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await signup(formData.name, formData.email, formData.password);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess();
        }
      } else {
        setErrors({ general: result.message });
      }
    } catch (error) {
      setErrors({ general: 'An error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="signup-form__title">Create Account</h2>
      <p className="signup-form__subtitle">Join FoodieHub today</p>
      
      {errors.general && (
        <div className="signup-form__error">
          {errors.general}
        </div>
      )}
      
      <FormInput
        label="Full Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        placeholder="Enter your full name"
        required
      />
      
      <FormInput
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Enter your email"
        required
      />
      
      <FormInput
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Create a password"
        required
      />
      
      <FormInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={errors.confirmPassword}
        placeholder="Confirm your password"
        required
      />
      
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        className="signup-form__submit"
      >
        {loading ? <Loader text="Creating account..." /> : 'Create Account'}
      </Button>
    </form>
  );
};

export default SignupForm;
