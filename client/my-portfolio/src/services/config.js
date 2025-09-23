// API Configuration
export const API_CONFIG = {
  // Backend API base URL - more robust environment detection
  BASE_URL: (() => {
    // Check if we're in production build or deployed environment
    const isProduction = import.meta.env.PROD || 
                        window.location.hostname !== 'localhost' ||
                        window.location.hostname.includes('onrender.com') ||
                        window.location.hostname.includes('vercel.app') ||
                        window.location.hostname.includes('netlify.app');
    
    return isProduction 
      ? 'https://portfolio1-backend-8o63.onrender.com/api' 
      : 'http://localhost:5000/api';
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
