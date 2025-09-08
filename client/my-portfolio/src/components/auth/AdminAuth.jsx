import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Login from '../../pages/Login';
import { apiService } from '../../services';

const AdminAuth = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      if (apiService.isAuthenticated()) {
        console.log('🔍 Checking authentication...');
        // Verify token is still valid by fetching user profile
        const userData = await apiService.getProfile();
        if (userData && userData.is_admin) {
          console.log('✅ Authentication successful:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('❌ User is not admin or invalid');
          // Token exists but user is not admin or invalid
          apiService.clearTokens();
        }
      } else {
        console.log('🔍 No authentication tokens found');
      }
    } catch (error) {
      console.error('❌ Authentication check failed:', error);
      apiService.clearTokens();
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      console.log('🔐 Attempting login for:', credentials.email);
      const response = await apiService.login(credentials.email, credentials.password);
      console.log('📝 Login response:', response);
      
      if (response.user && response.user.is_admin) {
        console.log('✅ Admin login successful');
        // Store tokens
        apiService.setTokens(response.access_token, response.refresh_token);
        setUser(response.user);
        setIsAuthenticated(true);
        return true;
      } else {
        console.log('❌ User is not an administrator');
        throw new Error('User is not an administrator');
      }
    } catch (error) {
      console.error('❌ Login failed:', error);
      return false;
    }
  };

  const handleLogout = () => {
    apiService.clearTokens();
    setUser(null);
    setIsAuthenticated(false);
    navigate('/');
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login page
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} isAdminLogin={true} />;
  }

  // If authenticated, render admin layout with logout functionality and user data
  return React.cloneElement(children, { onLogout: handleLogout, user: user });
};

export default AdminAuth;
