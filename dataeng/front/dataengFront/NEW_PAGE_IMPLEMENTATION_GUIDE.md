# Guide d'Implémentation pour Nouvelles Pages

## Vue d'ensemble

Ce guide explique comment créer de nouvelles pages qui bénéficient automatiquement du système de thème light/dark mode avec transitions ultra-smooth.

---

## Prérequis

### Structure du Projet
```
src/
 modules/
   [nom-page]/
     index.tsx          # Composant React principal
     styles.css         # Styles spécifiques à la page
   common.css          # Styles partagés (importer obligatoire)
 hooks/
   useTheme.ts         # Hook de gestion du thème
 components/
   Layout.tsx          # Layout global avec navigation
   Navigation.tsx     # Navigation avec toggle thème
 index.css            # Variables CSS globales
```

---

## Étape 1 : Création du Composant de Page

### Structure de Base
```tsx
// src/modules/[nom-page]/index.tsx
import './styles.css'
import '../common.css'

const NomPage = () => {
  return (
    <div className="page nom-page">
      <section className="hero">
        <h1>Titre de la Page</h1>
        <p>Description de la page</p>
      </section>
      
      <section className="content">
        {/* Contenu principal */}
      </section>
    </div>
  )
}

export default NomPage
```

### Import Obligatoire
```tsx
import './styles.css'    // Styles spécifiques à la page
import '../common.css'   // Styles partagés avec thème
```

---

## Étape 2 : Configuration des Styles

### CSS de Base avec Thème
```css
/* src/modules/[nom-page]/styles.css */

/* Conteneur principal de la page */
.nom-page {
  background: var(--bg-page);
  min-height: 100vh;
  padding: 0;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Section Hero */
.nom-page .hero {
  text-align: center;
  padding: 80px 40px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Titres */
.nom-page .hero h1 {
  color: var(--text-primary);
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Textes */
.nom-page .hero p {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Section Contenu */
.nom-page .content {
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Cartes */
.nom-page .card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 20px;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.nom-page .card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

/* Boutons */
.nom-page .btn-primary {
  background: var(--accent-blue);
  color: var(--text-primary);
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.nom-page .btn-primary:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.nom-page .btn-secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Étape 3 : Ajout de la Route

### Configuration dans App.tsx
```tsx
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './modules/home'
import Story from './modules/story'
import Members from './modules/members'
import Write from './modules/write'
import Auth from './modules/auth'
import GetStarted from './modules/get-started'
import NomPage from './modules/[nom-page]'  // Importer la nouvelle page

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/members" element={<Members />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/nom-page" element={<NomPage />} />  // Ajouter la route
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
```

---

## Étape 4 : Navigation

### Ajout du Lien dans Navigation
```tsx
// src/components/Navigation.tsx
<div className="nav-links" data-dark-bg={isDarkBg}>
  <Link to="/" className="nav-link">Home</Link>
  <Link to="/story" className="nav-link">Story</Link>
  <Link to="/members" className="nav-link">Les membres</Link>
  <Link to="/write" className="nav-link">Publier</Link>
  <Link to="/nom-page" className="nav-link">Nom Page</Link>  // Ajouter le lien
</div>
```

---

## Composants Réutilisables avec Thème

### Carte Standard
```tsx
// src/components/Card.tsx
import './Card.css'

interface CardProps {
  children: React.ReactNode
  className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

export default Card
```

```css
/* src/components/Card.css */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}
```

### Bouton Thémifié
```tsx
// src/components/Button.tsx
import './Button.css'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  className?: string
}

