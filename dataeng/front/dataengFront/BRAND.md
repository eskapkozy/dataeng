# Data Eng - Brand Guidelines & Design System

##  Identité de Marque

### Nom de la Marque
**Data Eng** - Communauté professionnelle pour les passionnés de data science, data engineering et développement logiciel au Congo Brazzaville.

### Vision
Créer un espace collaboratif où les professionnels de la data peuvent partager leurs connaissances, découvrir des opportunités et développer leurs compétences dans un environnement moderne et inclusif.

---

##  Palette de Couleurs

### Système de Thème Light/Dark Mode

Le système utilise des variables CSS dynamiques qui s'adaptent automatiquement au thème sélectionné.

#### Variables CSS Globales
```css
:root {
  /* Mode Light */
  --bg-surface: #FDFCF9;
  --bg-page: #F5F4F0;
  --border: #E8E6E0;
  --text-primary: #1a1a1a;
  --text-secondary: #888888;
  --card-bg: #ffffff;
  --accent-blue: #4F6EF7;
  --accent-purple: #7B5CF5;
  --active-green: #3ecf8e;
  --warning-orange: #F5A623;
  --accent-cyan: #22d3ee;
}

[data-theme="dark"] {
  /* Mode Dark */
  --bg-surface: #2a2a2a;
  --bg-page: #1f1f1f;
  --border: #404040;
  --text-primary: #f5f5f0;
  --text-secondary: #a0a090;
  --card-bg: #2a2a2a;
  --accent-blue: #4F6EF7;
  --accent-purple: #c084fc;
  --active-green: #3ecf8e;
  --warning-orange: #F5A623;
  --accent-cyan: #22d3ee;
}
```

#### Couleurs Principales (Thème-agnostiques)
| Variable | Light | Dark | Usage |
|----------|-------|------|-------|
| `--bg-surface` | `#FDFCF9` | `#2a2a2a` | Fond surfaces, cartes, formulaires |
| `--bg-page` | `#F5F4F0` | `#1f1f1f` | Fond principal des pages, sections complètes |
| `--border` | `#E8E6E0` | `#404040` | Bordures principales, séparateurs, contours |
| `--text-primary` | `#1a1a1a` | `#f5f5f0` | Titres principaux, textes importants, labels primaires |
| `--text-secondary` | `#888888` | `#a0a090` | Descriptions, sous-titres, textes secondaires, métadonnées |
| `--card-bg` | `#ffffff` | `#2a2a2a` | Fond spécifique des cartes, conteneurs |
| `--accent-blue` | `#4F6EF7` | `#4F6EF7` | Actions principales, liens, boutons primaires, éléments interactifs |
| `--accent-purple` | `#7B5CF5` | `#c084fc` | Accents secondaires, badges, éléments décoratifs |
| `--active-green` | `#3ecf8e` | `#3ecf8e` | États actifs, succès, indicateurs positifs |
| `--warning-orange` | `#F5A623` | `#F5A623` | Avertissements, alertes, indicateurs d'attention |
| `--accent-cyan` | `#22d3ee` | `#22d3ee` | Éléments spéciaux, accents visuels |

### Couleurs Spécifiques au Thème
| Thème | Couleur | Hex | Usage |
|-------|---------|-----|-------|
| **Light** | Noir profond | `#1a1a1a` | Éléments de contraste max, textes primaires |
| **Light** | Gris moyen | `#888888` | Textes secondaires |
| **Dark** | Gris clair | `#f5f5f0` | Textes principaux en mode dark |
| **Dark** | Gris moyen | `#a0a090` | Textes secondaires en mode dark |

### Couleurs de Catégories (Thème-agnostiques)
| Catégorie | Hex | RGBA Background | Variable CSS | Usage |
|----------|-----|----------------|-------------|-------|
| **Data Engineering/Big Data** | `#4F6EF7` | `rgba(79,110,247,0.1)` | `--accent-blue` | Tags, badges, avatars |
| **Machine Learning** | `#9B5CFA` | `rgba(155,92,250,0.1)` | `--accent-purple` | Tags, badges, avatars |
| **Data Visualisation** | `#22d3ee` | `rgba(34,211,238,0.1)` | `--accent-cyan` | Tags, badges, avatars |
| **Python** | `#F5A623` | `rgba(245,166,35,0.1)` | `--warning-orange` | Tags, badges, avatars |
| **Congo Use Case** | `#3ecf8e` | `rgba(62,207,142,0.1)` | `--active-green` | Tags, badges, avatars |

### Dégradés
- **Hero gradient** : `linear-gradient(90deg, var(--accent-blue) 0%, var(--text-primary) 100%)`
- **Card gradient** : `linear-gradient(135deg, rgba(79,110,247,0.07) 0%, transparent 70%)`
- **Surface gradient** : `linear-gradient(90deg, var(--accent-blue) 0%, var(--accent-purple) 100%)`

