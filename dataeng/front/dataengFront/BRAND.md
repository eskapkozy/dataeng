# Data Eng - Brand Guidelines & Design System

##  Identité de Marque

### Nom de la Marque
**Data Eng** - Communauté professionnelle pour les passionnés de data science, data engineering et développement logiciel au Congo Brazzaville.

### Vision
Créer un espace collaboratif où les professionnels de la data peuvent partager leurs connaissances, découvrir des opportunités et développer leurs compétences dans un environnement moderne et inclusif.

---

##  Palette de Couleurs

### Couleurs Principales
| Couleur | Hex | Usage |
|---------|-----|-------|
| **Noir profond** | `#000000` | Fond principal, textes principaux, éléments de contraste |
| **Bleu data** | `#4F6EF7` | Actions principales, liens, icônes interactives, boutons CTA |
| **Gris foncé** | `#0a0a0a` | Fond sections sombres, articles wall |
| **Gris moyen** | `#0e0e0e` | Fond cartes, éléments secondaires |
| **Gris clair** | `#151515` | Bordures, séparations |
| **Gris très clair** | `#1e1e1e` | Bordures légères, hover states |
| **Blanc** | `#FFFFFF` | Textes, icônes, éléments de contraste |
| **Gris texte** | `#333333` | Textes secondaires, descriptions |
| **Gris subtil** | `#2a2a2a` | Textes tertiaires, métadonnées |

### Couleurs de Catégories (Articles)
| Catégorie | Hex | RGBA Background | Usage |
|----------|-----|----------------|-------|
| **Data Engineering/Big Data** | `#4F6EF7` | `rgba(79,110,247,0.2)` | Tags, badges, avatars |
| **Machine Learning** | `#9B5CFA` | `rgba(155,92,250,0.2)` | Tags, badges, avatars |
| **Data Visualisation** | `#22d3ee` | `rgba(34,211,238,0.2)` | Tags, badges, avatars |
| **Python** | `#F5A623` | `rgba(245,166,35,0.2)` | Tags, badges, avatars |
| **Congo Use Case** | `#3ecf8e` | `rgba(62,207,142,0.2)` | Tags, badges, avatars |

### Couleurs Spéciales
| Couleur | Hex | Usage |
|---------|-----|-------|
| **Orange trending** | `#F5A623` | Badge "TRENDING", points d'animation |
| **Gris hover** | `#252525` | Hover states sur éléments sombres |
| **Gris border hover** | `#333333` | Hover states sur bordures |

### Dégradés
- **Hero gradient** : `linear-gradient(90deg, #4F6EF7 0%, #1a1a1a 100%)`
- **Card gradient** : `linear-gradient(135deg, rgba(79,110,247,0.07) 0%, transparent 70%)`

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

### Transitions
- **Standard** : 0.3s ease
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
  --color-dark-bg: #1A1A1A;
  --color-white: #FFFFFF;
  --color-blue: #4F6EF7;
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
