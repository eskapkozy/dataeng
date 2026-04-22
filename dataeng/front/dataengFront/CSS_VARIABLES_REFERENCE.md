# Référence des Variables CSS - Système de Thème

## Vue d'ensemble

Ce document référence toutes les variables CSS utilisées dans le système de thème light/dark mode de Data Eng Front.

---

## Variables de Thème Principales

### Fond et Surface
| Variable | Mode Light | Mode Dark | Type d'éléments |
|----------|------------|-----------|------------------|
| `--bg-page` | `#F5F4F0` | `#1f1f1f` | Fond principal des pages, sections complètes |
| `--bg-surface` | `#FDFCF9` | `#2a2a2a` | Fond des surfaces, cartes, zones de recherche, formulaires |
| `--card-bg` | `#ffffff` | `#2a2a2a` | Fond spécifique des cartes, conteneurs |

### Texte
| Variable | Mode Light | Mode Dark | Type d'éléments |
|----------|------------|-----------|------------------|
| `--text-primary` | `#1a1a1a` | `#f5f5f0` | Titres principaux, textes importants, labels primaires |
| `--text-secondary` | `#888888` | `#a0a090` | Descriptions, sous-titres, textes secondaires, métadonnées |
| `--text-h` | `var(--text-primary)` | `var(--text-primary)` | Héritage pour titres (heading) |

### Bordures
| Variable | Mode Light | Mode Dark | Type d'éléments |
|----------|------------|-----------|------------------|
| `--border` | `#E8E6E0` | `#404040` | Bordures principales, séparateurs, contours |
| `--code-bg` | `var(--bg-surface)` | `#353535` | Fond des éléments code, blocks de code |

### Accents
| Variable | Mode Light | Mode Dark | Type d'éléments |
|----------|------------|-----------|------------------|
| `--accent-blue` | `#4F6EF7` | `#4F6EF7` | Actions principales, liens, boutons primaires, éléments interactifs |
| `--accent-purple` | `#7B5CF5` | `#c084fc` | Accents secondaires, badges, éléments décoratifs |
| `--accent-cyan` | `#22d3ee` | `#22d3ee` | Éléments spéciaux, accents visuels |
| `--active-green` | `#3ecf8e` | `#3ecf8e` | États actifs, succès, indicateurs positifs |
| `--warning-orange` | `#F5A623` | `#F5A623` | Avertissements, alertes, indicateurs d'attention |

### Navigation
| Variable | Mode Light | Mode Dark | Type d'éléments |
|----------|------------|-----------|------------------|
| `--nav-link-color` | `#FDFCF9` | `#f5f5f0` | Couleur des liens de navigation |

---

## Variables de Transition

