import React from 'react';
import { useAdminAuth } from './hooks/useAdminAuth';
import PageContentManager from '../../components/PageContentManager';
import './styles.css';
import '../common.css';

const Dashboard = () => {
  const { logout } = useAdminAuth();

  return (
    <div className="page dashboard-page">
      <div className="dashboard-container">
        {/* Header Section */}
        <section className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Tableau de Bord</h1>
            <p className="dashboard-subtitle">Gestion des contenus des pages</p>
          </div>
          <div className="header-actions">
            <button className="btn-logout" onClick={logout}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2"/>
                <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="2"/>
                <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Déconnexion
            </button>
          </div>
        </section>

        {/* Page Content Manager - Volet 1 */}
        <section className="content-management-section">
          <PageContentManager />
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
