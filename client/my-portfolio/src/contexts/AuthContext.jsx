import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload.error,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload.user },
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check if user is already authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          dispatch({ type: 'AUTH_START' });
          // Mock user data for now
          const mockUser = {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            is_admin: true,
            first_name: 'Omwansa',
            last_name: 'Arnold'
          };
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: { user: mockUser },
          });
        } catch (error) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          dispatch({
            type: 'AUTH_FAILURE',
            payload: { error: 'Authentication failed' },
          });
        }
      } else {
        dispatch({ type: 'AUTH_FAILURE', payload: { error: null } });
      }
    };

    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      dispatch({ type: 'AUTH_START' });
      
      // Mock login - replace with actual API call
      if (credentials.email === 'admin@example.com' && credentials.password === 'password') {
        const mockUser = {
          id: 1,
          username: 'admin',
          email: 'admin@example.com',
          is_admin: true,
          first_name: 'Omwansa',
          last_name: 'Arnold'
        };

        // Store mock tokens
        localStorage.setItem('access_token', 'mock_access_token');
        localStorage.setItem('refresh_token', 'mock_refresh_token');

        dispatch({
          type: 'AUTH_SUCCESS',
          payload: { user: mockUser },
        });

        return { success: true };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      dispatch({ type: 'AUTH_START' });
      // Mock registration - replace with actual API call
      console.log('Registering user:', userData);
      dispatch({ type: 'AUTH_FAILURE', payload: { error: null } });
      return { success: true };
    } catch (error) {
      dispatch({
        type: 'AUTH_FAILURE',
        payload: { error: error.message },
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    dispatch({ type: 'AUTH_LOGOUT' });
  };

  const updateProfile = async (profileData) => {
    try {
      // Mock profile update - replace with actual API call
      console.log('Updating profile:', profileData);
      dispatch({
        type: 'UPDATE_USER',
        payload: { user: profileData },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const changePassword = async (passwordData) => {
    try {
      // Mock password change - replace with actual API call
      console.log('Changing password:', passwordData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};