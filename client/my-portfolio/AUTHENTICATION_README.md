# Authentication Setup Guide

This guide explains how the frontend authentication works with the backend API.

## Overview

The portfolio uses JWT-based authentication for admin access. The frontend communicates with the Flask backend API to authenticate users and manage sessions.

## Backend API Endpoints

- **POST** `/api/login` - User login
- **POST** `/api/refresh` - Refresh access token
- **GET** `/api/profile` - Get user profile
- **PUT** `/api/profile` - Update user profile
- **PUT** `/api/change-password` - Change password

## Frontend Components

### 1. API Service (`src/services/api.js`)
- Handles all backend communication
- Manages JWT tokens (access & refresh)
- Automatic token refresh on 401 errors
- Centralized error handling

### 2. API Configuration (`src/services/config.js`)
- Environment-based API URLs
- Request timeout settings
- Default headers configuration

### 3. AdminAuth Component (`src/components/auth/AdminAuth.jsx`)
- Wraps admin routes with authentication
- Manages authentication state
- Handles login/logout functionality
- Verifies admin permissions

### 4. Login Component (`src/pages/Login.jsx`)
- Admin login form
- Real-time validation
- Error handling
- Dark mode support

## Authentication Flow

1. **Access Admin Route** (`/admin`)
2. **Check Authentication** - Verify existing tokens
3. **Show Login Form** - If not authenticated
4. **Submit Credentials** - Send to backend API
5. **Store Tokens** - Save access & refresh tokens
6. **Access Admin Panel** - Full admin functionality

## Token Management

- **Access Token**: Short-lived (15 minutes default)
- **Refresh Token**: Long-lived (7 days default)
- **Automatic Refresh**: Handles token expiration
- **Secure Storage**: localStorage (consider httpOnly cookies for production)

## Admin Credentials

After running the seed file:
- **Email**: `admin@example.com`
- **Password**: `admin123`

## Configuration

### API Base URL
Update `src/services/config.js` for different environments:

```javascript
export const API_CONFIG = {
  BASE_URL: import.meta.env.MODE === 'production' 
    ? 'https://your-production-api.com/api' 
    : 'http://localhost:5000/api',
};
```

## Security Features

- **JWT Tokens**: Secure, stateless authentication
- **Token Refresh**: Automatic session renewal
- **Admin Verification**: Ensures only admins can access admin routes
- **Error Handling**: Graceful handling of authentication failures
- **Logout**: Complete token cleanup

## Development Setup

1. **Start Backend Server**:
   ```bash
   cd BACKEND/server
   python seed.py  # Create admin user
   python app.py   # Start Flask server
   ```

2. **Start Frontend**:
   ```bash
   cd client/my-portfolio
   npm run dev
   ```

3. **Access Admin Panel**:
   - Navigate to `/admin`
   - Login with admin credentials
   - Manage portfolio content

## Troubleshooting

### Common Issues

1. **CORS Errors**:
   - Ensure backend CORS is configured
   - Check API base URL in frontend config

2. **Token Expired**:
   - Tokens automatically refresh
   - Manual logout/login if refresh fails

3. **Network Errors**:
   - Verify backend server is running
   - Check API endpoint URLs

4. **Admin Access Denied**:
   - Ensure user has `is_admin: true` in database
   - Verify user was created with seed script

### Debug Mode

Enable console logging in browser dev tools to see:
- API requests/responses
- Token refresh attempts
- Authentication state changes

## Production Considerations

- Use HTTPS for all API communication
- Consider httpOnly cookies for token storage
- Implement rate limiting on login endpoints
- Add proper error logging and monitoring
- Use environment variables for sensitive configuration

---

**Note**: This authentication system is designed for single-user admin access. For multi-user systems, additional security measures would be needed.
