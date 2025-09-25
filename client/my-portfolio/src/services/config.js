// API Configuration
export const API_CONFIG = {
  // Backend API base URL - use env override or default to local backend
  BASE_URL: (() => {
    const envUrl = import.meta.env?.VITE_API_BASE_URL;
    const base = (envUrl && envUrl.trim().length > 0) ? envUrl : 'http://localhost:5000/api';
    // Normalize by removing any trailing slashes
    return base.replace(/\/+$/, '');
  })(),
  
  // Request timeout in milliseconds
  TIMEOUT: 15000, // Increased timeout for slower connections
  
  // Default headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Helper function to get full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};
