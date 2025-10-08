import React, { useState } from 'react';
import Loader from './Loader';
import { useAuth } from '../contexts/AuthContext';
import FormInput from './FormInput';
import Button from './Button';
import './LoginForm.css';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      const result = await login(formData.email, formData.password);
      
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
    <form className="login-form" onSubmit={handleSubmit}>
      <h2 className="login-form__title">Welcome Back</h2>
      <p className="login-form__subtitle">Sign in to your account</p>
      
      {errors.general && (
        <div className="login-form__error">
          {errors.general}
        </div>
      )}
      
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
        placeholder="Enter your password"
        required
      />
      
      <Button
        type="submit"
        loading={loading}
        disabled={loading}
        className="login-form__submit"
      >
        {loading ? <Loader text="Signing in..." /> : 'Sign In'}
      </Button>
    </form>
  );
};

export default LoginForm;
