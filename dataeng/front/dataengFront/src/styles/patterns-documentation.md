# Documentation des Patterns de Style - DataEng Front

## Vue d'ensemble

Ce document référence tous les patterns de style identifiés dans la page home et explique comment les utiliser de manière cohérente sur tout le projet.

## Table des matières

1. [Patterns de Grille](#patterns-de-grille)
2. [Patterns de Cartes](#patterns-de-cartes)
3. [Patterns de Navigation](#patterns-de-navigation)
4. [Patterns de Hero](#patterns-de-hero)
5. [Patterns d'Animation](#patterns-danimation)
6. [Patterns de Typographie](#patterns-de-typographie)
7. [Patterns d'Interactivité](#patterns-dinteractivité)
8. [Patterns de Fond et Décoration](#patterns-de-fond-et-décoration)

---

## Patterns de Grille

### 1. Articles Grid (Mosaïque Optimisée)
**Classe** : `.articles-grid`
**Usage** : Mur d'articles avec hero card - Pattern corrigé et optimisé

```css
.articles-grid {
  display: grid;
  grid-template-columns: 1.9fr 1fr 1fr;
  grid-template-rows: auto auto;
  gap: var(--grid-gap-sm);
  background: var(--border);
  border: 1px solid var(--border);
  border-radius: var(--grid-radius-md);
  overflow: hidden;
  position: relative;
  z-index: 1;
}
```

**Structure corrigée** :
- Hero card : `grid-row: 1 / 3` avec rayons logiques
- Cartes secondaires : `grid-row: span 1` avec bordures gérées par conteneur
- Variables CSS pour maintenabilité
- Transitions unifiées du design system

**Corrections appliquées** :
- **Rayons hardcodés** : Remplacés par `var(--grid-radius-md)` et logique `:first-of-type`
- **Gap trop petit** : `2px` remplacé par `var(--grid-gap-sm)` pour meilleure séparation
- **Couleurs hardcodées** : Remplacées par variables du thème (`var(--bg-surface)`, `var(--text-secondary)`)
- **Icônes incohérentes** : Standardisées à 14px pour toutes les cartes
- **Transitions rapides** : `0.2s` remplacées par `var(--grid-transition)` (0.4s)

**Cas d'usage** :
- Page d'accueil (articles) - **Implémenté**
- Page write (articles)
- Galeries de projets

**Voir aussi** : 
- `/src/styles/articles-grid-improvements.md` - Propositions d'amélioration
- `/src/styles/articles-grid-fixes-summary.md` - Corrections appliquées

### 2. Testimonial Grid
**Classe** : `.testimonial-grid`
**Usage** : Témoignages en 3 colonnes

```css
.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1px;
  background: #E8E6E0;
  border: 1px solid #E8E6E0;
  border-radius: 12px;
  overflow: hidden;
}
```

**Caractéristiques** :
- Gap de 1px avec background partagé
- Bordure unifiée autour de la grille
- Chaque carte a son propre background

**Cas d'usage** :
- Page home (témoignages)
- Page members (profils)
- Page story (valeurs)

### 3. Steps Grid
**Classe** : `.steps-container`
**Usage** : Étapes de processus en 4 colonnes

```css
.steps-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2px;
  max-width: 1200px;
  margin: 0 auto;
}
```

**Caractéristiques** :
- 4 colonnes égales avec gap minimal
- Max-width de 1200px centré
- Animation de progression intégrée

**Cas d'usage** :
- Page get-started (étapes)
- Page how-it-works (processus)
- Tutoriels et guides

### 4. Content Grid
**Classe** : `.subtitle-section`
**Usage** : Contenu flexible en 4 colonnes

```css
.subtitle-section {
  display: flex;
  gap: 30px;
  margin-bottom: 60px;
  justify-content: space-between;
  width: 100%;
}

.subtitle-item {
  flex: 1;
  max-width: calc(25% - 22.5px);
}
```

**Caractéristiques** :
- Flexbox avec 4 colonnes égales
- Gap de 30px
- Max-width par élément pour éviter l'overflow

**Cas d'usage** :
- Sous-titres de hero
- Features list
- Avantages/bénéfices

### 5. Cards Grid
**Classe** : `.cards-grid`
**Usage** : Cartes de contenu en 2 colonnes

```css
.cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  justify-content: center;
  align-items: center;
}
```

**Caractéristiques** :
- 2 colonnes égales
- Gap large de 40px
- Alignement centré

**Cas d'usage** :
- Page features
- Comparaisons
- Contenu principal

---

## Patterns de Cartes

### 1. Hero Card
**Classe** : `.hero-card`
**Usage** : Carte principale accentuée

```css
.hero-card {
  grid-row: 1 / 3;
  border-radius: 12px 0 0 12px;
  padding: 28px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}
```

**Éléments inclus** :
- `.trending-badge` : Badge "TRENDING"
- `.category-tag` : Tag de catégorie
- `.article-title` : Titre principal
- `.article-description` : Description
- `.article-author` : Informations auteur
- `.article-stats` : Statistiques
- `.decorative-circles` : Éléments décoratifs
- `.card-glow` : Effet de glow au hover

### 2. Secondary Card
**Classe** : `.secondary-card`
**Usage** : Cartes secondaires compactes

```css
.secondary-card {
  padding: 22px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease;
}
```

**Éléments inclus** :
- `.category-row` : Catégorie + bookmark
- `.article-title` : Titre (plus petit)
- `.article-description` : Description (compacte)
- `.article-author` : Auteur simplifié
- `.article-stats` : Statistiques compactes

### 3. Step Card
**Classe** : `.step-card`
**Usage** : Cartes d'étapes animées

```css
.step-card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 24px;
  padding: 40px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  min-height: 400px;
  transition: all 0.4s ease;
  overflow: hidden;
}
```

**Éléments inclus** :
- `.progress-bar` : Barre de progression
- `.step-number` : Numéro de l'étape
- `.step-icon` : Icône illustrative
- `.step-title` : Titre de l'étape
- `.step-description` : Description
- `.step-badge` : Badge d'état

### 4. Content Card
**Classe** : `.content-item`
**Usage** : Cartes de contenu génériques

```css
.content-item {
  flex: 1;
  color: var(--text-primary);
  text-align: left;
  min-width: 0;
  max-width: calc(25% - 22.5px);
  border-radius: 24px;
  padding: 40px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 500px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--card-bg);
  border: 1px solid var(--border);
}
```

---

## Patterns de Navigation

### 1. Navbar
**Classe** : `.navbar`
**Usage** : Barre de navigation principale

```css
.navbar {
  padding: 20px 48px;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
}
```

**Composants** :
- `.nav-logo` : Logo avec typographie Martian Mono
- `.nav-links` : Liens de navigation
- `.nav-actions` : Actions (theme toggle, CTA)

### 2. Nav Links
**Classe** : `.nav-link`
**Usage** : Liens de navigation

```css
.nav-link {
  font-family: 'DM Sans', sans-serif;
  font-size: 13px;
  color: var(--text-secondary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: var(--text-primary);
}
```

### 3. Theme Toggle
**Classe** : `.theme-toggle`
**Usage** : Bouton de changement de thème

```css
.theme-toggle {
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  color: #cccccc;
}
```

---

## Patterns de Hero

### 1. Hero Full
**Classe** : `.hero-full`
**Usage** : Section hero pleine hauteur

```css
.hero-full {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--bg-page);
  overflow: hidden;
  position: relative;
}
```

**Composants** :
- `.bg-grid` : Grille de fond
- `.bg-orb` : Orbites décoratives
- `.navbar` : Navigation
- `.hero-body` : Contenu principal
- `.ticker` : Ticker défilant

### 2. Hero Title
**Classe** : `.hero-title`
**Usage** : Titres animés avec typewriter

```css
.hero-title {
  margin: 24px 0;
  opacity: 0;
  animation: slidein 0.7s ease 0.25s forwards;
}

.title-line {
  font-family: 'Martian Mono', monospace;
  font-weight: 800;
  font-size: clamp(28px, 5vw, 56px);
  letter-spacing: -0.035em;
  line-height: 1.03;
  color: var(--text-primary);
  margin: 0;
}
```

**Éléments** :
- `.typewriter-text` : Texte animé
- `.cursor` : Curseur clignotant

### 3. Pill Badge
**Classe** : `.pill-badge`
**Usage** : Badge pilule avec animation

```css
.pill-badge {
  display: inline-flex;
  align-items: center;
  background: #111;
  border: 1px solid #1e1e1e;
  border-radius: 100px;
  padding: 6px 14px 6px 8px;
  opacity: 0;
  animation: fadein 0.6s ease 0.1s forwards;
}
```

**Composants** :
- `.pill-dot` : Point animé avec pulse
- `.pill-text` : Texte du badge
- `.pill-highlight` : Texte en surbrillance

### 4. Stats Row
**Classe** : `.stats-row`
**Usage** : Ligne de statistiques

```css
.stats-row {
  display: flex;
  margin-top: 64px;
  border-top: 1px solid #111;
  padding-top: 32px;
  opacity: 0;
  animation: slidein 0.7s ease 0.7s forwards;
}
```

**Structure** :
- 4 `.stat-item` avec valeurs, unités et labels
- Bordures entre les éléments
- Animation d'apparition progressive

---

## Patterns d'Animation

### 1. Fade In
**Usage** : Apparition en fondu

```css
@keyframes fadein {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

**Application** : `.pill-badge`, éléments de chargement

### 2. Slide In
**Usage** : Apparition depuis le bas

```css
@keyframes slidein {
  from { 
    opacity: 0;
    transform: translateY(16px);
  }
  to { 
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Application** : `.hero-title`, `.hero-subtitle`, `.hero-buttons`, `.stats-row`

### 3. Pulse
**Usage** : Animation de pulsation

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
```

**Application** : `.pill-dot`, `.badge-dot`

### 4. Spin
**Usage** : Rotation continue

```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

**Application** : `.circle.outer` (cercles décoratifs)

### 5. Drift
**Usage** : Mouvement de dérive

```css
@keyframes drift1 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(30px, 20px); }
}

@keyframes drift2 {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-20px, 15px); }
}
```

**Application** : `.orb1`, `.orb2` (orbites de fond)

### 6. Float
**Usage** : Mouvement de flottement

```css
@keyframes floatin {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Application** : `.step-title`, `.step-description`

---

## Patterns de Typographie

### 1. Martian Mono (Titres techniques)
**Usage** : Titres, badges, éléments techniques

```css
font-family: 'Martian Mono', monospace;
font-weight: 800; /* pour les titres principaux */
font-weight: 700; /* pour les sous-titres */
font-weight: 400; /* pour les badges */
```

**Applications** :
- `.hero-title` : Titres hero
- `.article-title` : Titres d'articles
- `.header-title` : Titres de sections
- `.category-tag` : Tags de catégorie
- `.stat-value` : Valeurs statistiques

### 2. DM Sans (Textes lisibles)
**Usage** : Descriptions, contenus, textes secondaires

```css
font-family: 'DM Sans', sans-serif;
font-weight: 400; /* pour les descriptions */
font-weight: 500; /* pour les sous-titres */
font-weight: 600; /* pour les boutons */
```

**Applications** :
- `.hero-subtitle` : Sous-titres hero
- `.article-description` : Descriptions
- `.author-name` : Noms d'auteurs
- `.btn-primary` : Boutons principaux

### 3. Hiérarchie typographique

#### Hero Section
- **Titre principal** : Martian Mono 800, `clamp(24px, 5vw, 56px)`
- **Sous-titre** : DM Sans 400, `clamp(16px, 2.5vw, 20px)`

#### Articles
- **Titre hero** : Martian Mono 800, `clamp(18px, 2.5vw, 26px)`
- **Titre secondaire** : Martian Mono 700, 14px
- **Description** : DM Sans 13px (hero) / 12px (secondary)

#### Headers
- **Titre section** : Martian Mono 800, 18px
- **Sous-titre** : DM Sans 13px

---

## Patterns d'Interactivité

### 1. Hover Effects
**Usage** : Effets au survol des cartes

```css
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border-color: var(--text-secondary);
}
```

### 2. Button Hover
**Usage** : Effets au survol des boutons

```css
.btn-primary:hover {
  opacity: 0.85;
}

.btn-secondary:hover {
  color: var(--text-primary);
}

.btn-secondary:hover .btn-arrow {
  transform: translateX(3px);
}
```

### 3. Link Hover
**Usage** : Effets au survol des liens

```css
.nav-link:hover {
  color: var(--text-primary);
}

.view-all-link:hover {
  gap: 9px; /* augmente le gap */
}
```

### 4. Card Overlay
**Usage** : Overlay sur les cartes au hover

```css
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  backdrop-filter: blur(4px);
}
```

---

## Patterns de Fond et Décoration

### 1. Background Grid
**Classe** : `.bg-grid`
**Usage** : Grille de fond subtile

```css
.bg-grid {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(79,110,247,0.04) 1px, transparent 1px), 
    linear-gradient(90deg, rgba(79,110,247,0.04) 1px, transparent 1px);
  background-size: 40px 40px;
  pointer-events: none;
}
```

### 2. Background Orbs
**Classe** : `.bg-orb`
**Usage** : Orbites décoratives animées

```css
.bg-orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.orb1 {
  width: 600px;
  height: 600px;
  top: -200px;
  left: -100px;
  background: radial-gradient(circle, rgba(123,92,245,0.08), transparent 70%);
  animation: drift1 12s ease-in-out infinite alternate;
}

.orb2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  right: -80px;
  background: radial-gradient(circle, rgba(79,110,247,0.06), transparent 70%);
  animation: drift2 15s ease-in-out infinite alternate;
}
```

### 3. Decorative Circles
**Classe** : `.decorative-circles`
**Usage** : Cercles décoratifs sur les cartes

```css
.decorative-circles {
  position: absolute;
  right: -20px;
  top: 50%;
  transform: translateY(-50%);
  width: 240px;
  height: 240px;
  opacity: 0.06;
}

.circle {
  position: absolute;
  border-radius: 50%;
  border: 1px solid #4F6EF7;
}

.circle.outer {
  width: 100%;
  height: 100%;
  animation: spin 20s linear infinite;
}
```

### 4. Glow Effects
**Classe** : `.card-glow`
**Usage** : Effets de glow par catégorie

```css
.card-glow {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

/* Par catégorie */
.article-card[data-category="data-engineering"] .card-glow {
  background: radial-gradient(ellipse at 50% 0%, rgba(79,110,247,0.08), transparent 70%);
}
```

---

## Guidelines d'Utilisation

### 1. Cohérence
- Toujours utiliser les classes de pattern existantes
- Ne pas créer de styles spécifiques sans nécessité
- Respecter la hiérarchie typographique

### 2. Performance
- Utiliser les transitions CSS natives
- Éviter les animations JavaScript coûteuses
- Optimiser les images et assets

### 3. Accessibilité
- Maintenir les contrastes suffisants
- Utiliser les tailles de police lisibles
- Respecter les préférences système

### 4. Responsive
- Toujours tester sur mobile/tablet/desktop
- Utiliser les clamp() pour les tailles fluides
- Adapter les grilles selon les breakpoints

### 5. Thème
- Utiliser les variables CSS du thème
- Tester en light/dark mode
- Maintenir la cohérence des couleurs

---

## Migration et Maintenance

### Pour ajouter un nouveau pattern :
1. Analyser si un pattern existant peut être adapté
2. Documenter le pattern dans ce fichier
3. Ajouter le pattern au système de grille si nécessaire
4. Tester sur toutes les pages

### Pour modifier un pattern existant :
1. Vérifier l'impact sur toutes les pages
2. Mettre à jour la documentation
3. Tester le responsive et le thème
4. Communiquer les changements à l'équipe

### Pour déprécier un pattern :
1. Identifier les pages utilisatrices
2. Planifier la migration
3. Maintenir la compatibilité pendant la transition
4. Supprimer après migration complète

---

## Références

- [Brand Guidelines](../BRAND.md)
- [Grid System](./grids.css)
- [Variables CSS](./variables.css)
- [Theme Documentation](../THEME_TOGGLE_DOCUMENTATION.md)

---

*Dernière mise à jour : 19 Avril 2026*
*Auteur : Cascade AI Assistant*