### Timing et Durée
```css
:root {
  --theme-transition-duration: 0.5s;
  --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Application Universelle
```css
* {
  transition-property: background-color, color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform;
  transition-timing-function: var(--theme-transition-easing);
  transition-duration: var(--theme-transition-duration);
}
```

---

## Variables Héritées (Compatibilité)

### Variables Existantes
```css
:root {
  /* Variables existantes qui mappent vers le système de thème */
  --text: var(--text-primary);
  --text-h: var(--text-primary);
  --bg: var(--bg-page);
  --border: var(--border);
  --code-bg: var(--bg-surface);
  --accent: var(--accent-purple);
  --accent-bg: rgba(170, 59, 255, 0.1);
  --accent-border: rgba(170, 59, 255, 0.5);
  --social-bg: rgba(244, 243, 236, 0.5);
}
```

### Mode Dark
```css
[data-theme="dark"] {
  --text: var(--text-primary);
  --text-h: var(--text-primary);
  --bg: var(--bg-page);
  --border: var(--border);
  --code-bg: #1f2028;
  --accent: #c084fc;
  --accent-bg: rgba(192, 132, 252, 0.15);
  --accent-border: rgba(192, 132, 252, 0.5);
  --social-bg: rgba(47, 48, 58, 0.5);
}
```

---

## Variables Typographiques

### Polices
```css
:root {
  --sans: system-ui, 'Segoe UI', Roboto, sans-serif;
  --heading: system-ui, 'Segoe UI', Roboto, sans-serif;
  --mono: ui-monospace, Consolas, monospace;
}
```

### Tailles et Styles
```css
:root {
  font: 18px/145% var(--sans);
  letter-spacing: 0.18px;
  color-scheme: light dark;
  color: var(--text);
  background: var(--bg);
}
```

---

## Variables d'Ombres

### Mode Light
```css
:root {
  --shadow: rgba(0, 0, 0, 0.1) 0 10px 15px -3px, rgba(0, 0, 0, 0.05) 0 4px 6px -2px;
}
```

### Mode Dark
```css
[data-theme="dark"] {
  --shadow: rgba(0, 0, 0, 0.4) 0 10px 15px -3px, rgba(0, 0, 0, 0.25) 0 4px 6px -2px;
}
```

---

## Utilisation dans les Composants

### 1. Fond et Texte de Base
```css
.composant-de-base {
  background: var(--bg-page);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

### 2. Cartes et Surfaces
```css
.carte {
  background: var(--card-bg);
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
}
```

### 3. Éléments Interactifs
```css
.bouton-primaire {
  background: var(--accent-blue);
  color: var(--text-primary);
}

.bouton-secondaire {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

### 4. Textes Spécifiques
```css
.titre {
  color: var(--text-primary);
  font-family: var(--heading);
}

.description {
  color: var(--text-secondary);
  font-family: var(--sans);
}
```

### 5. Éléments Code
```css
.code-element {
  background: var(--code-bg);
  color: var(--text-primary);
  font-family: var(--mono);
}
```

---

## Bonnes Pratiques

### 1. Utiliser les Variables Sémantiques
```css
/* Correct */
.ma-carte {
  background: var(--card-bg);
  color: var(--text-primary);
}

/* Éviter */
.ma-carte {
  background: #ffffff;
  color: #1a1a1a;
}
```

### 2. Transitions Cohérentes
```css
.mon-element {
  transition: background-color var(--theme-transition-duration) var(--theme-transition-easing),
              color var(--theme-transition-duration) var(--theme-transition-easing),
              border-color var(--theme-transition-duration) var(--theme-transition-easing);
}
```

### 3. Fallbacks pour Compatibilité
```css
.mon-element {
  background: var(--bg-page, #F5F4F0);
  color: var(--text-primary, #1a1a1a);
}
```

---

## Variables par Catégorie d'Usage

### Pages et Sections
- `--bg-page` : Fond principal des pages, arrière-plan des sections
- `--text-primary` : Titres de pages, en-têtes principaux
- `--text-secondary` : Sous-titres de pages, descriptions de sections

### Cartes et Conteneurs
- `--card-bg` : Fond des cartes, conteneurs de contenu
- `--bg-surface` : Zones de recherche, panneaux, formulaires
- `--border` : Contours des cartes, séparateurs

### Navigation et Header
- `--nav-link-color` : Liens de navigation principale
- `--accent-blue` : Logo et éléments de branding
- `--text-primary` : Titres de navigation

### Boutons et Actions
- `--accent-blue` : Boutons primaires, actions principales
- `--accent-purple` : Boutons secondaires, actions alternatives
- `--text-primary` : Texte des boutons sur fond coloré
- `--text-secondary` : Boutons secondaires sans fond

### Formulaires et Inputs
- `--bg-surface` : Fond des champs de formulaire
- `--card-bg` : Fond des selecteurs et dropdowns
- `--text-primary` : Labels des formulaires
- `--border` : Contours des inputs
- `--accent-blue` : États focus, bordures actives

### Contenu Textuel
- `--text-primary` : Titres d'articles, noms, textes importants
- `--text-secondary` : Descriptions, métadonnées, textes secondaires
- `--accent-blue` : Liens, mots-clés en surbrillance

### Éléments Interactifs
- `--accent-blue` : Liens cliquables, éléments hover
- `--accent-purple` : Badges, tags, éléments décoratifs
- `--active-green` : Indicateurs de succès, états actifs
- `--warning-orange` : Alertes, warnings, indicateurs d'attention

### Structure et Layout
- `--border` : Lignes de séparation, contours
- `--shadow` : Ombres des cartes et éléments surélevés
- `--code-bg` : Fond des blocks de code

### Données et Statistiques
- `--text-primary` : Valeurs numériques, chiffres importants
- `--text-secondary` : Libellés, unités, descriptions de données
- `--accent-blue` : Éléments de graphiques, visualisations

---

## Debugging des Variables

### Vérification dans le Navigateur
1. Ouvrir DevTools
2. Sélectionner un élément
3. Onglet "Computed"
4. Filtrer par "var(--" pour voir toutes les variables
5. Vérifier les valeurs résolues

### Commandes Console Utiles
```javascript
// Vérifier le thème actuel
document.documentElement.getAttribute('data-theme')

// Vérifier une variable spécifique
getComputedStyle(document.documentElement).getPropertyValue('--bg-page')

// Lister toutes les variables CSS
Array.from(getComputedStyle(document.documentElement)).filter(prop => prop.startsWith('--'))
```

---

## Extensibilité

### Ajouter une Nouvelle Variable
```css
:root {
  --ma-nouvelle-variable: valeur-light;
}

[data-theme="dark"] {
  --ma-nouvelle-variable: valeur-dark;
}
```

### Créer des Variables Composées
```css
:root {
  --gradient-primary: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-purple) 100%);
  --shadow-card: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

---

## Migration depuis les Anciennes Variables

### Mapping
| Ancienne | Nouvelle | Action |
|----------|----------|--------|
| `--color-black` | `--text-primary` | Remplacer |
| `--color-cream` | `--bg-page` | Remplacer |
| `--color-white` | `--card-bg` | Remplacer |
| `--color-blue` | `--accent-blue` | Remplacer |

### Exemple de Migration
```css
/* Avant */
.page {
  background: var(--color-cream);
  color: var(--color-black);
}

/* Après */
.page {
  background: var(--bg-page);
  color: var(--text-primary);
}
```

---

## Pattern Structure + Variables (Extrait de la page Home)

### 🏗️ **Pattern de Structure Cohérente**

#### **1. Organisation des Composants**
```css
/* Structure de base */
.page {
  background: var(--bg-page);
  color: var(--text-primary);
  transition: var(--theme-transition);
}

/* Conteneurs principaux */
.main-container {
  background: var(--bg-page);
  padding: var(--spacing-xl);
}

/* Cartes et conteneurs */
.card {
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  transition: var(--transition-normal);
}
```

#### **2. Hiérarchie Typographique**
```css
/* Titres principaux */
.main-title {
  color: var(--text-primary);
  font-size: 3.5rem;
  font-weight: 700;
}

/* Sous-titres */
.subtitle {
  color: var(--text-secondary);
  font-size: 0.85rem;
  line-height: 1.4;
}

/* Texte secondaire */
.description {
  color: var(--text-secondary);
  font-size: 13px;
}
```

#### **3. Éléments Interactifs**
```css
/* Boutons primaires */
.btn-primary {
  background: var(--accent-blue);
  color: var(--text-primary);
  border: none;
  transition: var(--transition-fast);
}

/* Boutons secondaires */
.btn-secondary {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
}

/* États hover */
.btn-secondary:hover {
  color: var(--text-primary);
  border-color: var(--text-primary);
}
```

#### **4. Badges et Tags**
```css
/* Tags de catégorie */
.tag {
  background: var(--bg-surface);
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: var(--radius-xs);
}

/* Badges colorés */
.tag-blue {
  background: rgba(79, 110, 247, 0.1);
  color: var(--accent-blue);
}

.tag-green {
  background: rgba(62, 207, 142, 0.1);
  color: var(--active-green);
}
```

#### **5. Formulaires et Inputs**
```css
/* Champs de saisie */
.form-input {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
}

/* Labels */
.form-label {
  color: var(--text-primary);
  font-weight: 700;
}

/* États focus */
.form-input:focus {
  border-color: var(--accent-blue);
  box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.1);
}
```

### 🎨 **Pattern de Variables Réutilisables**

#### **Variables Fondamentales**
```css
:root {
  /* Système de transition universel */
  --theme-transition-duration: 0.5s;
  --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Application automatique à tous les éléments */
  * {
    transition-property: background-color, color, border-color;
    transition-timing-function: var(--theme-transition-easing);
    transition-duration: var(--theme-transition-duration);
  }
}
```

#### **Mapping Sémantique**
| Type d'élément | Variable principale | Variable secondaire | Usage |
|----------------|------------------|-------------------|-------|
| **Fonds** | `--bg-page` | `--bg-surface` | Pages, cartes, formulaires |
| **Textes** | `--text-primary` | `--text-secondary` | Titres, descriptions |
| **Bordures** | `--border` | - | Séparateurs, contours |
| **Actions** | `--accent-blue` | `--accent-purple` | Boutons, liens |
| **États** | `--active-green` | `--warning-orange` | Succès, alertes |

#### **Pattern de Transitions**
```css
/* Transitions cohérentes */
.element {
  transition: background-color var(--theme-transition) var(--theme-transition-easing),
              color var(--theme-transition) var(--theme-transition-easing),
              border-color var(--theme-transition) var(--theme-transition-easing);
}

/* Transitions rapides */
.fast-transition {
  transition: var(--transition-fast);
}

/* Transitions normales */
.normal-transition {
  transition: var(--transition-normal);
}
```

### 📋 **Checklist d'Implémentation**

#### **Pour chaque nouveau composant :**
- [ ] Utiliser `var(--bg-page)` pour le fond principal
- [ ] Utiliser `var(--card-bg)` pour les conteneurs
- [ ] Utiliser `var(--text-primary)` pour les titres
- [ ] Utiliser `var(--text-secondary)` pour les descriptions
- [ ] Utiliser `var(--border)` pour les séparateurs
- [ ] Utiliser `var(--accent-blue)` pour les actions principales
- [ ] Appliquer les transitions du thème

#### **Pour chaque nouvelle page :**
- [ ] Importer les variables du thème
- [ ] Structurer avec les conteneurs standards
- [ ] Appliquer la hiérarchie typographique
- [ ] Tester en mode light et dark

### 🎯 **Bénéfices du Pattern**

✅ **Cohérence visuelle** : Tous les éléments suivent les mêmes règles
✅ **Thématisation automatique** : Light/Dark mode sans effort
✅ **Maintenance simplifiée** : Modifier une variable = impact global
✅ **Accessibilité** : Contrastes optimisés pour tous les thèmes
✅ **Scalabilité** : Nouveaux composants intègrent parfaitement
✅ **Performance** : Variables CSS natives = rapidité

---

## Variables de Filtres Unifiés

### Vue d'ensemble
Système de variables CSS partagées pour tous les filtres du site Data Eng, basé sur le style optimal de la page home.

### Fichier de référence
`/src/styles/filters.css` - Importé dans toutes les pages utilisant des filtres

### Variables Principales

#### Dimensions et Espacement
| Variable | Valeur | Usage |
|----------|--------|------|
| `--filter-padding-y` | `6px` | Padding vertical des filtres |
| `--filter-padding-x` | `14px` | Padding horizontal des filtres |
| `--filter-padding` | `6px 14px` | Padding complet (composite) |
| `--filter-border-radius` | `100px` | Style "pills" arrondi |
| `--filter-font-size` | `12px` | Taille de police des filtres |
| `--filter-gap` | `6px` | Espacement entre les filtres |

#### Couleurs et États
| Variable | Valeur (Light) | Valeur (Dark) | Usage |
|----------|---------------|---------------|------|
| `--filter-bg` | `transparent` | `transparent` | Fond des filtres inactifs |
| `--filter-border` | `var(--border)` | `var(--border)` | Bordure des filtres |
| `--filter-color` | `var(--text-secondary)` | `var(--text-secondary)` | Texte des filtres inactifs |
| `--filter-hover-color` | `var(--text-primary)` | `var(--text-primary)` | Texte au survol |
| `--filter-hover-border` | `var(--text-primary)` | `var(--text-primary)` | Bordure au survol |
| `--filter-active-bg` | `var(--accent-blue)` | `var(--accent-blue)` | Fond du filtre actif |
| `--filter-active-border` | `var(--accent-blue)` | `var(--accent-blue)` | Bordure du filtre actif |
| `--filter-active-color` | `var(--text-primary)` | `var(--text-primary)` | Texte du filtre actif |

#### Animations et Transitions
| Variable | Valeur | Usage |
|----------|--------|------|
| `--filter-transition` | `all 0.2s ease` | Transition des filtres |
| `--filter-hover-transform` | `translateY(-1px)` | Transformation au survol |
| `--filter-active-transform` | `scale(1.05)` | Transformation à l'état actif |

### Classes CSS Unifiées

#### Classes de Base
```css
.filter-btn    /* Boutons de filtre principaux */
.filter-chip   /* Chips de filtre (alternative) */
.filter-tag    /* Tags de filtre (alternative) */
```

#### Classes de Conteneurs
```css
.filter-bar      /* Barre de filtres horizontale */
.filter-group    /* Groupe de filtres */
.filter-container /* Conteneur générique de filtres */
```

#### Modificateurs de Taille
```css
.filter-btn--sm   /* Petit : 4px 12px, 11px */
.filter-btn--lg   /* Grand : 8px 18px, 14px */
```

#### Modificateurs de Style
```css
.filter-btn--outline  /* Style outline avec bordure bleue */
```

### Implémentation

#### 1. Import dans les pages
```tsx
// Dans chaque page utilisant des filtres
import '../../styles/filters.css'
```

#### 2. Utilisation dans le JSX
```tsx
<div className="filter-bar">
  <button className="filter-btn active">Tous</button>
  <button className="filter-btn">Data Engineering</button>
  <button className="filter-btn">Machine Learning</button>
</div>
```

#### 3. Styles personnalisés (si nécessaire)
```css
/* Override spécifique tout en gardant les variables */
.page-specific .filter-btn {
  --filter-padding-y: 8px;  /* Override du padding */
  --filter-font-size: 14px;  /* Override de la taille */
}
```

### États et Interactions

#### État Normal
```css
.filter-btn {
  /* Fond transparent, bordure grise, texte gris */
  background: var(--filter-bg);
  border: 1px solid var(--filter-border);
  color: var(--filter-color);
}
```

#### État Hover
```css
.filter-btn:hover {
  /* Bordure et texte principal, légère translation */
  border-color: var(--filter-hover-border);
  color: var(--filter-hover-color);
  transform: var(--filter-hover-transform);
}
```

#### État Actif
```css
.filter-btn.active {
  /* Fond bleu, texte blanc, légère mise à l'échelle */
  background: var(--filter-active-bg);
  border-color: var(--filter-active-border);
  color: var(--filter-active-color);
  transform: var(--filter-active-transform);
  box-shadow: 0 2px 8px rgba(79, 110, 247, 0.2);
}
```

### Accessibilité

#### Focus
```css
.filter-btn:focus {
  outline: 2px solid var(--accent-blue);
  outline-offset: 2px;
}
```

#### Disabled
```css
.filter-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}
```

### Support Dark Mode

Le système s'adapte automatiquement au thème via les variables CSS :
```css
[data-theme="dark"] {
  --filter-border: var(--border, #404040);
  --filter-color: var(--text-secondary, #a0a090);
  --filter-hover-color: var(--text-primary, #f5f5f0);
  --filter-hover-border: var(--text-primary, #f5f5f0);
}
```

### Pages Actuellement Utilisatrices

1. **Page Home** (`/src/modules/home/`)
   - Filtres du mur d'articles
   - Import : `import '../../styles/filters.css'`

2. **Page Events** (`/src/modules/events/`)
   - Filtres d'événements (tous, meetup, workshop, etc.)
   - Import : `import '../../styles/filters.css'`

### Bonnes Pratiques

#### 1. Utiliser les classes standards
```css
/* Correct */
<button className="filter-btn active">Tous</button>

/* Éviter les styles inline */
<button style={{background: 'blue'}}>Tous</button>
```

#### 2. Maintenir la cohérence
```css
/* Utiliser les variables pour les personnalisations */
.custom-filter {
  --filter-padding: 8px 16px;  /* OK */
  padding: 8px 16px;           /* Non recommandé */
}
```

#### 3. Accessibilité
```tsx
// Ajouter les attributs ARIA
<button 
  className="filter-btn"
  aria-pressed={isActive}
  aria-label={`Filtrer par ${category}`}
>
  {category}
</button>
```

### Extensibilité

#### Ajouter un nouveau type de filtre
```css
/* Dans filters.css */
.filter-btn--custom {
  --filter-bg: rgba(79, 110, 247, 0.1);
  --filter-border: var(--accent-blue);
  --filter-color: var(--accent-blue);
}
```

#### Créer des thèmes de filtres
```css
.filter-theme-dark {
  --filter-bg: rgba(0, 0, 0, 0.2);
  --filter-border: rgba(255, 255, 255, 0.2);
  --filter-color: rgba(255, 255, 255, 0.8);
}
```

### Migration depuis les anciens styles

#### Avant
```css
.page-specific .filter-btn {
  padding: 6px 16px;
  border-radius: 6px;
  background: transparent;
  color: #666666;
  /* ... styles personnalisés */
}
```

#### Après
```css
/* Import du système unifié */
@import '../../styles/filters.css';

/* Plus besoin de styles personnalisés */
.filter-btn {
  /* Styles automatiques via les variables */
}
```

---

## Variables de Open Buttons Unifiées

### Vue d'ensemble
Système de variables CSS pour tous les boutons d'ouverture/navigation du site Data Eng : "En savoir plus", "Voir profil", "Nous contacter", etc.

### Fichier de référence
`/src/styles/openButton.css` - Importé dans les pages utilisant des boutons d'ouverture

### Variables Principales

#### Couleurs et Fond
| Variable | Valeur (Light) | Valeur (Dark) | Usage |
|----------|---------------|---------------|------|
| `--open-btn-bg` | `transparent` | `transparent` | Fond des boutons inactifs |
| `--open-btn-bg-hover` | `transparent` | `transparent` | Fond au survol |
| `--open-btn-color` | `var(--text-secondary)` | `var(--text-secondary)` | Texte des boutons inactifs |
| `--open-btn-color-hover` | `var(--text-primary)` | `var(--text-primary)` | Texte au survol |
| `--open-btn-border` | `none` | `none` | Bordure des boutons |
| `--open-btn-border-hover` | `none` | `none` | Bordure au survol |

#### Typographie
| Variable | Valeur | Usage |
|----------|--------|------|
| `--open-btn-font-family` | `'DM Sans', sans-serif` | Police des boutons |
| `--open-btn-font-weight` | `500` | Graisse de la police |
| `--open-btn-font-size` | `16px` | Taille de police |
| `--open-btn-letter-spacing` | `0.01em` | Espacement des lettres |
| `--open-btn-line-height` | `1.4` | Hauteur de ligne |

#### Dimensions et Espacement
| Variable | Valeur | Usage |
|----------|--------|------|
| `--open-btn-padding-y` | `var(--spacing-sm, 8px)` | Padding vertical |
| `--open-btn-padding-x` | `var(--spacing-lg, 24px)` | Padding horizontal |
| `--open-btn-padding` | `var(--open-btn-padding-y) var(--open-btn-padding-x)` | Padding complet |
| `--open-btn-border-radius` | `var(--radius-sm, 8px)` | Rayon des coins |
| `--open-btn-min-height` | `44px` | Hauteur minimum (accessibilité) |

#### Transitions et Animations
| Variable | Valeur | Usage |
|----------|--------|------|
| `--open-btn-transition` | `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Transition principale |
| `--open-btn-transition-fast` | `0.2s ease` | Transitions rapides |
| `--open-btn-transition-smooth` | `0.3s cubic-bezier(0.4, 0, 0.2, 1)` | Transitions fluides |

#### Transformations
| Variable | Valeur | Usage |
|----------|--------|------|
| `--open-btn-hover-transform` | `translateY(-2px)` | Translation au survol |
| `--open-btn-active-transform` | `translateY(0) scale(0.98)` | Transformation au clic |
| `--open-btn-arrow-hover-transform` | `translateX(4px)` | Animation des flèches |

#### Effets Visuels
| Variable | Valeur | Usage |
|----------|--------|------|
| `--open-btn-shadow` | `none` | Ombre des boutons |
| `--open-btn-shadow-hover` | `none` | Ombre au survol |
| `--open-btn-shadow-active` | `none` | Ombre au clic |
| `--open-btn-z-index` | `1` | Index de superposition |
| `--open-btn-shine-overlay` | `linear-gradient(135deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0) 100%)` | Effet de brillance |

### Classes CSS Unifiées

#### Classes de Base
```css
.open-btn      /* Bouton d'ouverture principal */
.btn-open      /* Alternative nommée */
.open-button   /* Alternative descriptive */
```

#### Modificateurs de Style
```css
.open-btn--arrow     /* Avec flèche animée */
.open-btn--float     /* Animation de flottement au survol */
.open-btn--compact   /* Version compacte */
.open-btn--large     /* Version large */
```

### Implémentation

#### 1. Import dans les pages
```tsx
// Dans chaque page utilisant des boutons d'ouverture
import '../../styles/openButton.css'
```

#### 2. Utilisation dans le JSX
```tsx
<button className="open-btn">
  En savoir plus
  <span className="btn-arrow">→</span>
</button>

<a href="#" className="open-btn open-btn--arrow">
  Voir le profil
</a>
```

#### 3. Styles personnalisés (si nécessaire)
```css
/* Override spécifique tout en gardant les variables */
.page-specific .open-btn {
  --open-btn-color: var(--accent-blue);
  --open-btn-font-size: 14px;
}
```

### États et Interactions

#### État Normal
```css
.open-btn {
  /* Fond transparent, texte secondaire, pas de bordure */
  background: var(--open-btn-bg);
  color: var(--open-btn-color);
  border: var(--open-btn-border);
}
```

#### État Hover
```css
.open-btn:hover {
  /* Texte principal, légère translation vers le haut */
  color: var(--open-btn-color-hover);
  transform: var(--open-btn-hover-transform);
}
```

#### État Actif
```css
.open-btn:active {
  /* Légère réduction d'échelle au clic */
  transform: var(--open-btn-active-transform);
}
```

#### Focus (Accessibilité)
```css
.open-btn:focus-visible {
  outline: 2px solid var(--accent-blue);
  outline-offset: 3px;
  box-shadow: 0 0 0 4px rgba(79, 110, 247, 0.1);
}
```

### Animations Spéciales

#### Effet de Brillance (Shine)
```css
.open-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--open-btn-shine-overlay);
  transform: translateX(-100%) rotate(45deg);
  transition: transform 0.6s ease;
  pointer-events: none;
}

