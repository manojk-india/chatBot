import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Handle input changes
  const handleInputChange = (e) => {
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

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    // try {
    //   await new Promise(resolve => setTimeout(resolve, 1500));
    //   alert('Login successful! Welcome to Know-Assist.');
    // } catch (error) {
    //   alert('Login failed. Please try again.');
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      const response = await axios.post("http://localhost:8000/login", formData);
      
      if (response.data.success) {
        localStorage.setItem('authenticated', 'true');
        navigate('/ingest', { state: { email: formData.email } });
      } else {
        alert("Login failed. Please try again.");
      }
    } catch (err) {
      alert("Login failed. Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="login-container">
      {/* Left Panel - Branding */}
      <div className="brand-panel">
        <div className="brand-content">
          <div className="logo-container">
            <div className="logo">
              {/* <img 
                src="https://pplx-res.cloudinary.com/image/upload/v1750438260/gpt4o_images/iw1ccydtxvyfsgemwmqe.png" 
                alt="Know-Assist Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="color: #BB0826; font-weight: bold; font-size: 24px;">KA</div>';
                }}
              /> */}
              <img 
                src="logo.jpg" 
                alt="Know-Assist Logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div style="color: #BB0826; font-weight: bold; font-size: 24px;">KA</div>';
                }}
              />
            </div>
            <h1 className="app-name">Know-Assist</h1>
            <p className="app-tagline">Your Intelligent Knowledge Base Assistant</p>
          </div>
          
          <div className="welcome-message">
            <p>
              Secure access to your enterprise RAG knowledge base platform. 
              Harness the power of artificial intelligence to find answers, 
              gain insights, and make informed decisions with confidence.
            </p>
            
            <ul className="features-list">
              <li>Advanced AI-powered search</li>
              <li>Seamless integration with your data sources</li>
              <li>RAG powered application</li>
              <li>Reliable Answers</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="login-panel">
        <div className="login-form-container">
          <div className="login-header">
            <h2 className="login-title">Welcome Back</h2>
            <p className="login-subtitle">Sign in to access your knowledge base</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                aria-describedby={errors.email ? 'email-error' : undefined}
                required
                disabled={isLoading}
              />
              {errors.email && (
                <div id="email-error" className="error-message" role="alert">
                  {errors.email}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="password-container">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  disabled={isLoading}
                  tabIndex={0}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password && (
                <div id="password-error" className="error-message" role="alert">
                  {errors.password}
                </div>
              )}
            </div>

            <button
              type="submit"
              className={`login-button ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;