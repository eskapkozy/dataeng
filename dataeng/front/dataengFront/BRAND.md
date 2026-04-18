# Data Eng - Brand Guidelines

## 🎯 Identité de Marque

### Nom de la Marque
**Data eng** - Communauté professionnelle pour les passionnés de data science, data engineering et développement logiciel.

### Vision
Créer un espace collaboratif où les professionnels de la data peuvent partager leurs connaissances, découvrir des opportunités et développer leurs compétences dans un environnement moderne et inclusif.

---

## 🎨 Palette de Couleurs

### Couleurs Principales
| Couleur | Hex | Usage |
|---------|-----|-------|
| **Noir profond** | `#1A1A1A` | Textes principaux, titres, éléments de contraste |
| **Bleu vif** | `#4267FF` | Actions principales, liens, icônes interactives, boutons CTA |
| **Violet** | `#8A2BE2` | Accentuation secondaire, éléments distinctifs |
| **Blanc cassé** | `#F8F8F8` | Fond principal pour propreté et modernité |

### Dérivés et Utilitaires
- **Noir clair** : `rgba(26, 26, 26, 0.7)` - Textes secondaires
- **Bleu clair** : `rgba(66, 103, 255, 0.1)` - Survol et focus
- **Violet clair** : `rgba(138, 43, 226, 0.1)` - Accents subtils

### Dégradés
- **Primaire** : `linear-gradient(135deg, #4267FF 0%, #1d4ed8 100%)`
- **Hero** : `linear-gradient(90deg, #4267FF 0%, #8A2BE2 100%)`

---

## 🎭 Design System

### Typographie
- **Police principale** : Sans-serif moderne (Montserrat, Lato, Open Sans)
- **Hiérarchie** :
  - H1: 3rem, 700 weight, noir
  - H2: 2.5rem, 700 weight, noir
  - H3: 1.5rem, 600 weight, noir
  - Body: 1rem, 400 weight, noir clair

### Espacements
- **XS** : 0.5rem (8px)
- **SM** : 1rem (16px)
- **MD** : 1.5rem (24px)
- **LG** : 2rem (32px)
- **XL** : 3rem (48px)

### Rayons
- **Petit** : 8px - Boutons, inputs
- **Moyen** : 12px - Cartes
- **Grand** : 16px - Sections importantes
- **Plein** : 50% - Cercles, avatars

---

## ✨ Composants Visuels

### Boutons
- **Primaire** : Dégradé bleu, texte blanc, ombre bleue
- **Secondaire** : Fond blanc, bordure grise, texte noir
- **Hover** : Élévation de 2px, ombre accentuée

### Cartes
- **Fond** : Blanc pur
- **Bordure** : Gris très léger (1px)
- **Ombre** : Douce et subtile
- **Hover** : Élévation, bandeau coloré en haut

### Formulaires
- **Champs** : Fond blanc, bordure grise
- **Focus** : Bordure bleue, ombre bleue légère
- **Labels** : Noir, poids 600

---

## 🎯 Applications Pratiques

### Navigation
- Fond semi-transparent avec effet glassmorphism
- Liens en bleu vif
- Hover avec transition fluide

### Hero Sections
- Fond noir avec bandeau dégradé bleu/violet
- Titre "Data eng" avec couleurs du logo
- Texte blanc avec 85% d'opacité

### Footer
- Fond noir profond
- Bandeau bleu en haut
- Branding "Data eng" avec "eng" en bleu
- Liens en gris clair, hover en bleu

---

## 🚀 Règles d'Usage

### Do's
- ✅ Utiliser le bleu vif pour les actions principales
- ✅ Maintenir beaucoup d'espace blanc cassé
- ✅ Appliquer les dégradés avec parcimonie
- ✅ Utiliser des icônes minimalistes et linéaires
- ✅ Maintenir la cohérence des transitions

### Don'ts
- ❌ Surcharger l'interface avec trop de couleurs
- ❌ Utiliser le violet comme couleur principale
- ❌ Ignorer la hiérarchie typographique
- ❌ Ajouter des ombres trop prononcées
- ❌ Modifier les couleurs du logo

---

## 📱 Accessibilité

### Contrastes
- **Texte sur fond** : Minimum 4.5:1
- **Texte grand sur fond** : Minimum 3:1
- **Éléments interactifs** : Minimum 3:1

### Navigation
- Focus visible avec bordure bleue
- Liens cliquables de 44px minimum
- Transitions fluides mais rapides (0.3s max)

---

## 🔧 Implémentation Technique

### Variables CSS
Toutes les couleurs sont définies dans `/src/styles/variables.css` pour garantir la cohérence et faciliter la maintenance.

### Structure des Fichiers
```
src/
├── styles/
│   └── variables.css     # Variables globales du brand
├── components/
│   └── Layout.css       # Styles du layout principal
└── modules/
    ├── common.css        # Styles partagés
    ├── home/            # Page d'accueil
    ├── auth/            # Authentification
    └── get-started/     # Page de démarrage
```

---

## 🎉 Conclusion

Le brand Data eng repose sur la simplicité, la modernité et la professionnalisme. L'utilisation cohérente de cette charte graphique garantit une expérience utilisateur unifiée et mémorable qui reflète la qualité et l'innovation de la communauté data.

**Mot-clé du brand** : *Modernité Professionnelle*
