# Documentation Technique : Système de Toggle Light/Dark Mode

## 🎯 Objectif

Implémenter un système de thème light/dark mode complet et généralisé pour toute l'application DataEng Front.

## 🏗️ Architecture

### 1. Hook React `useTheme`

**Fichier :** `src/hooks/useTheme.ts`

```typescript
export const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    
    const initialTheme = savedTheme || systemTheme
    setTheme(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme)
  }, [])
  
  return { theme, toggleTheme }
}
```

**Fonctionnalités :**
- Gestion de l'état local (`light`/`dark`)
- Persistance dans `localStorage`
- Détection automatique de la préférence système
- Modification de l'attribut `data-theme` sur `<html>`

### 2. Variables CSS Globales

**Fichier :** `src/index.css`

```css
:root {
  /* Mode light par défaut */
  --bg-surface: #FDFCF9;
  --bg-page: #F5F4F0;
  --border: #E8E6E0;
  --text-primary: #1a1a1a;
  --text-secondary: #888888;
  --accent-blue: #4F6EF7;
  --accent-purple: #7B5CF5;
  --active-green: #3ecf8e;
  --card-bg: #ffffff;
}

[data-theme="dark"] {
  /* Mode dark */
  --bg-surface: #0e0e0e;
  --bg-page: #0a0a0a;
  --border: #151515;
  --text-primary: #ffffff;
  --text-secondary: #444444;
  --accent-blue: #4F6EF7;
  --accent-purple: #7B5CF5;
  --active-green: #3ecf8e;
  --card-bg: #0e0e0e;
}
```

### 3. Composant Navigation

**Fichier :** `src/components/Navigation.tsx`

```typescript
const Navigation = () => {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <nav>
      <div className="nav-actions">
        <button 
          className="theme-toggle" 
          onClick={toggleTheme} 
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <SunIcon /> : <MoonIcon />}
        </button>
        <Link to="/get-started" className="sign-up-btn">Commencer</Link>
      </div>
    </nav>
  )
}
```

## 🌍 Généralisation à Toutes les Pages

### Pourquoi ça fonctionne partout ?

1. **Navigation Globale** : Le bouton est dans `Layout.tsx` qui enveloppe toutes les routes
2. **Variables CSS** : Définies globalement dans `index.css`
3. **Attribut `data-theme`** : Appliqué sur `document.documentElement` (portée maximale)

### Architecture React Router

```typescript
// App.tsx
function App() {
  return (
    <Router>
      <Layout>           // ← Navigation avec toggle
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story" element={<Story />} />
          <Route path="/members" element={<Members />} />
          <Route path="/write" element={<Write />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/get-started" element={<GetStarted />} />
        </Routes>
      </Layout>
    </Router>
  )
}
```

## 🎨 Utilisation des Variables CSS

### Remplacement des couleurs hardcodées

**Avant :**
```css
.home-page {
  background: #0a0a0a;
  color: #FFFFFF;
  border: 1px solid #1e1e1e;
}
```

**Après :**
```css
.home-page {
  background: var(--bg-page);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

### Mapping des couleurs principales

| Usage | Variable | Light | Dark |
|--------|----------|--------|------|
| Fond page | `--bg-page` | `#F5F4F0` | `#0a0a0a` |
| Fond card | `--card-bg` | `#ffffff` | `#0e0e0e` |
| Fond surface | `--bg-surface` | `#FDFCF9` | `#0e0e0e` |
| Texte principal | `--text-primary` | `#1a1a1a` | `#ffffff` |
| Texte secondaire | `--text-secondary` | `#888888` | `#444444` |
| Bordures | `--border` | `#E8E6E0` | `#151515` |
| Accent bleu | `--accent-blue` | `#4F6EF7` | `#4F6EF7` |
| Accent violet | `--accent-purple` | `#7B5CF5` | `#7B5CF5` |
| Vert actif | `--active-green` | `#3ecf8e` | `#3ecf8e` |

## 🔄 Flux de Fonctionnement

1. **Initialisation** : 
   - Hook détecte la préférence sauvegardée ou système
   - Applique le thème initial via `data-theme`

2. **Interaction utilisateur** :
   - Clic sur le bouton toggle
   - Hook bascule l'état (`light` ↔ `dark`)
   - Sauvegarde dans `localStorage`
   - Met à jour `data-theme` sur `<html>`

3. **Rendu CSS** :
   - Navigateur applique les variables CSS selon `[data-theme]`
   - Tous les éléments utilisant les variables se mettent à jour

## 🛠️ Implémentation Technique

### 1. Hook React
- `useState` pour l'état local
- `useEffect` pour l'initialisation
- `localStorage` pour la persistance
- `document.documentElement` pour la portée globale

### 2. CSS Variables
- `:root` pour le mode light (par défaut)
- `[data-theme="dark"]` pour le mode dark
- `var(--variable-name)` pour l'utilisation

### 3. Accessibilité
- `aria-label` sur le bouton
- Icônes explicites (soleil/lune)
- Respect de la préférence système

## 📁 Fichiers Modifiés

### Ajoutés
- `src/hooks/useTheme.ts` - Hook de gestion du thème

### Modifiés
- `src/index.css` - Variables CSS globales
- `src/components/Navigation.tsx` - Bouton toggle
- `src/components/Navigation.css` - Styles du bouton
- `src/modules/home/styles.css` - Variables CSS pour la page home

## 🚀 Avantages

1. **Performance** : CSS variables natives, pas de re-rendu React
2. **Accessibilité** : Respect des préférences système
3. **Persistance** : Sauvegarde utilisateur
4. **Extensibilité** : Facile à ajouter d'autres thèmes
5. **Maintenance** : Centralisé et cohérent

## 🔧 Maintenance Future

### Ajouter un nouveau thème
```css
[data-theme="blue"] {
  --bg-page: #f0f4ff;
  --text-primary: #1a1a1a;
  /* ... */
}
```

### Nouvelles variables
```css
:root {
  --new-variable: value;
  --new-variable-dark: value;
}
```

### Extension à d'autres composants
```css
.mon-composant {
  background: var(--bg-page);
  color: var(--text-primary);
  border: 1px solid var(--border);
}
```

---

**Version :** 1.0  
**Date :** 19 Avril 2026  
**Auteur :** Cascade AI Assistant
