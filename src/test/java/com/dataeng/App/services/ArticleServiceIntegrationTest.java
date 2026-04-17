package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.AuthorNotFoundException;
import com.dataeng.App.exception.DuplicateTitleException;
import com.dataeng.App.exception.UnauthorizedException;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.Tag;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ArticleRepository;
import com.dataeng.App.repository.UserRepository;
import jakarta.validation.ConstraintViolationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
@Transactional
class ArticleServiceIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("dataengDb")
            .withUsername("testuser")
            .withPassword("testpass");

    @DynamicPropertySource
    static void configure(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> postgres.getJdbcUrl());
        registry.add("spring.datasource.username", () -> postgres.getUsername());
        registry.add("spring.datasource.password", () -> postgres.getPassword());
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
    }

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ArticleService articleService;

    private User authorUser;
    private User regularUser;
    private Article testArticle;

    @BeforeEach
    void setUp() {
        // Create users
        authorUser = new User();
        authorUser.setUsername("author1234"); // plus de 3 caractères
        authorUser.setEmail("author@example.com"); // adresse valide
        authorUser.setPassword("AuthorPass123!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        authorUser.setRole(User.Role.AUTHOR);
        authorUser = userRepository.save(authorUser);

        regularUser = new User();
        regularUser.setUsername("regular1234"); // plus de 3 caractères
        regularUser.setEmail("regular@example.com"); // adresse valide
        regularUser.setPassword("RegularPass123!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        regularUser.setRole(User.Role.USER);
        regularUser = userRepository.save(regularUser);

        // Create test article
        testArticle = new Article();
        testArticle.setTitle("Test Article");
        testArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        testArticle.setExcerpt("Test excerpt");
        testArticle.setStatus(Article.Status.DRAFT);
        testArticle.setAuthor(authorUser);
    }

    @Test
    void getAllArticles_ShouldReturnAllArticles() {
        articleRepository.save(testArticle);

        List<Article> result = articleService.getAllArticles();

        assertEquals(1, result.size());
        assertEquals(testArticle.getTitle(), result.get(0).getTitle());
    }

    @Test
    void getArticleById_WithValidId_ShouldReturnArticle() {
        Article savedArticle = articleRepository.save(testArticle);

        Optional<Article> result = articleService.getArticleById(savedArticle.getId());

        assertTrue(result.isPresent());
        assertEquals(testArticle.getTitle(), result.get().getTitle());
    }

    @Test
    void getArticleById_WithInvalidId_ShouldReturnEmpty() {
        Optional<Article> result = articleService.getArticleById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getArticlesByAuthor_ShouldReturnArticlesByAuthor() {
        articleRepository.save(testArticle);

        List<Article> result = articleService.getArticlesByAuthor(authorUser.getId());

        assertEquals(1, result.size());
        assertEquals(authorUser.getId(), result.get(0).getAuthor().getId());
    }

    @Test
    void getArticlesByAuthor_WithInvalidAuthor_ShouldThrowAuthorNotFoundException() {
        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.getArticlesByAuthor(999L);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
    }

    @Test
    void getArticlesByStatus_ShouldReturnArticlesWithStatus() {
        testArticle.setStatus(Article.Status.PUBLISHED);
        articleRepository.save(testArticle);

        List<Article> result = articleService.getArticlesByStatus(Article.Status.PUBLISHED);

        assertEquals(1, result.size());
        assertEquals(Article.Status.PUBLISHED, result.get(0).getStatus());
    }

    @Test
    void getPublishedArticles_ShouldReturnPublishedArticles() {
        testArticle.setStatus(Article.Status.PUBLISHED);
        articleRepository.save(testArticle);

        List<Article> result = articleService.getPublishedArticles();

        assertEquals(1, result.size());
        assertEquals(Article.Status.PUBLISHED, result.get(0).getStatus());
    }

    @Test
    void searchArticlesByTitle_ShouldReturnMatchingArticles() {
        articleRepository.save(testArticle);

        List<Article> result = articleService.searchArticlesByTitle("Test");

        assertEquals(1, result.size());
        assertTrue(result.get(0).getTitle().contains("Test"));
    }

    @Test
    void createArticle_WithValidAuthor_ShouldReturnCreatedArticle() {
        Article result = articleService.createArticle(testArticle);

        assertNotNull(result.getId());
        assertEquals(testArticle.getTitle(), result.getTitle());
        assertEquals(testArticle.getAuthor().getId(), result.getAuthor().getId());
    }

    @Test
    void createArticle_WithNullAuthor_ShouldThrowAuthorNotFoundException() {
        testArticle.setAuthor(null);

        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.createArticle(testArticle);
        });

        assertEquals("Author is required", exception.getMessage());
    }

    @Test
    void createArticle_WithInvalidAuthorId_ShouldThrowAuthorNotFoundException() {
        User invalidAuthor = new User();
        invalidAuthor.setId(999L);
        testArticle.setAuthor(invalidAuthor);

        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.createArticle(testArticle);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
    }

    @Test
    void createArticle_WithNonAuthorUser_ShouldThrowUnauthorizedException() {
        testArticle.setAuthor(regularUser);

        UnauthorizedException exception = assertThrows(UnauthorizedException.class, () -> {
            articleService.createArticle(testArticle);
        });

        assertEquals("Only users with AUTHOR role can create articles", exception.getMessage());
    }

    @Test
    void createArticle_WithDuplicateTitleForAuthor_ShouldThrowDuplicateTitleException() {
        articleRepository.save(testArticle);

        Article duplicateArticle = new Article();
        duplicateArticle.setTitle("Test Article");
        duplicateArticle.setContent("Different content that meets validation requirements for length.");
        duplicateArticle.setAuthor(authorUser);

        DuplicateTitleException exception = assertThrows(DuplicateTitleException.class, () -> {
            articleService.createArticle(duplicateArticle);
        });

        assertEquals("An article with this title already exists for this author", exception.getMessage());
    }

    @Test
    void updateArticle_WithValidId_ShouldReturnUpdatedArticle() {
        Article savedArticle = articleRepository.save(testArticle);

        Article updatedArticle = new Article();
        updatedArticle.setTitle("Updated Title");
        updatedArticle.setContent("Updated content that meets validation requirements for length.");
        updatedArticle.setExcerpt("Updated excerpt");
        updatedArticle.setStatus(Article.Status.PUBLISHED);

        Article result = articleService.updateArticle(savedArticle.getId(), updatedArticle);

        assertEquals("Updated Title", result.getTitle());
        assertEquals("Updated content that meets validation requirements for length.", result.getContent());
        assertEquals(Article.Status.PUBLISHED, result.getStatus());
    }

    @Test
    void updateArticle_WithInvalidId_ShouldThrowArticleNotFoundException() {
        Article updatedArticle = new Article();
        updatedArticle.setTitle("Updated Title");
        updatedArticle.setContent("Updated content that meets validation requirements for length.");

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            articleService.updateArticle(999L, updatedArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
    }

    @Test
    void deleteArticle_WithValidId_ShouldDeleteArticle() {
        Article savedArticle = articleRepository.save(testArticle);

        articleService.deleteArticle(savedArticle.getId());

        assertFalse(articleRepository.existsById(savedArticle.getId()));
    }

    @Test
    void deleteArticle_WithInvalidId_ShouldThrowArticleNotFoundException() {
        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            articleService.deleteArticle(999L);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
    }

    @Test
    void getArticlesByAuthorAndStatus_ShouldReturnArticlesByAuthorAndStatus() {
        testArticle.setStatus(Article.Status.PUBLISHED);
        articleRepository.save(testArticle);

        List<Article> result = articleService.getArticlesByAuthorAndStatus(authorUser.getId(), Article.Status.PUBLISHED);

        assertEquals(1, result.size());
        assertEquals(authorUser.getId(), result.get(0).getAuthor().getId());
        assertEquals(Article.Status.PUBLISHED, result.get(0).getStatus());
    }

    @Test
    void getArticlesByAuthorAndStatus_WithInvalidAuthor_ShouldThrowAuthorNotFoundException() {
        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.getArticlesByAuthorAndStatus(999L, Article.Status.PUBLISHED);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
    }

    @Test
    void countArticlesByAuthorAndStatus_ShouldReturnCorrectCount() {
        testArticle.setStatus(Article.Status.PUBLISHED);
        articleRepository.save(testArticle);

        long result = articleService.countArticlesByAuthorAndStatus(authorUser.getId(), Article.Status.PUBLISHED);

        assertEquals(1, result);
    }

    @Test
    void countArticlesByAuthorAndStatus_WithInvalidAuthor_ShouldThrowAuthorNotFoundException() {
        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.countArticlesByAuthorAndStatus(999L, Article.Status.PUBLISHED);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
    }

    // ========== Tests de validation Jakarta ==========

    @Test
    void createArticle_WithNullTitle_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle(null);
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("title"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createArticle_WithShortTitle_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Hi"); // Moins de 5 caractères
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("title"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithLongTitle_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("This is a very long title that exceeds the maximum allowed length of two hundred characters which is the limit set for article titles in the validation constraints. This title is definitely too long and should trigger a validation error when trying to create the article.");
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("title"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithNullContent_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent(null);
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("content"));
        assertTrue(exception.getMessage().contains("must not be null"));
    }

    @Test
    void createArticle_WithBlankContent_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("   "); // Content vide
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("content"));
        assertTrue(exception.getMessage().contains("must not be blank"));
    }

    @Test
    void createArticle_WithShortContent_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("Short content"); // Moins de 50 caractères
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("content"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithLongContent_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("a".repeat(50001)); // Plus de 50000 caractères
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("content"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithLongExcerpt_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setExcerpt("a".repeat(501)); // Plus de 500 caractères
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("excerpt"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithNullStatus_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setStatus(null);
        invalidArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("status"));
        assertTrue(exception.getMessage().contains("must not be null"));
    }

    @Test
    void createArticle_WithTooManyTags_ShouldThrowConstraintViolationException() {
        Article invalidArticle = new Article();
        invalidArticle.setTitle("Valid Title");
        invalidArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        invalidArticle.setAuthor(authorUser);

        // Créer plus de 10 tags
        Set<Tag> tags = new HashSet<>();
        for (int i = 0; i < 11; i++) {
            Tag tag = new Tag();
            tag.setName("tag" + i);
            tags.add(tag);
        }
        invalidArticle.setTags(tags);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.createArticle(invalidArticle);
        });

        assertTrue(exception.getMessage().contains("tags"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void updateArticle_WithInvalidData_ShouldThrowConstraintViolationException() {
        Article savedArticle = articleRepository.save(testArticle);

        Article updatedArticle = new Article();
        updatedArticle.setTitle("Hi"); // Titre trop court
        updatedArticle.setContent("This is test content for the article. It should be at least 50 characters long to meet validation requirements.");
        updatedArticle.setAuthor(authorUser);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            articleService.updateArticle(savedArticle.getId(), updatedArticle);
        });

        assertTrue(exception.getMessage().contains("title"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createArticle_WithValidData_ShouldSucceed() {
        Article validArticle = new Article();
        validArticle.setTitle("Valid Article Title");
        validArticle.setContent("This is valid test content for the article. It meets the minimum requirement of 50 characters to pass validation constraints and allows the article to be created successfully.");
        validArticle.setExcerpt("Valid excerpt");
        validArticle.setStatus(Article.Status.DRAFT);
        validArticle.setAuthor(authorUser);

        Article result = articleService.createArticle(validArticle);

        assertNotNull(result.getId());
        assertEquals(validArticle.getTitle(), result.getTitle());
        assertEquals(validArticle.getContent(), result.getContent());
    }

    @Test
    void createArticle_WithValidTags_ShouldSucceed() {
        Article validArticle = new Article();
        validArticle.setTitle("Valid Article Title");
        validArticle.setContent("This is valid test content for the article. It meets the minimum requirement of 50 characters to pass validation constraints and allows the article to be created successfully.");
        validArticle.setAuthor(authorUser);

        // Créer exactement 10 tags (limite maximale)
        Set<Tag> tags = new HashSet<>();
        for (int i = 0; i < 10; i++) {
            Tag tag = new Tag();
            tag.setName("tag" + i);
            tags.add(tag);
        }
        validArticle.setTags(tags);

        Article result = articleService.createArticle(validArticle);

        assertNotNull(result.getId());
        assertEquals(10, result.getTags().size());
    }
}
