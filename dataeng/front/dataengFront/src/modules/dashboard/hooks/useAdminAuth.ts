import { useState, useEffect } from 'react';

interface AdminAuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const useAdminAuth = (): AdminAuthState => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Credentials simples pour la démo (à remplacer par un système plus sécurisé)
  const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'dataeng2024'
  };

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié au chargement
    const authStatus = localStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const login = (username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  return {
    isAuthenticated,
    isLoading,
    login,
    logout
  };
};
