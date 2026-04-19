# Composant Navigation

## Description
Le composant `Navigation` est une barre de navigation dynamique qui s'adapte automatiquement aux couleurs de la première section de chaque page.

## Fonctionnalités

### 🎨 Adaptation automatique des couleurs
Le navbar change de couleur en fonction de la page actuelle :
- **Page Home (`/`)** : Noir (`#1A1A1A`) - correspond à la section hero noire
- **Page Story (`/story`)** : Vert (`#10b981`) - correspond à la section hero verte
- **Page Members (`/members`)** : Orange (`#f97316`) - correspond à la section hero orange
- **Page Write (`/write`)** : Violet (`#8b5cf6`) - correspond à la section hero violette
- **Page Login (`/login`)** : Gris (`#6b7280`) - couleur par défaut
- **Page Get-started (`/get-started`)** : Rose (`#ec4899`) - couleur par défaut

### 🔄 Détection des changements de route
Le composant utilise le hook `useNavbarColor` qui :
- Détecte automatiquement les changements de route
- Intercepte les événements `popstate`, `pushState`, et `replaceState`
- Met à jour les couleurs du navbar en temps réel

### 🎯 Structure du composant
```tsx
const Navigation = () => {
  const { container } = useNavbarColor()
  const isDarkBg = container !== '#ffffff'
  
  return (
    <nav className="navigation" style={{ backgroundColor: container }}>
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" style={{ color: isDarkBg ? '#ffffff' : '#2563eb' }}>
            Data Community
          </Link>
        </div>
        
        <div className="nav-links" data-dark-bg={isDarkBg}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/story" className="nav-link">Story</Link>
          <Link to="/members" className="nav-link">Les membres</Link>
          <Link to="/write" className="nav-link">Écrire</Link>
          <Link to="/login" className="nav-link">Se connecter</Link>
        </div>
        
        <div className="nav-actions">
          <Link to="/get-started" className="btn-primary">Commencer</Link>
        </div>
      </div>
    </nav>
  )
}
```

## 🎨 Styles CSS

### Navigation principale
- **Position** : `fixed` pour rester en haut de la page
- **Ombre** : `box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1)`
- **Transition** : `transition: background-color 0.3s ease`

### Conteneur des liens
- **Coins arrondis** : `border-radius: 100px`
- **Fond semi-transparent** : `rgba(255, 255, 255, 0.1)` pour les fonds clairs
- **Effet de flou** : `backdrop-filter: blur(10px)`

### États interactifs
- **Hover** : Fond plus opaque avec `filter: brightness(1.1)`
- **Actif** : Fond encore plus opaque avec `filter: brightness(0.8)`
- **Adaptation du texte** : Couleur blanche sur fonds sombres

## 🔧 Hook useNavbarColor

### Configuration des couleurs
```typescript
const pageColorMap: Record<string, PageColorConfig> = {
  '/': {
    container: '#1A1A1A', // noir
    linkBg: 'rgba(255, 255, 255, 0.1)'
  },
  '/story': {
    container: '#10b981', // vert
    linkBg: 'rgba(16, 185, 129, 0.1)'
  },
  // ... autres pages
}
```

### Détection automatique
Le hook utilise :
- `useState` pour stocker l'état des couleurs
- `useEffect` pour écouter les changements de route
- Interception des méthodes `history.pushState` et `history.replaceState`

## 📋 État actuel du système

### ✅ Fonctionnalités implémentées
1. **Détection automatique des pages** : Chaque page est correctement identifiée
2. **Adaptation des couleurs** : Le navbar prend la couleur de la première section
3. **Transitions fluides** : Changements de couleur avec animation de 0.3s
4. **Contraste automatique** : Texte adapté selon la couleur de fond
5. **Design moderne** : Coins arrondis et effets de flou

### 🎯 Comportement attendu
- Navigation entre les pages : Changement instantané de couleur
- Cohérence visuelle : Navbar harmonisé avec la première section
- Expérience utilisateur : Interface fluide et professionnelle

### 🔄 Maintenance
Pour ajouter une nouvelle page :
1. Définir la couleur de sa section hero dans son CSS
2. Ajouter l'entrée correspondante dans `pageColorMap`
3. Le navbar s'adaptera automatiquement

## 📁 Fichiers associés
- `src/components/Navigation.tsx` : Composant principal
- `src/components/Navigation.css` : Styles du composant
- `src/hooks/useNavbarColor.ts` : Hook de détection des couleurs

---

*Dernière mise à jour : 18/04/2026*
