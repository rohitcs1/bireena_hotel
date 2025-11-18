import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext(null);

/**
 * AuthContext Provider
 * 
 * Manages user authentication state, login, logout, and role management.
 * Persists user data in localStorage.
 * 
 * @example
 * // Wrap your app with AuthProvider
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * @example
 * // Use in components
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('kot-user');
      const storedToken = localStorage.getItem('kot-token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading user from localStorage:', error);
      localStorage.removeItem('kot-user');
      localStorage.removeItem('kot-token');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Login function
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} role - User role (Waiter, Kitchen, Admin)
   * @param {boolean} rememberMe - Whether to remember user
   * @returns {Promise<object>} - User data
   */
  const login = async (email, password, role, rememberMe = false) => {
    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Mock login - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock user data
      const mockUser = {
        id: Math.floor(Math.random() * 1000),
        email,
        name: email.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        role,
        avatar: email.charAt(0).toUpperCase(),
        token: `mock-token-${Date.now()}`,
        loginTime: new Date().toISOString()
      };

      setUser(mockUser);

      // Persist to localStorage
      if (rememberMe) {
        localStorage.setItem('kot-user', JSON.stringify(mockUser));
        localStorage.setItem('kot-token', mockUser.token);
      } else {
        // Store in sessionStorage for session-only persistence
        sessionStorage.setItem('kot-user', JSON.stringify(mockUser));
        sessionStorage.setItem('kot-token', mockUser.token);
      }

      return mockUser;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  /**
   * Logout function
   * Clears user data from state and storage
   */
  const logout = () => {
    setUser(null);
    localStorage.removeItem('kot-user');
    localStorage.removeItem('kot-token');
    sessionStorage.removeItem('kot-user');
    sessionStorage.removeItem('kot-token');

    // TODO: Call logout API endpoint
    // fetch('/api/auth/logout', { method: 'POST' });
  };

  /**
   * Update user data
   * @param {object} updates - Partial user data to update
   */
  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update localStorage
    const storedUser = localStorage.getItem('kot-user');
    if (storedUser) {
      localStorage.setItem('kot-user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    updateUser,
    role: user?.role || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use AuthContext
 * @returns {object} - Auth context value
 * @throws {Error} - If used outside AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;

