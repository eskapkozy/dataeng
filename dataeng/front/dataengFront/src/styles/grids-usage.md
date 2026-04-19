# Guide d'utilisation du système de grille DataEng

## Importation

Pour utiliser le système de grille dans vos pages, importez les fichiers CSS nécessaires :

```css
/* Dans votre fichier de styles de page */
@import '../styles/grids.css';
@import '../styles/grids-examples.css'; /* Optionnel : exemples pré-configurés */
```

## Patterns de grille disponibles

### 1. Grille mosaïque (`.grid-mosaic`)
**Usage** : Articles wall, galeries d'images
```html
<div class="grid-mosaic">
  <article class="grid-card grid-card-hero">
    <!-- Carte principale (span 2 lignes) -->
  </article>
  <article class="grid-card grid-card-compact">
    <!-- Carte secondaire -->
  </article>
  <!-- ... autres cartes -->
</div>
```

### 2. Grille 3 colonnes (`.grid-3col`)
**Usage** : Témoignages, cartes de membres, valeurs
```html
<div class="grid-3col">
  <div class="grid-card">
    <!-- Contenu -->
  </div>
  <div class="grid-card">
    <!-- Contenu -->
  </div>
  <div class="grid-card">
    <!-- Contenu -->
  </div>
</div>
```

### 3. Grille 4 colonnes (`.grid-4col`)
**Usage** : Étapes, processus, fonctionnalités
```html
<div class="grid-4col">
  <div class="grid-card">
    <!-- Étape 1 -->
  </div>
  <!-- ... -->
</div>
```

### 4. Grille 2 colonnes (`.grid-2col`)
**Usage** : Contenu avec images, événements
```html
<div class="grid-2col">
  <div class="grid-card">
    <!-- Colonne gauche -->
  </div>
  <div class="grid-card">
    <!-- Colonne droite -->
  </div>
</div>
```

### 5. Grille flexible (`.grid-flex`)
**Usage** : Sous-titres, listes horizontales
```html
<div class="grid-flex">
  <div>Élément 1</div>
  <div>Élément 2</div>
  <div>Élément 3</div>
  <div>Élément 4</div>
</div>
```

## Classes de cartes

### Carte de base (`.grid-card`)
```html
<div class="grid-card">
  <h3>Titre</h3>
  <p>Description</p>
</div>
```

### Carte hero (`.grid-card-hero`)
```html
<div class="grid-card grid-card-hero">
  <!-- Contenu plus détaillé -->
</div>
```

### Carte compacte (`.grid-card-compact`)
```html
<div class="grid-card grid-card-compact">
  <!-- Contenu condensé -->
</div>
```

### Carte avec overlay (`.grid-card-overlay`)
```html
<div class="grid-card grid-card-overlay">
  <!-- Effet de glow au hover -->
</div>
```

## Composants de grille

### Header de section
```html
<div class="grid-header">
  <div class="grid-header-left">
    <div class="grid-header-icon">
      <svg>...</svg>
    </div>
    <h2 class="grid-header-title">Titre de section</h2>
  </div>
  <div class="grid-header-right">
    <a href="#" class="view-all-link">Voir tout</a>
  </div>
</div>
```

### Barre de filtres
```html
<div class="grid-filters">
  <button class="grid-filter-btn active">Tous</button>
  <button class="grid-filter-btn">Catégorie 1</button>
  <button class="grid-filter-btn">Catégorie 2</button>
</div>
```

### Background grid
```html
<section class="grid-section">
  <div class="grid-bg"></div>
  <!-- Contenu -->
</section>
```

## Effets spéciaux

### Glow effects par catégorie
```html
<div class="grid-card grid-category-data">
  <div class="grid-glow grid-glow-blue"></div>
  <!-- Contenu -->
</div>
```

Catégories disponibles :
- `.grid-category-data` (bleu)
- `.grid-category-ml` (violet)
- `.grid-category-viz` (cyan)
- `.grid-category-python` (orange)
- `.grid-category-congo` (vert)

### Animations
```html
<div class="grid-card grid-card-animate">
  <!-- Animation d'apparition progressive -->
</div>
```

## Exemples d'implémentation par page

### Page Story
```html
<section class="values-section">
  <div class="story-values-grid">
    <div class="story-value-card">
      <h3>Partage</h3>
      <p>Le savoir se multiplie quand il est partagé</p>
    </div>
    <!-- ... autres valeurs -->
  </div>
</section>
```

### Page Members
```html
<section class="members-section">
  <div class="members-grid">
    <div class="member-card">
      <div class="member-avatar">JD</div>
      <h3 class="member-name">John Doe</h3>
      <p class="member-role">Data Scientist</p>
      <p class="member-bio">Passionné par l'IA...</p>
    </div>
    <!-- ... autres membres -->
  </div>
</section>
```

### Page Events
```html
<section class="events-section">
  <div class="events-grid">
    <div class="event-card">
      <div class="event-date">
        <div class="event-date-day">15</div>
        <div class="event-date-month">MAR</div>
      </div>
      <div class="event-content">
        <h3 class="event-title">Data Meetup</h3>
        <p class="event-description">Rencontre sur le machine learning...</p>
        <div class="event-meta">
          <span>18:00 - 20:00</span>
          <span>Brazzaville</span>
        </div>
      </div>
    </div>
    <!-- ... autres événements -->
  </div>
</section>
```

## Responsive design

Le système est automatiquement responsive :

- **Desktop** (>1200px) : Grilles complètes
- **Tablet** (768px-1200px) : Adaptations modérées
- **Mobile** (<768px) : 1 colonne, espacements réduits

## Variables CSS personnalisables

```css
:root {
  /* Modifier les gaps */
  --grid-gap-xs: 2px;
  --grid-gap-lg: 24px;
  
  /* Modifier les rayons */
  --grid-radius-md: 12px;
  
  /* Modifier les transitions */
  --grid-transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Bonnes pratiques

1. **Utiliser les classes sémantiques** : `.story-values-grid` au lieu de `.grid-3col`
2. **Combiner les classes** : `.grid-card.grid-card-hero.grid-category-data`
3. **Respecter la hiérarchie** : Header -> Filtres -> Grille -> CTA
4. **Utiliser les variables** : `var(--spacing-xl)` au lieu de valeurs hardcodées
5. **Tester le responsive** : Vérifier l'affichage sur mobile/tablet/desktop

## Migration depuis les styles existants

Pour migrer une page existante :

1. **Identifier le pattern de grille** utilisé
2. **Remplacer les CSS spécifiques** par les classes du système
3. **Adapter les noms de classes** si nécessaire
4. **Importer les fichiers de grille**
5. **Tester le rendu** et ajuster si besoin
