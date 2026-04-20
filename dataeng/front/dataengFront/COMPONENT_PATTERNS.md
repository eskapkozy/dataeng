# Patterns de Composants Réutilisables (Extrait de la page Home)

## Vue d'ensemble

Ce document documente les patterns de composants identifiés dans la page home qui peuvent être généralisés et réutilisés sur d'autres pages du site.

---

## 1. Pattern : Section Header

### Structure
```jsx
<div className="section-header">
  <div className="header-left">
    <div className="header-icon">
      <svg><!-- Icon SVG --></svg>
    </div>
    <h2 className="header-title">Titre de la section</h2>
  </div>
  <div className="header-right">
    <a href="#" className="view-all-link">
      <span>Voir tout</span>
      <span className="arrow">-></span>
    </a>
  </div>
</div>
<p className="header-subtitle">Description de la section</p>
```

### Styles CSS
```css
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
}

.header-title {
  font-family: 'Martian Mono', monospace;
  font-weight: 800;
  font-size: 18px;
  color: var(--text-primary);
  margin: 0;
}

.header-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  margin: 0 0 24px 0;
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.view-all-link:hover {
  color: var(--text-primary);
}
```

### Variables CSS utilisées
- `--border` : Bordures de l'icône
- `--text-primary` : Titre principal et icône
- `--text-secondary` : Sous-titre et lien "Voir tout"

### Usage
- En-têtes de sections (articles, membres, etc.)
- Pages de listing avec pagination
- Sections avec action secondaire

---

## 2. Pattern : Filter Bar

### Structure
```jsx
<div className="filter-bar">
  <button className="filter-btn active" data-category="all">Tous</button>
  <button className="filter-btn" data-category="category1">Catégorie 1</button>
  <button className="filter-btn" data-category="category2">Catégorie 2</button>
  {/* ... autres filtres */}
</div>
```

### Styles CSS
```css
.filter-bar {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.filter-btn {
  padding: 6px 12px;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: transparent;
  color: var(--text-secondary);
  font-family: 'Martian Mono', monospace;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-btn:hover {
  border-color: var(--text-primary);
  color: var(--text-primary);
}

.filter-btn.active {
  background: var(--accent-blue);
  color: var(--text-primary);
  border-color: var(--accent-blue);
}
```

### Variables CSS utilisées
- `--border` : Bordures des boutons
- `--text-secondary` : Texte des boutons inactifs
- `--text-primary` : Texte au hover et boutons actifs
- `--accent-blue` : Fond des boutons actifs

### Usage
- Filtrage d'articles, membres, événements
- Navigation par catégories
- Sélection de tags

---

## 3. Pattern : Article Card

### Structure
```jsx
<article className="article-card" data-category="category">
  <div className="article-content">
    <div className="category-row">
      <div className="category-tag">Catégorie</div>
      <div className="bookmark-icon">
        <svg><!-- Bookmark SVG --></svg>
      </div>
    </div>
    
    <h3 className="article-title">Titre de l'article</h3>
    <p className="article-description">Description de l'article...</p>
    
    <div className="article-author">
      <div className="author-avatar" style={{background: 'rgba(79,110,247,0.1)', color: 'var(--accent-blue)'}}>IN</div>
      <div className="author-info">
        <div className="author-name">Nom de l'auteur</div>
        <div className="author-meta">il y a X jours</div>
      </div>
    </div>
    
    <div className="article-stats">
      <div className="stat-item">
        <svg><!-- View SVG --></svg>
        <span>1.2K</span>
      </div>
      <div className="stat-item">
        <svg><!-- Comment SVG --></svg>
        <span>24</span>
      </div>
      <div className="stat-item">
        <svg><!-- Like SVG --></svg>
        <span>120</span>
      </div>
    </div>
  </div>
  <div className="card-glow"></div>
</article>
```

### Styles CSS
```css
.article-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 22px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.category-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.category-tag {
  font-family: 'Martian Mono', monospace;
  font-size: 9px;
  padding: 4px 8px;
  border-radius: 4px;
  background: rgba(79, 110, 247, 0.1);
  color: var(--accent-blue);
  text-transform: uppercase;
}

.article-title {
  font-family: 'Martian Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  color: var(--text-primary);
  margin: 0 0 8px 0;
  line-height: 1.3;
}

.article-description {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
  margin: 0 0 16px 0;
  line-height: 1.5;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Martian Mono', monospace;
  font-weight: 700;
  font-size: 9px;
}

.author-name {
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  font-size: 11px;
  color: var(--text-primary);
  margin: 0;
}

.author-meta {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: var(--text-secondary);
  margin: 0;
}

.article-stats {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: var(--text-secondary);
}
```

