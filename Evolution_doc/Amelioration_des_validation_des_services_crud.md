# Évolution des Services CRUD - Améliorations de Validation

## Contexte

Ce document présente les améliorations identifiées pour les services CRUD de l'application après écriture des tests unitaires complets. L'objectif est d'implémenter des validations plus robustes et des contraintes métier avancées.

## Tests Unitaires Créés

### Résumé des Tests (66 tests au total)

| Service | Nombre de Tests | Couverture |
|---------|----------------|------------|
| **UserServiceTest** | 18 tests | CRUD, recherche, validation |
| **ArticleServiceTest** | 17 tests | CRUD, recherche par auteur/statut, fonctions avancées |
| **ProfileServiceTest** | 15 tests | CRUD, profils utilisateur, validations |
| **FeaturedArticleServiceTest** | 16 tests | CRUD, gestion featured, ordre |

### Scénarios de Test Couverts

#### UserService
- **CRUD de base** : getAllUsers, getUserById, createUser, updateUser, deleteUser
- **Recherche spécialisée** : getUserByUsername, getUserByEmail, getUsersByRole, getUsersByRoles
- **Validation existentielle** : existsByUsername, existsByEmail
- **Tests d'erreur** : doublons username/email, ID invalide

#### ArticleService
- **CRUD de base** : getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle
- **Recherche par auteur/statut** : getArticlesByAuthor, getArticlesByStatus, getPublishedArticles
- **Recherche textuelle** : searchArticlesByTitle, getArticlesByTag
- **Fonctions avancées** : getArticlesByAuthorAndStatus, countArticlesByAuthorAndStatus
- **Tests d'erreur** : auteur invalide, article inexistant

#### ProfileService
- **CRUD de base** : getAllProfiles, getProfileById, createProfile, updateProfile, deleteProfile
- **Recherche spécialisée** : getProfileByUserId, getProfilesWithBio, getProfilesWithSocialLinks
- **Fonctions utilitaires** : getProfilesByUserRole, existsByUserId, createProfileForUser
- **Tests d'erreur** : profil déjà existant, utilisateur invalide

#### FeaturedArticleService
- **CRUD de base** : getAllFeaturedArticles, getFeaturedArticleById, createFeaturedArticle, updateFeaturedArticle, deleteFeaturedArticle
- **Gestion des featured** : getActiveFeaturedArticles, getActiveFeaturedArticlesOrdered, getMaxFeaturedOrder
- **Fonctions utilitaires** : existsByArticleId, createFeaturedArticleForArticle
- **Tests d'erreur** : article déjà featured, ordre invalide

## Améliorations Identifiées

### 1. UserService

#### Validations Actuelles
- Vérification d'unicité username/email
- Gestion basique des erreurs avec RuntimeException

#### Améliorations Nécessaires
- **Validation de format email** : vérifier le format RFC 5322
- **Validation de username** : longueur min/max, caractères autorisés
- **Validation de password** : complexité, longueur minimale
- **Validation de rôle** : s'assurer que le rôle est valide
- **Gestion d'exceptions personnalisées** : remplacer RuntimeException par des exceptions spécifiques

### 2. ArticleService

#### Validations Actuelles
- Vérification de l'existence de l'auteur
- Gestion basique des erreurs

#### Améliorations Nécessaires
- **Validation de titre** : non vide, longueur max
- **Validation de contenu** : non vide, longueur min/max
- **Validation d'excerpt** : longueur max
- **Validation de statut** : s'assurer que le statut est valide
- **Validation de tags** : format et nombre max de tags
- **Validation business** : seul un auteur peut créer des articles

### 3. ProfileService

#### Validations Actuelles
- Vérification de l'existence de l'utilisateur
- Un profil par utilisateur maximum

#### Améliorations Nécessaires
- **Validation d'URLs** : format valide pour LinkedIn, Twitter, GitHub, Website
- **Validation de bio** : longueur max
- **Validation d'URL image** : format et taille
- **Validation business** : un profil par utilisateur maximum

### 4. FeaturedArticleService

#### Validations Actuelles
- Vérification de l'existence de l'article
- Un article ne peut être featured qu'une fois

