# Services Directory

This directory contains all API-related services and configurations for the portfolio application.

## Files

### `api.js`
Main API service class that handles all backend communication:
- Authentication (login, logout, token refresh)
- User profile management
- JWT token management
- Error handling and retry logic

### `config.js`
API configuration settings:
- Base URL configuration for different environments
- Request timeout settings
- Default headers
- Helper functions for URL construction

### `index.js`
Barrel export file for easy imports:
```javascript
import { apiService, API_CONFIG } from '../services';
```

## Usage

### Basic API Service Usage
```javascript
import { apiService } from '../services';

// Login
const response = await apiService.login(email, password);

// Get user profile
const profile = await apiService.getProfile();

// Check authentication status
const isAuth = apiService.isAuthenticated();
```

### Configuration
```javascript
import { API_CONFIG } from '../services';

// Access configuration
console.log(API_CONFIG.BASE_URL);
```

## Environment Configuration

The API base URL is automatically configured based on the environment:

- **Development**: `http://localhost:5000/api`
- **Production**: `https://your-production-api.com/api`

To change the production URL, update `config.js`:

```javascript
BASE_URL: import.meta.env.MODE === 'production' 
  ? 'https://your-actual-api.com/api' 
  : 'http://localhost:5000/api',
```

## Features

- **JWT Token Management**: Automatic token storage and refresh
- **Error Handling**: Comprehensive error handling with retry logic
- **Type Safety**: Consistent API response handling
- **Environment Awareness**: Automatic environment-based configuration
- **Centralized**: All API logic in one place for easy maintenance

## Adding New API Endpoints

1. Add the new method to the `ApiService` class in `api.js`
2. Use the existing `request()` method for consistency
3. Export any new configuration from `config.js` if needed
4. Update this README with the new endpoint documentation
