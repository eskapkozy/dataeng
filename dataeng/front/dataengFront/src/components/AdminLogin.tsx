import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../modules/dashboard/hooks/useAdminAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAdminAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = login(username, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="login-header">
          <div className="logo">
            <span className="logo-main">Data</span>
            <span className="logo-sub">Eng</span>
          </div>
          <h1 className="login-title">Administration</h1>
          <p className="login-subtitle">Accès au tableau de bord</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Mot de passe"
            />
          </div>

          {error && (
            <div className="error-message">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" stroke="currentColor"/>
                <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" stroke="currentColor"/>
              </svg>
              {error}
            </div>
          )}

          <button type="submit" className="login-button">
            Se connecter
          </button>
        </form>

        <div className="login-footer">
          <p className="footer-text">
            Accès réservé aux administrateurs de Data Eng Congo
          </p>
        </div>
      </div>

      <div className="background-decoration">
        <div className="decoration-orb orb1"></div>
        <div className="decoration-orb orb2"></div>
        <div className="decoration-orb orb3"></div>
      </div>
    </div>
  );
};

export default AdminLogin;