### Variables CSS utilisées
- `--card-bg` : Fond de la carte
- `--border` : Bordure de la carte
- `--text-primary` : Titre et nom de l'auteur
- `--text-secondary` : Description, méta et statistiques
- `--accent-blue` : Tags de catégorie

### Usage
- Articles, blog posts
- Projets, case studies
- Ressources, tutoriels

---

## 4. Pattern : Hero Section

### Structure
```jsx
<section className="hero-section">
  <div className="hero-body">
    <div className="hero-content">
      <div className="pill-badge">
        <div className="pill-dot"></div>
        <span className="pill-text">Badge text</span>
      </div>
      
      <h1 className="hero-title">
        <div className="title-line">Ligne 1</div>
        <div className="title-line">Ligne 2</div>
        <div className="title-line">Ligne 3 <span className="highlight">accent</span></div>
      </h1>
      
      <p className="hero-subtitle">
        Description avec <strong>texte important</strong> et accent.
      </p>
      
      <div className="hero-buttons">
        <button className="btn-primary">Action principale</button>
        <button className="btn-secondary">
          Action secondaire
          <span className="btn-arrow">-></span>
        </button>
      </div>
      
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">250</div>
          <div className="stat-unit">membres</div>
          <div className="stat-label">Communauté</div>
        </div>
        {/* ... autres stats */}
      </div>
    </div>
  </div>
</section>
```

### Styles CSS
```css
.hero-section {
  background: var(--bg-page);
  padding: 80px 40px;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.pill-badge {
  display: inline-flex;
  align-items: center;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 100px;
  padding: 6px 14px;
  margin-bottom: 24px;
}

.pill-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--active-green);
  margin-right: 8px;
}

.pill-text {
  font-family: 'Martian Mono', monospace;
  font-size: 10px;
  color: var(--text-secondary);
}

.hero-title {
  margin: 24px 0;
}

.title-line {
  font-family: 'Martian Mono', monospace;
  font-weight: 800;
  font-size: clamp(28px, 5vw, 56px);
  color: var(--text-primary);
  line-height: 1.03;
  margin: 0;
}

.highlight {
  color: var(--accent-blue);
}

.hero-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 520px;
  margin: 24px auto;
}

.hero-subtitle strong {
  color: var(--text-primary);
  font-weight: 500;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  justify-content: center;
  margin: 32px 0;
}

.btn-primary {
  background: var(--accent-blue);
  color: var(--text-primary);
  border: none;
  padding: 13px 24px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  padding: 13px 20px;
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
}

.btn-secondary:hover {
  color: var(--text-primary);
}

.stats-row {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'Martian Mono', monospace;
  font-weight: 800;
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-unit {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
}
```

### Variables CSS utilisées
- `--bg-page` : Fond de la section
- `--bg-surface` : Fond du badge
- `--border` : Bordures et séparateurs
- `--text-primary` : Titres et textes importants
- `--text-secondary` : Descriptions et textes secondaires
- `--accent-blue` : Accents et boutons principaux
- `--active-green` : Indicateurs actifs

### Usage
- Pages d'accueil
- Pages de landing
- Sections principales des pages

---

## 5. Pattern : Testimonial Card

### Structure
```jsx
<div className="testimonial-card">
  <div className="testimonial-tag">Catégorie</div>
  
  <p className="testimonial-quote">
    Citation avec <strong>texte important</strong> et accents.
  </p>
  
  <div className="testimonial-divider"></div>
  
  <div className="testimonial-author">
    <div className="avatar blue">IN</div>
    <div className="author-info">
      <div className="author-name">Nom de l'auteur</div>
      <div className="author-role">Rôle de l'auteur</div>
    </div>
  </div>
</div>
```

### Styles CSS
```css
.testimonial-card {
  background: var(--card-bg);
  padding: 28px 26px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  transition: background 0.2s ease;
}

.testimonial-tag {
  align-self: flex-start;
  font-family: 'Martian Mono', monospace;
  font-size: 8px;
  padding: 2px 7px;
  border-radius: 4px;
  background: rgba(79, 110, 247, 0.1);
  color: var(--accent-blue);
  text-transform: uppercase;
}

.testimonial-quote {
  flex: 1;
  font-family: 'DM Sans', sans-serif;
  font-weight: 400;
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.75;
  margin: 0;
}

.testimonial-quote strong {
  color: var(--text-primary);
  font-weight: 500;
}

.testimonial-divider {
  height: 1px;
  background: var(--border);
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Martian Mono', monospace;
  font-weight: 700;
  font-size: 9px;
}

.avatar.blue {
  background: rgba(79, 110, 247, 0.1);
  color: var(--accent-blue);
}

.author-name {
  font-family: 'Martian Mono', monospace;
  font-weight: 700;
  font-size: 11px;
  color: var(--text-primary);
  margin: 0;
}

.author-role {
  font-family: 'DM Sans', sans-serif;
  font-size: 10px;
  color: var(--text-secondary);
  margin: 0;
}
```

