# Référence des Variables CSS - Système de Thème

## Vue d'ensemble

Ce document référence toutes les variables CSS utilisées dans le système de thème light/dark mode de Data Eng Front.

---

## Variables de Thème Principales

### Fond et Surface
| Variable | Mode Light | Mode Dark | Usage |
|----------|------------|-----------|-------|
| `--bg-page` | `#F5F4F0` | `#0a0a0a` | Fond principal des pages |
| `--bg-surface` | `#FDFCF9` | `#0e0e0e` | Fond des surfaces, cartes |
| `--card-bg` | `#ffffff` | `#0e0e0e` | Fond spécifique des cartes |

### Texte
| Variable | Mode Light | Mode Dark | Usage |
|----------|------------|-----------|-------|
| `--text-primary` | `#1a1a1a` | `#ffffff` | Textes principaux, titres |
| `--text-secondary` | `#888888` | `#444444` | Textes secondaires, descriptions |
| `--text-h` | `var(--text-primary)` | `var(--text-primary)` | Héritage pour titres |

### Bordures
| Variable | Mode Light | Mode Dark | Usage |
|----------|------------|-----------|-------|
| `--border` | `#E8E6E0` | `#151515` | Bordures principales |
| `--code-bg` | `var(--bg-surface)` | `#1f2028` | Fond des éléments code |

### Accents
| Variable | Mode Light | Mode Dark | Usage |
|----------|------------|-----------|-------|
| `--accent-blue` | `#4F6EF7` | `#4F6EF7` | Actions principales, liens |
| `--accent-purple` | `#7B5CF5` | `#c084fc` | Accents secondaires |
| `--active-green` | `#3ecf8e` | `#3ecf8e` | États actifs, succès |

### Navigation
| Variable | Mode Light | Mode Dark | Usage |
|----------|------------|-----------|-------|
| `--nav-link-color` | `#FDFCF9` | `#ffffff` | Couleur des liens de navigation |

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

### Navigation
- `--nav-link-color` : Liens de navigation
- `--bg-surface` : Fond de la navbar

### Contenu
- `--bg-page` : Fond principal
- `--card-bg` : Fond des cartes
- `--text-primary` : Textes principaux
- `--text-secondary` : Textes secondaires

### Interactions
- `--accent-blue` : Actions principales
- `--accent-purple` : Actions secondaires
- `--active-green` : États actifs

### Structure
- `--border` : Bordures
- `--shadow` : Ombres
- `--code-bg` : Fond code

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

## Conclusion

L'utilisation cohérente de ces variables CSS garantit :

- **Thématisation automatique** sur toutes les pages
- **Transitions ultra-smooth** entre les thèmes
- **Maintenance facilitée** avec des points de contrôle centralisés
- **Performance optimale** avec CSS variables natives
- **Accessibilité** respectée avec des contrastes appropriés

Tous les nouveaux composants doivent utiliser ces variables pour bénéficier du système de thème complet.

---

**Version** : 1.0  
**Date** : 19 Avril 2026  
**Auteur** : Cascade AI Assistant