.open-btn:hover::before {
  transform: translateX(200%) rotate(45deg);
  animation: openButtonShine 0.6s ease;
}
```

#### Animation de Flotttement
```css
.open-btn--float:hover {
  animation: openButtonFloat 2s ease-in-out infinite;
}

@keyframes openButtonFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
```

### Support Dark Mode

Le système s'adapte automatiquement au thème via les variables CSS :
```css
[data-theme="dark"] .open-btn {
  --open-btn-color: var(--text-secondary, #a0a090);
  --open-btn-color-hover: var(--text-primary, #f5f5f0);
}
```

### Résolution des Conflits

Priorité PLUS ÉLEVÉE pour open-btn dans les modules story :
```css
.story-section .cta-buttons .open-btn {
  /* Forcer les styles open-btn par-dessus cta-button */
  font-family: var(--open-btn-font-family) !important;
  font-size: var(--open-btn-font-size) !important;
  /* ... autres styles avec !important */
}
```

### États Spéciaux

#### Bouton Désactivé
```css
.open-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none !important;
  pointer-events: none;
}
```

#### Bouton en Chargement
```css
.open-btn.loading {
  pointer-events: none;
  opacity: 0.7;
}

.open-btn.loading::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### Responsive Design

#### Mobile (≤768px)
```css
@media (max-width: 768px) {
  .open-btn {
    --open-btn-font-size: 14px;
    --open-btn-padding-y: var(--spacing-sm, 8px);
    --open-btn-padding-x: var(--spacing-md, 16px);
  }
}
```

#### Petit Mobile (≤480px)
```css
@media (max-width: 480px) {
  .open-btn {
    --open-btn-font-size: 13px;
    --open-btn-padding-y: 6px;
    --open-btn-padding-x: 14px;
  }
}
```

### Accessibilité

#### Réduction des Motions
```css
@media (prefers-reduced-motion: reduce) {
  .open-btn {
    transition: none !important;
    animation: none !important;
  }
  
  .open-btn:hover {
    transform: none !important;
  }
}
```

#### Impression
```css
@media print {
  .open-btn {
    background: transparent !important;
    color: var(--text-primary) !important;
    border: 1px solid var(--border) !important;
    box-shadow: none !important;
  }
}
```

### Pages Actuellement Utilisatrices

1. **Module Story** (`/src/modules/story/`)
   - Boutons "En savoir plus", "Voir profil"
   - Import : `import '../../styles/openButton.css'`

2. **Pages avec CTA** 
   - Boutons d'action secondaires
   - Import : `import '../../styles/openButton.css'`

### Bonnes Pratiques

#### 1. Utiliser les classes standards
```tsx
/* Correct */
<button className="open-btn open-btn--arrow">
  En savoir plus
</button>

/* Éviter les styles inline */
<button style={{color: 'blue'}}>
  En savoir plus
</button>
```

#### 2. Maintenir la cohérence
```css
/* Utiliser les variables pour les personnalisations */
.custom-open-btn {
  --open-btn-color: var(--accent-blue);  /* OK */
  color: blue;                           /* Non recommandé */
}
```

#### 3. Accessibilité
```tsx
// Ajouter les attributs ARIA
<button 
  className="open-btn"
  aria-label="En savoir plus sur notre communauté"
  aria-expanded={isExpanded}
>
  En savoir plus
</button>
```

### Extensibilité

#### Ajouter une nouvelle variante
```css
/* Dans openButton.css */
.open-btn--custom {
  --open-btn-color: var(--accent-blue);
  --open-btn-bg: rgba(79, 110, 247, 0.1);
  --open-btn-border: 1px solid var(--accent-blue);
}
```

#### Créer des thèmes de boutons
```css
.open-theme-dark {
  --open-btn-bg: rgba(0, 0, 0, 0.2);
  --open-btn-color: rgba(255, 255, 255, 0.8);
}
```

---

## Conclusion

L'utilisation cohérente de ces variables CSS garantit :

- **Thématisation automatique** sur toutes les pages
- **Transitions ultra-smooth** entre les thèmes
- **Maintenance facilitée** avec des points de contrôle centralisés
- **Performance optimale** avec CSS variables natives
- **Accessibilité** respectée avec des contrastes appropriés

Tous les nouveaux composants doivent utiliser ces variables pour bénéficier du système de thème complet.

---

**Version** : 1.3  
**Date** : 22 Avril 2026  
**Auteur** : Cascade AI Assistant  
**Mise à jour** : Ajout du système Open Buttons