### Variables CSS utilisées
- `--card-bg` : Fond de la carte
- `--text-primary` : Titres et noms
- `--text-secondary` : Citations et rôles
- `--border` : Séparateurs
- `--accent-blue` : Tags et avatars

### Usage
- Témoignages clients
- Avis utilisateurs
- Recommandations

---

## 6. Pattern : Category Avatar System

### Structure
```jsx
<div className="author-avatar" style={{
  background: 'rgba(79,110,247,0.1)', 
  color: 'var(--accent-blue)'
}}>IN</div>
```

### Mapping des couleurs par catégorie
```css
/* Data Engineering */
.avatar.blue {
  background: rgba(79, 110, 247, 0.1);
  color: var(--accent-blue);
}

/* Machine Learning */
.avatar.purple {
  background: rgba(123, 92, 245, 0.1);
  color: var(--accent-purple);
}

/* Data Visualisation */
.avatar.cyan {
  background: rgba(34, 211, 238, 0.1);
  color: var(--accent-cyan);
}

/* Python */
.avatar.orange {
  background: rgba(245, 166, 35, 0.1);
  color: var(--warning-orange);
}

/* Congo Use Case */
.avatar.green {
  background: rgba(62, 207, 142, 0.1);
  color: var(--active-green);
}
```

### Variables CSS utilisées
- `--accent-blue` : Data Engineering
- `--accent-purple` : Machine Learning
- `--accent-cyan` : Data Visualisation
- `--warning-orange` : Python
- `--active-green` : Congo Use Case

### Usage
- Avatars d'auteurs
- Tags de catégorie
- Badges colorés
- Éléments visuels thématiques

---

## 7. Pattern : Stats Display

### Structure
```jsx
<div className="stats-row">
  <div className="stat-item">
    <div className="stat-value">250</div>
    <div className="stat-unit">membres</div>
    <div className="stat-label">Communauté</div>
  </div>
  <div className="stat-item">
    <div className="stat-value">50</div>
    <div className="stat-unit">articles</div>
    <div className="stat-label">Ressources</div>
  </div>
</div>
```

### Styles CSS
```css
.stats-row {
  display: flex;
  justify-content: space-around;
  margin-top: 64px;
  border-top: 1px solid var(--border);
  padding-top: 32px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-family: 'Martian Mono', monospace;
  font-weight: 800;
  font-size: 24px;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.stat-unit {
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 4px;
}

.stat-label {
  font-family: 'DM Sans', sans-serif;
  font-size: 12px;
  color: var(--text-secondary);
}
```

### Variables CSS utilisées
- `--border` : Séparateur supérieur
- `--text-primary` : Valeurs numériques
- `--text-secondary` : Unités et labels

### Usage
- Statistiques de communauté
- Métriques de performance
- Indicateurs KPI
- Données chiffrées

---

## Guide d'Implémentation

### Checklist pour chaque pattern

#### Avant d'utiliser un pattern :
- [ ] Vérifier que le pattern correspond au besoin
- [ ] Adapter les variables CSS si nécessaire
- [ ] Maintenir la structure HTML sémantique
- [ ] Conserver les classes CSS originales

#### Après implémentation :
- [ ] Tester en mode light et dark
- [ ] Vérifier les transitions et animations
- [ ] Tester la responsivité
- [ ] Valider l'accessibilité

### Customisation

#### Modifier les couleurs :
```css
/* Utiliser les variables de thème */
.mon-pattern {
  background: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

#### Adapter les tailles :
```css
/* Utiliser les variables de spacing */
.mon-pattern {
  padding: var(--spacing-lg);
  gap: var(--spacing-md);
}
```

#### Personnaliser les animations :
```css
/* Utiliser les variables de transition */
.mon-pattern {
  transition: all var(--theme-transition) var(--theme-transition-easing);
}
```

---

## Conclusion

Ces patterns fournissent une base solide pour construire des interfaces cohérentes et maintenables. En utilisant ces structures et les variables CSS du système de thème, vous garantissez :

- **Cohérence visuelle** sur tout le site
- **Thématisation automatique** light/dark
- **Maintenance simplifiée** via variables centralisées
- **Accessibilité** respectée avec des contrastes appropriés
- **Scalabilité** pour les futures évolutions

Chaque pattern est conçu pour être flexible tout en maintenant l'identité visuelle de Data Eng.

---

**Version** : 1.0  
**Date** : 20 Avril 2026  
**Auteur** : Cascade AI Assistant  
**Source** : Page Home - Data Eng Front
