// src/config/api.js

// Base URLs for different services
export const USER_SERVICE_URL = 'https://ecom-user-service-production.up.railway.app/';
export const PRODUCT_SERVICE_URL = 'http://localhost:8081';

export const API_ENDPOINTS = {
  auth: {
    register: `${USER_SERVICE_URL}/user/auth/register`,
    login: `${USER_SERVICE_URL}/user/auth/login`,
    verifyEmail: `${USER_SERVICE_URL}/user/auth/verify`,
    resendVerification: `${USER_SERVICE_URL}/user/auth/resend-verification`,
    getUserDetails: `${USER_SERVICE_URL}/user/auth/profile`,
    users: `${USER_SERVICE_URL}/user/auth/all`,
    updateUser: (userId) => `${USER_SERVICE_URL}/user/auth/update/${userId}`,
    deleteUser: (userId) => `${USER_SERVICE_URL}/user/auth/delete/${userId}`,
  },
  products: {
    getAll: `${PRODUCT_SERVICE_URL}/api/products`,
    getById: (id) => `${PRODUCT_SERVICE_URL}/api/products/${id}`,
    create: `${PRODUCT_SERVICE_URL}/api/products`,
    update: (id) => `${PRODUCT_SERVICE_URL}/api/products/${id}`,
    delete: (id) => `${PRODUCT_SERVICE_URL}/api/products/${id}`,
  },
}; 