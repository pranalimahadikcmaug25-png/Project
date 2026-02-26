// src/auth.js

// Save token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove token (for logout)
export const clearToken = () => {
  localStorage.removeItem("token");
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!localStorage.getItem("token");
};