const Button = ({ children, variant = 'primary', onClick, className = '' }: ButtonProps) => {
  return (
    <button 
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
```

```css
/* src/components/Button.css */
.btn {
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-primary {
  background: var(--accent-blue);
  color: var(--text-primary);
}

.btn-primary:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

.btn-secondary {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  background: var(--card-bg);
  border-color: var(--text-secondary);
}
```

---

## Patterns Courants

### Grille de Cartes
```css
.nom-page .cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 40px;
}

.nom-page .cards-grid .card {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Section avec Fond Alterné
```css
.nom-page .alternating-section {
  background: var(--bg-surface);
  padding: 60px 40px;
  margin: 40px 0;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}
```

### Formulaire Thémifié
```css
.nom-page .form-group {
  margin-bottom: 20px;
}

.nom-page .form-label {
  display: block;
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 8px;
}

.nom-page .form-input {
  width: 100%;
  padding: 12px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 8px;
  color: var(--text-primary);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.nom-page .form-input:focus {
  outline: none;
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
}
```

---

## Checklist d'Implémentation

### Structure
- [ ] Créer le dossier `src/modules/[nom-page]/`
- [ ] Créer `index.tsx` avec imports obligatoires
- [ ] Créer `styles.css` avec variables de thème
- [ ] Ajouter la route dans `App.tsx`
- [ ] Ajouter le lien dans `Navigation.tsx`

### Styles
- [ ] Utiliser `var(--bg-page)` pour les fonds
- [ ] Utiliser `var(--text-primary)` pour les textes principaux
- [ ] Utiliser `var(--text-secondary)` pour les textes secondaires
- [ ] Utiliser `var(--border)` pour les bordures
- [ ] Utiliser `var(--card-bg)` pour les cartes
- [ ] Ajouter les transitions ultra-smooth

### Transitions
- [ ] `transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] `transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] `transition: border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)`
- [ ] `transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)`

### Test
- [ ] Vérifier l'apparence en mode light
- [ ] Vérifier l'apparence en mode dark
- [ ] Tester la transition entre les thèmes
- [ ] Vérifier la responsivité
- [ ] Tester l'accessibilité (contrastes, navigation clavier)

---

## Erreurs Communes à Éviter

### 1. Couleurs Hardcodées
```css
/* Incorrect */
.ma-carte {
  background: #ffffff;
  color: #1a1a1a;
}

/* Correct */
.ma-carte {
  background: var(--card-bg);
  color: var(--text-primary);
}
```

### 2. Oubli des Transitions
```css
/* Incorrect */
.mon-element {
  background: var(--bg-page);
  color: var(--text-primary);
}

/* Correct */
.mon-element {
  background: var(--bg-page);
  color: var(--text-primary);
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 3. Import Manquant
```tsx
// Incorrect
import './styles.css'

// Correct
import './styles.css'
import '../common.css'
```

---

## Exemple Complet

### Page "À Propos"
```tsx
// src/modules/about/index.tsx
import './styles.css'
import '../common.css'

const About = () => {
  return (
    <div className="page about-page">
      <section className="hero">
        <h1>À Propos de Data Eng</h1>
        <p>Découvrez notre mission et notre vision pour la communauté data au Congo.</p>
      </section>
      
      <section className="content">
        <div className="cards-grid">
          <div className="card">
            <h3>Notre Mission</h3>
            <p>Créer un espace collaboratif pour les passionnés de data.</p>
          </div>
          <div className="card">
            <h3>Nos Valeurs</h3>
            <p>Partage, collaboration, innovation et inclusion.</p>
          </div>
          <div className="card">
            <h3>Notre Vision</h3>
            <p>Devenir la référence francophone pour les compétences data.</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
```

```css
/* src/modules/about/styles.css */
.about-page {
  background: var(--bg-page);
  min-height: 100vh;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .hero {
  text-align: center;
  padding: 80px 40px;
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border);
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .hero h1 {
  color: var(--text-primary);
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .hero p {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .content {
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.about-page .cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.about-page .card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
  transition: background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.5s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow);
}

.about-page .card h3 {
  color: var(--text-primary);
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 12px;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.about-page .card p {
  color: var(--text-secondary);
  line-height: 1.6;
  transition: color 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Conclusion

En suivant ce guide, chaque nouvelle page bénéficiera automatiquement :

- **Système de thème complet** (light/dark)
- **Transitions ultra-smooth** 
- **Cohérence visuelle** avec le reste de l'application
- **Performance optimale** avec CSS variables natives
- **Accessibilité** respectée

Le système est conçu pour être **automatique** - il suffit d'utiliser les variables CSS et les transitions appropriées pour que tout fonctionne parfaitement sur toutes les pages.

---

**Version** : 1.0  
**Date** : 19 Avril 2026  
**Auteur** : Cascade AI Assistant
