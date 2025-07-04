import axios from "axios";
import { API_ENDPOINTS } from "../config/api";

const register = (userData) => {
  return axios.post(API_ENDPOINTS.auth.register, userData);
};

const login = (email, password) => {
  return axios.post(API_ENDPOINTS.auth.login, { email, password });
};

const getUsers = async (token, page = 0, size = 10, searchTerm = '') => {
  try {
    const response = await axios.get(`${API_ENDPOINTS.auth.users}?page=${page}&size=${size}&search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('API Response:', response.data); // Debug log
    return response;
  } catch (error) {
    console.error('API Error:', error.response?.data); // Debug log
    throw error;
  }
};



const updateUser = (userId, userData, token) => {
  return axios.put(API_ENDPOINTS.auth.updateUser(userId), userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const removeUser = (userId, token) => {
  return axios.delete(API_ENDPOINTS.auth.deleteUser(userId), {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  register,
  login,
  getUsers,
  updateUser,
  removeUser,
};