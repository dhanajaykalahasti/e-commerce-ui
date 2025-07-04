import axios from 'axios';
import { API_ENDPOINTS } from "../config/api";

const api = axios.create({
  baseURL: API_ENDPOINTS.products.getAll.split('/api')[0], // Remove /api from baseURL
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

// Add response interceptor to handle CORS errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403 && error.response?.headers['access-control-allow-origin'] === undefined) {
      console.error('CORS error detected. Please ensure the backend server has CORS enabled.');
    }
    return Promise.reject(error);
  }
);

export const getAllProducts = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.products.getAll);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(API_ENDPOINTS.products.getById(id));
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const formData = new FormData();
    
    // Append all product data to FormData
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key]) {
        formData.append('file', productData[key]);
      } else if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.post(API_ENDPOINTS.products.create, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to create product:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const formData = new FormData();
    
    // Append all product data to FormData
    Object.keys(productData).forEach(key => {
      if (key === 'image' && productData[key]) {
        formData.append('file', productData[key]);
      } else if (productData[key] !== null && productData[key] !== undefined) {
        formData.append(key, productData[key]);
      }
    });

    const response = await api.put(API_ENDPOINTS.products.update(id), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await api.delete(API_ENDPOINTS.products.delete(id));
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}; 