---

##  Typographie

### Polices Importées
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..144,100..1000&family=Martian+Mono:wght@100..900&display=swap" rel="stylesheet">
```

### Système Typographique

#### Martian Mono (Police Technique)
- **Usage** : Titres, badges, tags, initiales avatars, éléments techniques
- **Poids disponibles** : 100-900
- **Styles** : Normal, Condensed

#### DM Sans (Police Lisible)
- **Usage** : Sous-titres, descriptions, noms, statistiques, boutons, corps de texte
- **Poids disponibles** : 100-1000
- **Optical Size** : 9-144

### Hiérarchie Typographique

#### Hero Section
- **Titre principal** : Martian Mono 800, `clamp(24px, 4vw, 48px)`, blanc
- **Sous-titre** : DM Sans 400, `clamp(16px, 2.5vw, 20px)`, `rgba(255,255,255,0.8)`

#### Articles Wall
- **Header titre** : Martian Mono 800, 18px, blanc
- **Header sous-titre** : DM Sans 13px, `#333333`
- **Filter buttons** : Martian Mono, 12px
- **Article titre (hero)** : Martian Mono 800, `clamp(18px,2.5vw,26px)`, blanc
- **Article titre (secondary)** : Martian Mono 700, 14px, blanc
- **Article description** : DM Sans 13px (hero) / 12px (secondary), `#2a2a2a`
- **Category tags** : Martian Mono 9px, couleur catégorie
- **Author names** : DM Sans 11px, `#555555`
- **Author initials** : Martian Mono 9px 700, couleur catégorie
- **Stats** : DM Sans 12px, `rgba(255,255,255,0.6)`
- **CTA titre** : DM Sans 13px 500, blanc
- **CTA sous-titre** : DM Sans 12px, `#333333`

#### How It Works
- **Section titre** : Martian Mono 800, 48px, blanc
- **Section sous-titre** : DM Sans 400, 18px, `rgba(255,255,255,0.7)`
- **Step titre** : Martian Mono 700, 18px, blanc
- **Step description** : DM Sans 400, 14px, `rgba(255,255,255,0.7)`

---

##  Design System

### Espacements
| Taille | Valeur | Usage |
|--------|--------|-------|
| **XS** | 6px | Gap entre filtres |
| **SM** | 8px | Espacements internes |
| **MD** | 16px | Padding éléments |
| **LG** | 24px | Margin sections |
| **XL** | 40px | Padding sections |
| **XXL** | 56px | Padding hero/articles |
| **XXXL** | 80px | Padding grandes sections |

### Rayons (Border-radius)
| Taille | Valeur | Usage |
|--------|--------|-------|
| **XS** | 4px | Filter buttons |
| **SM** | 7px | CTA button |
| **MD** | 8px | Petits éléments |
| **LG** | 12px | Cartes articles |
| **XL** | 24px | Sections importantes |
| **Plein** | 50% | Avatars, cercles |

### Grilles
- **Articles Grid** : `grid-template-columns: 1.9fr 1fr 1fr`, `grid-template-rows: auto auto`, gap: 2px
- **Hero card** : `grid-row: 1 / 3`, `border-radius: 12px 0 0 12px`
- **Steps Grid** : `grid-template-columns: repeat(4, 1fr)`, gap: 2px
- **Background Grid** : `background-size: 40px 40px` (articles wall)

---

##  Composants Visuels

### Hero Section
- **Background** : Noir (`#000000`) avec overlay gradient
- **Navbar** : Fond transparent, height: 70px, padding: 0 40px
- **Hero body** : Padding: 120px 40px 80px, max-width: 1200px
- **Stats** : 4 colonnes avec compteurs animés
- **Ticker** : Défilement horizontal, height: 60px

### Articles Wall
- **Background** : `#0a0a0a` avec grille subtile (`rgba(79,110,247,0.03)`)
- **Header** : Flex row, icône 28x28px, titre Martian Mono 800 18px
- **Filter Bar** : Flex wrap, gap 6px, buttons border-radius 100px
- **Hero Card** : Padding 28px, `#0e0e0e` background, `#151515` border
- **Secondary Cards** : Padding 22px, mêmes couleurs de fond/bordure
- **CTA Bar** : `#0e0e0e` background, `#151515` border, border-radius `0 0 12px 12px`

### How It Works
- **Background** : `#000000`, padding 60px 70px
- **Step Cards** : `#0e0e0e` background, `#151515` border, padding 32px 24px
- **Progress Bars** : Height 2px, scaleX animation
- **Badge Dots** : Pulse animation 2s infinite
- **Active States** : Couleur spécifique par étape

### Animations
- **Pulse** : `@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } }`
- **Spin** : `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`
- **Float** : `@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }`
- **Typewriter** : Animation texte progressive
- **Counter** : Animation numérique progressive

---

##  États Interactifs

