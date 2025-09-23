// API Configuration
export const API_CONFIG = {
  // Backend API base URL
  BASE_URL: import.meta.env.MODE === 'production' 
    ? 'https://portfolio1-backend-8o63.onrender.com/api' 
    : 'http://localhost:5000/api',
  
  // Request timeout in milliseconds
  TIMEOUT: 10000,
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
