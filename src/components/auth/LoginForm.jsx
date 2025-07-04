import React, { useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Typography } from '@mui/material';
import { loginUser } from '../../services/authService';
import { authStyles } from '../../styles/authStyles';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';

const validationSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required'),
});

// Function to decode JWT token
const decodeToken = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setMessage('');
      try {
        const response = await loginUser(values);
        console.log('Login response with user details:', response);
        
        if (response && response.token && response.user) {
          // Store token
          localStorage.setItem('token', response.token);
          
          // Store user data
          const userData = {
            id: response.user.id,
            email: response.user.email,
            role: response.user.role,
          };
          
          console.log('Storing user data:', userData);
          
          // Update auth context
          login(userData);
          
          // Navigate based on role
          if (userData.role === 'ROLE_ADMIN') {
            navigate('/dashboard/admin');
          } else {
            navigate('/dashboard/user');
          }
        } else {
          console.error('Invalid response structure:', response);
          setMessage('Invalid response structure from server');
        }
      } catch (error) {
        console.error('Login error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        
        if (error.response?.data?.message) {
          setMessage(error.response.data.message);
        } else if (error.message) {
          setMessage(error.message);
        } else {
          setMessage('Login failed. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Box sx={authStyles.container}>
      <Box sx={authStyles.formContainer}>
        <Typography variant="h5" sx={authStyles.title}>
          Welcome Back
        </Typography>
        <form onSubmit={formik.handleSubmit} style={authStyles.form}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            variant="outlined"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={authStyles.textField}
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            sx={authStyles.textField}
          />

          <Button 
            type="submit" 
            variant="contained" 
            fullWidth 
            disabled={loading}
            sx={authStyles.submitButton}
          >
            {loading ? <CircularProgress size={24} /> : 'Login'}
          </Button>

          {message && (
            <Typography sx={authStyles.errorMessage}>
              {message}
            </Typography>
          )}

          <Box sx={authStyles.linkContainer}>
            <Typography variant="body2">
              Don't have an account?{' '}
              <Link to="/register" style={authStyles.link}>
                Register here
              </Link>
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
