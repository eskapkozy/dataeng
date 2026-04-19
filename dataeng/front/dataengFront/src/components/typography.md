# Documentation - Système de Typographie

## Hiérarchie Typographique

### Grands Titres (H1, H2)
- **Police**: SK Concretica
- **Rôle Visuel**: L'autorité. Elle assoit votre expertise et votre identité de marque dès le premier coup d'oeil.
- **Usage**: Titres principaux, sous-titres importants, headings de sections

### Corps de texte (Paragraphes)
- **Police**: Inter ou Geist
- **Rôle Visuel**: La clarté. Une police "Sans Serif" (sans empattements) ultra-lisible pour que la lecture des longs textes soit fluide.
- **Usage**: Paragraphes, descriptions, contenu textuel général

### Données / Code / Chiffres
- **Police**: JetBrains Mono
- **Rôle Visuel**: La précision. Une police "Monospaced" pour souligner l'aspect technique/ingénierie de votre communauté.
- **Usage**: Extraits de code, données techniques, chiffres, éléments de configuration

## Implémentation CSS

### Variables CSS
```css
:root {
  --font-headings: 'SK Concretica', sans-serif;
  --font-body: 'Inter', 'Geist', sans-serif;
  --font-code: 'JetBrains Mono', monospace;
}
```

### Classes Utilitaires
```css
.font-heading {
  font-family: var(--font-headings);
}

.font-body {
  font-family: var(--font-body);
}

.font-code {
  font-family: var(--font-code);
}
```

## Règles d'Application

### 1. Hiérarchie Structurelle
- **H1**: SK Concretica, font-weight: 800
- **H2**: SK Concretica, font-weight: 700
- **H3**: SK Concretica, font-weight: 600
- **Paragraphes**: Inter/Geist, font-weight: 400
- **Code**: JetBrains Mono, font-weight: 400

### 2. Tailles de Police Recommandées
- **H1**: 3.5rem (desktop), 2.5rem (mobile)
- **H2**: 2.5rem (desktop), 2rem (mobile)
- **H3**: 1.5rem (desktop), 1.25rem (mobile)
- **Body**: 1.125rem (desktop), 1rem (mobile)
- **Code**: 0.875rem (desktop), 0.8rem (mobile)

### 3. Espacement Vertical
- **H1**: margin-bottom: 1.5rem
- **H2**: margin-bottom: 1.25rem
- **H3**: margin-bottom: 1rem
- **Paragraphes**: margin-bottom: 1rem

## Bonnes Pratiques

### 1. Cohérence
- Utiliser toujours la même police pour le même type de contenu
- Respecter la hiérarchie visuelle établie

### 2. Accessibilité
- Assurer un contraste suffisant (minimum 4.5:1 pour le texte normal)
- Maintenir une taille de police lisible (minimum 16px pour le corps de texte)

### 3. Performance
- Charger les polices de manière optimisée
- Prévoir des polices de secours (fallbacks)

## Application dans le Projet

### Hero Section
- **Titre H1**: SK Concretica
- **Paragraphe**: Inter/Geist
- **Bouton**: Inter/Geist (font-weight: 600)

### Features Section
- **Titres H3**: SK Concretica
- **Descriptions**: Inter/Geist
- **Éléments techniques**: JetBrains Mono

### Code Blocks et Données
- **Extraits de code**: JetBrains Mono
- **Données techniques**: JetBrains Mono
- **Configuration**: JetBrains Mono

## Importation des Polices

### Google Fonts (si applicable)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Polices Locales
```css
@font-face {
  font-family: 'SK Concretica';
  src: url('/fonts/sk-concretica-trial.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Geist';
  src: url('/fonts/geist-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

## Maintenance

### Mises à Jour
- Documenter toute modification des règles de typographie
- Maintenir la cohérence sur toutes les pages
- Tester l'affichage sur différents navigateurs et appareils

### Audit
- Vérifier régulièrement l'application correcte des polices
- S'assurer que la hiérarchie visuelle est respectée
- Valider l'accessibilité et la performance