#### Améliorations Nécessaires
- **Validation d'ordre** : ordre unique, non négatif
- **Validation de limite** : nombre max d'articles featured
- **Validation business** : seul les articles PUBLISHED peuvent être featured

## Contraintes de Validation à Implémenter

### Annotations Bean Validation

#### User
```java
// Username
@NotNull @Size(min=3, max=20) @Pattern(regexp="^[a-zA-Z0-9_]+$")
String username;

// Email  
@NotNull @Email @Size(max=100)
String email;

// Password
@NotNull @Size(min=8, max=128) 
@Pattern(regexp="^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]$")
String password;

// Role
@NotNull @Enumerated(EnumType.STRING)
User.Role role;
```

#### Article
```java
// Title
@NotNull @NotBlank @Size(min=5, max=200)
String title;

// Content
@NotNull @NotBlank @Size(min=50, max=50000)
String content;

// Excerpt
@Size(max=500)
String excerpt;

// Status
@NotNull @Enumerated(EnumType.STRING)
Article.Status status;

// Tags
@Size(max=10) @Valid
List<Tag> tags;
```

#### Profile
```java
// Bio
@Size(max=2000)
String bio;

// URLs
@URL @Size(max=255)
String linkedinUrl, twitterUrl, githubUrl, websiteUrl;

// Profile Image
@URL @Size(max=255)
String profileImageUrl;
```

#### FeaturedArticle
```java
// Order
@NotNull @Min(1) @Max(100)
Integer featuredOrder;

// Active status
@NotNull
Boolean isActive;
```

### Validations Business Layer

#### User
- Username et email uniques dans toute la base
- Format email valide (RFC 5322)
- Username avec caractères alphanumériques et underscore uniquement
- Password avec complexité requise (majuscule, minuscule, chiffre, caractère spécial)

#### Article
- Titre unique par auteur
- Contenu minimum 50 caractères
- Statut PUBLISHED requis pour être featured
- Maximum 10 tags par article
- Tags avec format validé

#### Profile
- Un profil par utilisateur maximum
- URLs des réseaux sociaux valides
- Bio maximum 2000 caractères
- URL image profile valide

#### FeaturedArticle
- Ordre unique parmi les articles featured actifs
- Maximum 10 articles featured simultanément
- Article doit être PUBLISHED pour être featured
- Ordre entre 1 et 100

## Exceptions Personnalisées à Créer

### Exceptions Métier
```java
// User
public class UserAlreadyExistsException extends RuntimeException
public class InvalidEmailFormatException extends RuntimeException
public class InvalidUsernameFormatException extends RuntimeException
public class WeakPasswordException extends RuntimeException

// Article
public class ArticleNotFoundException extends RuntimeException
public class InvalidArticleStatusException extends RuntimeException
public class TitleAlreadyExistsException extends RuntimeException

// Profile
public class ProfileAlreadyExistsException extends RuntimeException
public class InvalidSocialMediaURLException extends RuntimeException

// FeaturedArticle
public class FeaturedOrderAlreadyTakenException extends RuntimeException
public class MaxFeaturedArticlesReachedException extends RuntimeException
public class ArticleNotPublishedException extends RuntimeException
```

## Prochaines Étapes

1. **Ajouter les dépendances** : Spring Boot Starter Validation
2. **Implémenter les annotations** sur les entités
3. **Créer les exceptions personnalisées**
4. **Mettre à jour les services** avec les validations avancées
5. **Créer des tests unitaires supplémentaires** pour les nouvelles validations
6. **Ajouter des tests d'intégration** avec les contraintes

## Impact sur l'Application

### Bénéfices
- **Robustesse accrue** : validation des données en entrée
- **Expérience utilisateur améliorée** : messages d'erreur clairs
- **Maintenabilité** : code plus structuré et testable
- **Sécurité** : protection contre les données invalides

### Effort
- **Complexité moyenne** : implémentation des annotations et exceptions
- **Tests supplémentaires** : validation des nouvelles contraintes
- **Documentation** : mise à jour des API avec les nouvelles règles

---

*Document créé le 16/04/2026*
*Version : 1.0*
