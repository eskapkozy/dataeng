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

## Conclusion

L'utilisation cohérente de ces variables CSS garantit :

- **Thématisation automatique** sur toutes les pages
- **Transitions ultra-smooth** entre les thèmes
- **Maintenance facilitée** avec des points de contrôle centralisés
- **Performance optimale** avec CSS variables natives
- **Accessibilité** respectée avec des contrastes appropriés

Tous les nouveaux composants doivent utiliser ces variables pour bénéficier du système de thème complet.

---

**Version** : 1.2  
**Date** : 20 Avril 2026  
**Auteur** : Cascade AI Assistant  
**Mise à jour** : Ajout du pattern Structure + Variables
