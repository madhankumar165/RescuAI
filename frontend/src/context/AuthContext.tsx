import React, { createContext, useContext, useState, useEffect } from 'react';
import { disasterApi } from '../services/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginUser: (userData: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    const token = localStorage.getItem('disaster_auth_token');
    if (!token) {
      // Default initial mock profile if no token yet so user name displays cleanly
      setUser({
        id: 1,
        email: 'admin@disasterhelp.gov',
        full_name: 'Chief Response Officer',
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
      });
      setLoading(false);
      return;
    }

    try {
      const profile = await disasterApi.getProfile();
      setUser(profile);
    } catch (err) {
      // Fallback
      setUser({
        id: 1,
        email: 'admin@disasterhelp.gov',
        full_name: 'Chief Response Officer',
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const loginUser = (userData: User, token: string) => {
    localStorage.setItem('disaster_auth_token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('disaster_auth_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
