# Documentation CRUD - Blog Platform

## Step 1: Entités (Entities)

### User
**Champs principaux :**
- `id` (Long) - Identifiant unique
- `username` (String) - Nom d'utilisateur unique
- `email` (String) - Email unique
- `password` (String) - Mot de passe
- `role` (Enum) - USER, AUTHOR, ADMIN
- `createdAt` / `updatedAt` - Timestamps

**Relations :**
- `OneToMany` vers Article (articles écrits)
- `OneToOne` vers Profile (profil utilisateur)

### Article
**Champs principaux :**
- `id` (Long) - Identifiant unique
- `title` (String) - Titre de l'article
- `content` (Text) - Contenu de l'article
- `excerpt` (String) - Résumé/extrait
- `status` (Enum) - DRAFT, PUBLISHED
- `createdAt` / `updatedAt` - Timestamps

**Relations :**
- `ManyToOne` vers User (auteur)
- `ManyToMany` vers Tag (étiquettes)
- `OneToOne` vers FeaturedArticle (mise en avant)

### Tag
**Champs principaux :**
- `id` (Long) - Identifiant unique
- `name` (String) - Nom unique du tag
- `description` (String) - Description du tag
- `createdAt` / `updatedAt` - Timestamps

**Relations :**
- `ManyToMany` vers Article (articles tagués)

### Profile
**Champs principaux :**
- `id` (Long) - Identifiant unique
- `bio` (String) - Biographie
- `linkedinUrl` (String) - Lien LinkedIn
- `twitterUrl` (String) - Lien Twitter
- `githubUrl` (String) - Lien GitHub
- `websiteUrl` (String) - Site web
- `profileImageUrl` (String) - Photo de profil
- `createdAt` / `updatedAt` - Timestamps

**Relations :**
- `OneToOne` vers User (utilisateur associé)

### FeaturedArticle
**Champs principaux :**
- `id` (Long) - Identifiant unique
- `featuredOrder` (Integer) - Ordre d'affichage
- `isActive` (Boolean) - Statut actif/inactif
- `createdAt` / `updatedAt` - Timestamps

**Relations :**
- `OneToOne` vers Article (article mis en avant)

---

## Step 2: Controllers (API REST)

### UserController - `/api/users`
**Endpoints CRUD :**
- `GET /api/users` - Lister tous les utilisateurs
- `GET /api/users/{id}` - Obtenir un utilisateur par ID
- `GET /api/users/username/{username}` - Rechercher par nom d'utilisateur
- `GET /api/users/email/{email}` - Rechercher par email
- `GET /api/users/role/{role}` - Filtrer par rôle (USER/AUTHOR/ADMIN)
- `POST /api/users` - Créer un utilisateur
- `PUT /api/users/{id}` - Mettre à jour un utilisateur
- `DELETE /api/users/{id}` - Supprimer un utilisateur
- `GET /api/users/exists/username/{username}` - Vérifier existence nom
- `GET /api/users/exists/email/{email}` - Vérifier existence email

**Validations :**
- Unicité username et email
- Conflit géré (HTTP 409)

### ArticleController - `/api/articles`
**Endpoints CRUD :**
- `GET /api/articles` - Lister tous les articles
- `GET /api/articles/{id}` - Obtenir un article par ID
- `GET /api/articles/author/{authorId}` - Articles par auteur
- `GET /api/articles/status/{status}` - Filtrer par statut (DRAFT/PUBLISHED)
- `GET /api/articles/published` - Articles publiés triés par date
- `GET /api/articles/search?title=xxx` - Rechercher par titre
- `GET /api/articles/tag/{tagName}` - Articles par tag
- `POST /api/articles` - Créer un article
- `PUT /api/articles/{id}` - Mettre à jour un article
- `DELETE /api/articles/{id}` - Supprimer un article
- `GET /api/articles/author/{authorId}/status/{status}` - Articles auteur/statut
- `GET /api/articles/count/author/{authorId}/status/{status}` - Compteur articles

**Validations :**
- Vérification existence auteur
- Gestion des relations ManyToMany (tags)

### TagController - `/api/tags`
**Endpoints CRUD :**
- `GET /api/tags` - Lister tous les tags
- `GET /api/tags/{id}` - Obtenir un tag par ID
- `GET /api/tags/name/{name}` - Rechercher par nom
- `GET /api/tags/search?name=xxx` - Recherche par nom
- `GET /api/tags/most-used` - Tags les plus utilisés
- `GET /api/tags/min-articles/{count}` - Tags avec minimum d'articles
- `GET /api/tags/{tagId}/article-count` - Nombre d'articles par tag
- `POST /api/tags` - Créer un tag
- `PUT /api/tags/{id}` - Mettre à jour un tag
- `DELETE /api/tags/{id}` - Supprimer un tag
- `GET /api/tags/exists/name/{name}` - Vérifier existence nom

**Validations :**
- Unicité nom du tag
- Gestion relation ManyToMany

### ProfileController - `/api/profiles`
**Endpoints CRUD :**
- `GET /api/profiles` - Lister tous les profils
- `GET /api/profiles/{id}` - Obtenir un profil par ID
- `GET /api/profiles/user/{userId}` - Profil par utilisateur
- `GET /api/profiles/with-bio` - Profils avec biographie
- `GET /api/profiles/with-social-links` - Profils avec liens sociaux
- `GET /api/profiles/role/{role}` - Profils par rôle utilisateur
- `POST /api/profiles` - Créer un profil
- `PUT /api/profiles/{id}` - Mettre à jour un profil
- `DELETE /api/profiles/{id}` - Supprimer un profil
- `GET /api/profiles/exists/user/{userId}` - Vérifier profil utilisateur
- `POST /api/profiles/user/{userId}` - Créer profil pour utilisateur

**Validations :**
- Un profil maximum par utilisateur
- Gestion relation OneToOne

### FeaturedArticleController - `/api/featured-articles`
**Endpoints CRUD :**
- `GET /api/featured-articles` - Lister tous les articles en avant
- `GET /api/featured-articles/{id}` - Obtenir par ID
- `GET /api/featured-articles/article/{articleId}` - Par article
- `GET /api/featured-articles/active` - Articles actifs
- `GET /api/featured-articles/active/ordered` - Articles actifs ordonnés
- `GET /api/featured-articles/order/{order}` - Par ordre
- `GET /api/featured-articles/max-order` - Ordre maximum
- `POST /api/featured-articles` - Créer article en avant
- `PUT /api/featured-articles/{id}` - Mettre à jour
- `DELETE /api/featured-articles/{id}` - Supprimer
- `GET /api/featured-articles/exists/article/{articleId}` - Vérifier article
- `POST /api/featured-articles/article/{articleId}` - Ajouter article

**Validations :**
- Un article maximum en avant
- Gestion ordre et statut actif

---

## Step 3: Services (À implémenter)

**Note :** Les services seront implémentés dans une étape ultérieure pour :
- Logique métier
- Validation complexe
- Transaction management
- Mapping DTO/Entity
- Gestion des erreurs

---

## Architecture Actuelle

**Pattern :** Controller → Repository → Database
**Validation :** Au niveau controller (basique)
**Réponses :** ResponseEntity avec codes HTTP appropriés
**Format :** JSON pour toutes les API

**Prochaine étape :** Implémentation des services et DTOs
