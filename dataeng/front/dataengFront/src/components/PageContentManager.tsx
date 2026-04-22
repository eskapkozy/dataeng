import React, { useState } from 'react';
import type { PageInfo, PageSection } from '../types/PageContent';
import { usePageContent } from '../modules/dashboard/hooks/usePageContent';
import './PageContentManager.css';

const PageContentManager = () => {
  const {
    pages,
    currentPage,
    selectPage,
    updateSection,
    addSection,
    removeSection,
    toggleSectionVisibility,
    updatePageStatus
  } = usePageContent();

  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSectionContent, setNewSectionContent] = useState('');

  const handlePageClick = (pageId: string) => {
    selectPage(pageId);
  };

  const handleSectionEdit = (sectionId: string, content: string) => {
    setEditingSection(sectionId);
    setNewSectionContent(content);
  };

  const saveSectionEdit = () => {
    if (currentPage && editingSection) {
      updateSection(currentPage.id, editingSection, newSectionContent);
      setEditingSection(null);
      setNewSectionContent('');
    }
  };

  const cancelEdit = () => {
    setEditingSection(null);
    setNewSectionContent('');
  };

  const handleAddSection = () => {
    if (currentPage) {
      const newSection = {
        title: 'Nouvelle Section',
        content: 'Contenu de la nouvelle section',
        type: 'custom' as const,
        order: currentPage.sections.length + 1,
        visible: true
      };
      addSection(currentPage.id, newSection);
    }
  };

  const getStatusColor = (status: PageInfo['status']) => {
    switch (status) {
      case 'active': return 'var(--active-green)';
      case 'maintenance': return 'var(--warning-orange)';
      case 'draft': return 'var(--text-secondary)';
      default: return 'var(--text-secondary)';
    }
  };

  const getTypeIcon = (type: PageSection['type']) => {
    switch (type) {
      case 'hero':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'stats':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2"/>
            <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'articles':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2"/>
            <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      case 'cta':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22 17H2a3 3 0 0 0 3-3v-4a3 3 0 0 0-3-3H2" stroke="currentColor" strokeWidth="2"/>
            <path d="M18 13l6-6-6-6" stroke="currentColor" strokeWidth="2"/>
          </svg>
        );
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" stroke="currentColor"/>
            <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" stroke="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <div className="page-content-manager">
      {/* Header */}
      <div className="manager-header">
        <h1 className="manager-title">Gestion des Contenus</h1>
        <p className="manager-subtitle">Gérez le contenu de chaque page et section</p>
      </div>

      {/* Pages List */}
      <div className="pages-list">
        <h2 className="section-title">Pages disponibles</h2>
        <div className="pages-grid">
          {pages.map((page) => (
            <button
              key={page.id}
              className={`page-button ${currentPage?.id === page.id ? 'active' : ''}`}
              onClick={() => handlePageClick(page.id)}
            >
              <div className="page-button-content">
                <div className="page-info">
                  <h3 className="page-name">{page.name}</h3>
                  <p className="page-path">{page.path}</p>
                </div>
                <div className="page-meta">
                  <div className="page-status" style={{ color: getStatusColor(page.status) }}>
                    <div className="status-dot" style={{ backgroundColor: getStatusColor(page.status) }}></div>
                    {page.status}
                  </div>
                  <div className="section-count">{page.sections.length} sections</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Page Details */}
      {currentPage && (
        <div className="page-details">
          <div className="page-details-header">
            <div>
              <h2 className="page-title">{currentPage.name}</h2>
              <p className="page-description">{currentPage.description}</p>
            </div>
            <div className="page-actions">
              <select
                value={currentPage.status}
                onChange={(e) => updatePageStatus(currentPage.id, e.target.value as PageInfo['status'])}
                className="status-select"
              >
                <option value="active">Actif</option>
                <option value="maintenance">Maintenance</option>
                <option value="draft">Brouillon</option>
              </select>
              <button onClick={handleAddSection} className="add-section-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor" strokeWidth="2"/>
                  <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
                Ajouter une section
              </button>
            </div>
          </div>

          {/* Sections List */}
          <div className="sections-list">
            <h3 className="sections-title">Sections ({currentPage.sections.length})</h3>
            <div className="sections-grid">
              {currentPage.sections.map((section) => (
                <div key={section.id} className={`section-card ${!section.visible ? 'hidden' : ''}`}>
                  <div className="section-header">
                    <div className="section-info">
                      <div className="section-type-icon">
                        {getTypeIcon(section.type)}
                      </div>
                      <div>
                        <h4 className="section-title-text">{section.title}</h4>
                        <p className="section-type">{section.type}</p>
                      </div>
                    </div>
                    <div className="section-actions">
                      <button
                        onClick={() => toggleSectionVisibility(currentPage.id, section.id)}
                        className={`visibility-btn ${section.visible ? 'visible' : 'hidden'}`}
                        title={section.visible ? 'Masquer' : 'Afficher'}
                      >
                        {section.visible ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" stroke="currentColor" strokeWidth="2"/>
                            <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                        )}
                      </button>
                      <button
                        onClick={() => handleSectionEdit(section.id, section.content)}
                        className="edit-btn"
                        title="Éditer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                      <button
                        onClick={() => removeSection(currentPage.id, section.id)}
                        className="delete-btn"
                        title="Supprimer"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  {/* Section Content */}
                  <div className="section-content">
                    {editingSection === section.id ? (
                      <div className="edit-mode">
                        <textarea
                          value={newSectionContent}
                          onChange={(e) => setNewSectionContent(e.target.value)}
                          className="content-textarea"
                          rows={4}
                        />
                        <div className="edit-actions">
                          <button onClick={saveSectionEdit} className="save-btn">
                            Sauvegarder
                          </button>
                          <button onClick={cancelEdit} className="cancel-btn">
                            Annuler
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="content-text">{section.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageContentManager;