### Hover Effects
- **Links** : Gap animation (5px to 9px), color transition
- **Buttons** : Background opacity change, transform scale
- **Cards** : Border color change (`#151515` to `#252525`), glow effect
- **Filter Buttons** : Active state `#4F6EF7` background, white text
- **Article Cards** : Category-specific glow on hover

### Transitions Ultra-Smooth

Le système utilise des transitions optimisées pour une expérience utilisateur exceptionnelle.

#### Variables de Transition
```css
:root {
  --theme-transition-duration: 0.5s;
  --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Types de Transitions
| Type | Durée | Easing | Usage |
|------|-------|--------|-------|
| **Thème** | 0.5s | `cubic-bezier(0.4, 0, 0.2, 1)` | Changement light/dark |
| **Standard** | 0.3s | `cubic-bezier(0.4, 0, 0.2, 1)` | Éléments courants |
| **Fast** | 0.2s | `cubic-bezier(0.4, 0, 0.2, 1)` | Buttons, links |
| **Slow** | 0.4s | `cubic-bezier(0.4, 0, 0.2, 1)` | Cards, interactions complexes |

#### Propriétés Animées
- `background-color`, `color`, `border-color`
- `text-decoration-color`, `fill`, `stroke`
- `opacity`, `box-shadow`, `transform`

#### Effet de Fondu Subtil
```css
html::before {
  content: '';
  position: fixed;
  opacity: 0.03;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
```

#### Transitions Spécifiques
- **Standard** : 0.3s ease (anciennement)
- **Fast** : 0.2s ease (buttons, links)
- **Slow** : 0.4s ease (cards, complex interactions)

---

##  Accessibilité

### Contrastes
- **Texte blanc sur fond noir** : 21:1 (excellent)
- **Texte `#333` sur fond `#0e0e0e`** : 8.6:1 (excellent)
- **Texte `#555` sur fond `#0e0e0e`** : 5.2:1 (excellent)
- **Boutons `#4F6EF7` sur fond noir** : 3.1:1 (acceptable)

### Navigation
- **Focus visible** : Border bleue `#4F6EF7`
- **Liens cliquables** : Minimum 44px height
- **Transitions** : Maximum 0.3s pour accessibilité

---

##  Implémentation Technique

### Structure des Fichiers
```
src/
modules/
  home/
    index.tsx          # Composant React principal
    styles.css         # Styles spécifiques home
  common.css          # Styles partagés
index.html           # Import des polices
```

### Variables CSS Utilisées
```css
:root {
  /* Variables de thème principales */
  --bg-page: #F5F4F0;
  --bg-surface: #FDFCF9;
  --card-bg: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #888888;
  --border: #E8E6E0;
  
  /* Variables d'accents */
  --accent-blue: #4F6EF7;
  --accent-purple: #7B5CF5;
  --active-green: #3ecf8e;
  --warning-orange: #F5A623;
  --accent-cyan: #22d3ee;
  
  /* Variables de transition */
  --theme-transition-duration: 0.5s;
  --theme-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Classes CSS Organisées
- **`.home-page`** : Namespace principal
- **`.hero-full`** : Section hero complète
- **`.articles-wall`** : Section articles
- **`.how-it-works`** : Section étapes
- **`.testimonials`** : Section témoignages

---

##  Règles d'Usage

### Do's
-  Utiliser Martian Mono pour les éléments techniques et titres
-  Utiliser DM Sans pour les textes descriptifs et lisibles
-  Maintenir le contraste élevé sur fond sombre
-  Appliquer les couleurs de catégorie de manière cohérente
-  Utiliser les animations avec parcimonie
-  Maintenir l'espacement de 40px pour la grille de fond

### Don'ts
-  Mélanger les polices dans des contextes inappropriés
-  Utiliser plus de 2 couleurs principales par section
-  Ignorer la hiérarchie typographique
-  Ajouter des ombres trop prononcées sur fond sombre
-  Modifier les couleurs de catégories établies

---

##  Responsive Design

### Breakpoints
- **Desktop** : > 1200px (layout complet)
- **Tablet** : 768px - 1200px (adaptations modérées)
- **Mobile** : < 768px (stacking, réductions)

### Adaptations Mobile
- **Hero** : Padding réduit, titre plus petit
- **Articles Grid** : 1 colonne sur mobile
- **Steps** : 2 colonnes sur tablette, 1 sur mobile
- **Filter Bar** : Wrap et scroll horizontal

---

##  Conclusion

Le brand Data Eng combine modernité technique et accessibilité africaine. L'utilisation cohérente de Martian Mono pour l'aspect technique et DM Sans pour la lisibilité crée une expérience professionnelle adaptée à la communauté data du Congo.

**Mot-clé du brand** : *Modernité Technique Africaine*
**Palette principale** : Noir profond + Bleu data + Gris structuré
**Typographie** : Martian Mono (technique) + DM Sans (accessible)
