// src/services/authService.js
import axios from 'axios';
import { API_ENDPOINTS } from "../config/api";
import { jwtDecode } from 'jwt-decode';

// Create axios instance with default config
const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (userData) => {
  try {
    console.log('Making registration request to:', API_ENDPOINTS.auth.register);
    console.log('With data:', userData);
    
    const response = await api.post(API_ENDPOINTS.auth.register, userData);
    console.log('Registration response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const verifyEmail = async (verifyData) => {
  try {
    console.log('Verifying email with token:', verifyData);
    const response = await api.post(API_ENDPOINTS.auth.verifyEmail, verifyData);
    console.log('Email verification response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Email verification error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const resendVerificationEmail = async (email) => {
  try {
    const response = await api.post(API_ENDPOINTS.auth.resendVerification, { email });
    return response.data;
  } catch (error) {
    console.error('Resend verification error:', error);
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.auth.getUserDetails);
    console.log('User details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to get user details:', error);
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    console.log('Sending login request with data:', userData);
    const response = await api.post(API_ENDPOINTS.auth.login, userData);
    console.log('Login API response:', response.data);
    
    // Check if the response has the expected structure
    if (!response.data || !response.data.token) {
      console.error('Invalid response structure:', response.data);
      throw new Error('Invalid response from server');
    }

    // Store token
    localStorage.setItem('token', response.data.token);
    
    try {
      // Try to get user details
      const userDetails = await getUserDetails();
      console.log('User details:', userDetails);

      return {
        ...response.data,
        user: userDetails
      };
    } catch (userDetailsError) {
      console.warn('Could not fetch user details:', userDetailsError);
      // If we can't get user details, create a basic user object from the token
      const decodedToken = jwtDecode(response.data.token);
      console.log('Decoded token:', decodedToken);
      
      return {
        ...response.data,
        user: {
          id: decodedToken.sub,
          email: userData.email,
          role: decodedToken.role 
        }
      };
    }
  } catch (error) {
    console.error('Login API error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};

export const removeUser = async (userId) => {
  try {
    const response = await api.delete(`${API_ENDPOINTS.auth.users}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('User removal failed:', error.response?.data || error.message);
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw error;
  }
};
