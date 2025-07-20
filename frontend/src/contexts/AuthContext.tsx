import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  name: string;
  email: string;
  avatar_url?: string;
  plan: 'free' | 'pro' | 'enterprise';
  credits_used: number;
  credits_limit: number;
}

interface UserStats {
  total_loops: number;
  active_loops: number;
  published_loops: number;
  total_executions: number;
  credits_remaining: number;
  credits_percentage: number;
}

interface AuthContextType {
  user: User | null;
  stats: UserStats | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, passwordConfirmation: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          await refreshUser();
        } catch (error) {
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await authService.login(email, password);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    await refreshUser();
  };

  const register = async (name: string, email: string, password: string, passwordConfirmation: string) => {
    const response = await authService.register(name, email, password, passwordConfirmation);
    localStorage.setItem('token', response.token);
    setUser(response.user);
    await refreshUser();
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      // Ignore logout errors
    }
    localStorage.removeItem('token');
    setUser(null);
    setStats(null);
  };

  const refreshUser = async () => {
    try {
      const response = await authService.me();
      setUser(response.user);
      setStats(response.stats);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      setStats(null);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    stats,
    loading,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};