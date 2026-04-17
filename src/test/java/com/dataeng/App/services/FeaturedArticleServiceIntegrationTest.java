package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleAlreadyFeaturedException;
import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.DuplicateFeaturedOrderException;
import com.dataeng.App.exception.FeaturedArticleNotFoundException;
import com.dataeng.App.exception.FeaturedLimitExceededException;
import com.dataeng.App.exception.InvalidArticleStatusException;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.FeaturedArticle;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ArticleRepository;
import com.dataeng.App.repository.FeaturedArticleRepository;
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

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
@Transactional
class FeaturedArticleServiceIntegrationTest {

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
    private FeaturedArticleRepository featuredArticleRepository;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FeaturedArticleService featuredArticleService;

    private User authorUser;
    private Article publishedArticle;
    private Article draftArticle;
    private FeaturedArticle testFeaturedArticle;

    @BeforeEach
    void setUp() {
        // Create author user
        authorUser = new User();
        authorUser.setUsername("author1234"); // plus de 3 caractères
        authorUser.setEmail("author@example.com"); // adresse valide
        authorUser.setPassword("AuthorPass123!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        authorUser.setRole(User.Role.AUTHOR);
        authorUser = userRepository.save(authorUser);

        // Create published article
        publishedArticle = new Article();
        publishedArticle.setTitle("Published Article");
        publishedArticle.setContent("This is a published article with sufficient content to meet validation requirements.");
        publishedArticle.setExcerpt("Published excerpt");
        publishedArticle.setStatus(Article.Status.PUBLISHED);
        publishedArticle.setAuthor(authorUser);
        publishedArticle = articleRepository.save(publishedArticle);

        // Create draft article
        draftArticle = new Article();
        draftArticle.setTitle("Draft Article");
        draftArticle.setContent("This is a draft article with sufficient content to meet validation requirements.");
        draftArticle.setExcerpt("Draft excerpt");
        draftArticle.setStatus(Article.Status.DRAFT);
        draftArticle.setAuthor(authorUser);
        draftArticle = articleRepository.save(draftArticle);

        // Create test featured article
        testFeaturedArticle = new FeaturedArticle();
        testFeaturedArticle.setArticle(publishedArticle);
        testFeaturedArticle.setFeaturedOrder(1);
        testFeaturedArticle.setIsActive(true);
    }

    @Test
    void getAllFeaturedArticles_ShouldReturnAllFeaturedArticles() {
        featuredArticleRepository.save(testFeaturedArticle);

        List<FeaturedArticle> result = featuredArticleService.getAllFeaturedArticles();

        assertEquals(1, result.size());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.get(0).getFeaturedOrder());
    }

    @Test
    void getFeaturedArticleById_WithValidId_ShouldReturnFeaturedArticle() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleById(savedFeaturedArticle.getId());

        assertTrue(result.isPresent());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.get().getFeaturedOrder());
    }

    @Test
    void getFeaturedArticleById_WithInvalidId_ShouldReturnEmpty() {
        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getFeaturedArticleByArticleId_WithValidArticleId_ShouldReturnFeaturedArticle() {
        featuredArticleRepository.save(testFeaturedArticle);

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleByArticleId(publishedArticle.getId());

        assertTrue(result.isPresent());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.get().getFeaturedOrder());
    }

    @Test
    void getActiveFeaturedArticles_ShouldReturnActiveFeaturedArticles() {
        featuredArticleRepository.save(testFeaturedArticle);

        List<FeaturedArticle> result = featuredArticleService.getActiveFeaturedArticles();

        assertEquals(1, result.size());
        assertTrue(result.get(0).getIsActive());
    }

    @Test
    void getActiveFeaturedArticlesOrdered_ShouldReturnActiveFeaturedArticlesOrdered() {
        featuredArticleRepository.save(testFeaturedArticle);

        List<FeaturedArticle> result = featuredArticleService.getActiveFeaturedArticlesOrdered();

        assertEquals(1, result.size());
        assertTrue(result.get(0).getIsActive());
    }

    @Test
    void getFeaturedArticleByOrder_WithValidOrder_ShouldReturnFeaturedArticle() {
        featuredArticleRepository.save(testFeaturedArticle);

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleByOrder(1);

        assertTrue(result.isPresent());
        assertEquals(1, result.get().getFeaturedOrder());
    }

    @Test
    void getMaxFeaturedOrder_WithFeaturedArticles_ShouldReturnMaxOrder() {
        featuredArticleRepository.save(testFeaturedArticle);

        Integer result = featuredArticleService.getMaxFeaturedOrder();

        assertEquals(1, result);
    }

    @Test
    void createFeaturedArticle_WithValidData_ShouldReturnCreatedFeaturedArticle() {
        FeaturedArticle result = featuredArticleService.createFeaturedArticle(testFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(testFeaturedArticle.getArticle().getId(), result.getArticle().getId());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }

    @Test
    void createFeaturedArticle_WithNullArticle_ShouldThrowArticleNotFoundException() {
        testFeaturedArticle.setArticle(null);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article is required", exception.getMessage());
    }

    @Test
    void createFeaturedArticle_WithNullArticleId_ShouldThrowArticleNotFoundException() {
        Article articleWithNullId = new Article();
        articleWithNullId.setId(null);
        testFeaturedArticle.setArticle(articleWithNullId);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article is required", exception.getMessage());
    }

    @Test
    void createFeaturedArticle_WithInvalidArticleId_ShouldThrowArticleNotFoundException() {
        Article invalidArticle = new Article();
        invalidArticle.setId(999L);
        testFeaturedArticle.setArticle(invalidArticle);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
    }

    @Test
    void createFeaturedArticle_WithDraftArticle_ShouldThrowInvalidArticleStatusException() {
        testFeaturedArticle.setArticle(draftArticle);

        InvalidArticleStatusException exception = assertThrows(InvalidArticleStatusException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Only PUBLISHED articles can be featured", exception.getMessage());
    }

    @Test
    void createFeaturedArticle_ExceedingLimit_ShouldThrowFeaturedLimitExceededException() {
        // Create 10 active featured articles to reach the limit
        for (int i = 1; i <= 10; i++) {
            FeaturedArticle fa = new FeaturedArticle();
            fa.setArticle(publishedArticle);
            fa.setFeaturedOrder(i);
            fa.setIsActive(true);
            featuredArticleRepository.save(fa);
        }

        FeaturedArticle newFeaturedArticle = new FeaturedArticle();
        newFeaturedArticle.setArticle(publishedArticle);
        newFeaturedArticle.setFeaturedOrder(11);
        newFeaturedArticle.setIsActive(true);

        FeaturedLimitExceededException exception = assertThrows(FeaturedLimitExceededException.class, () -> {
            featuredArticleService.createFeaturedArticle(newFeaturedArticle);
        });

        assertEquals("Maximum of 10 featured articles allowed", exception.getMessage());
    }

    @Test
    void createFeaturedArticle_WithDuplicateOrder_ShouldThrowDuplicateFeaturedOrderException() {
        // Save first featured article with order 1
        featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle duplicateOrderArticle = new FeaturedArticle();
        duplicateOrderArticle.setArticle(publishedArticle);
        duplicateOrderArticle.setFeaturedOrder(1);
        duplicateOrderArticle.setIsActive(true);

        DuplicateFeaturedOrderException exception = assertThrows(DuplicateFeaturedOrderException.class, () -> {
            featuredArticleService.createFeaturedArticle(duplicateOrderArticle);
        });

        assertEquals("Featured order 1 is already taken", exception.getMessage());
    }

    @Test
    void updateFeaturedArticle_WithValidId_ShouldReturnUpdatedFeaturedArticle() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setArticle(publishedArticle);
        updatedFeaturedArticle.setFeaturedOrder(2);
        updatedFeaturedArticle.setIsActive(false);

        FeaturedArticle result = featuredArticleService.updateFeaturedArticle(savedFeaturedArticle.getId(), updatedFeaturedArticle);

        assertEquals(2, result.getFeaturedOrder());
        assertFalse(result.getIsActive());
    }

    @Test
    void updateFeaturedArticle_WithInvalidId_ShouldThrowFeaturedArticleNotFoundException() {
        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setArticle(publishedArticle);
        updatedFeaturedArticle.setFeaturedOrder(2);
        updatedFeaturedArticle.setIsActive(false);

        FeaturedArticleNotFoundException exception = assertThrows(FeaturedArticleNotFoundException.class, () -> {
            featuredArticleService.updateFeaturedArticle(999L, updatedFeaturedArticle);
        });

        assertEquals("Featured article not found with id: 999", exception.getMessage());
    }

    @Test
    void deleteFeaturedArticle_WithValidId_ShouldDeleteFeaturedArticle() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        featuredArticleService.deleteFeaturedArticle(savedFeaturedArticle.getId());

        assertFalse(featuredArticleRepository.existsById(savedFeaturedArticle.getId()));
    }

    @Test
    void deleteFeaturedArticle_WithInvalidId_ShouldThrowFeaturedArticleNotFoundException() {
        FeaturedArticleNotFoundException exception = assertThrows(FeaturedArticleNotFoundException.class, () -> {
            featuredArticleService.deleteFeaturedArticle(999L);
        });

        assertEquals("Featured article not found with id: 999", exception.getMessage());
    }

    @Test
    void existsByArticleId_ShouldReturnTrueIfExists() {
        featuredArticleRepository.save(testFeaturedArticle);

        boolean result = featuredArticleService.existsByArticleId(publishedArticle.getId());

        assertTrue(result);
    }

    @Test
    void existsByArticleId_ShouldReturnFalseIfNotExists() {
        boolean result = featuredArticleService.existsByArticleId(999L);

        assertFalse(result);
    }

    @Test
    void createFeaturedArticleForArticle_WithValidArticleId_ShouldReturnCreatedFeaturedArticle() {
        FeaturedArticle newFeaturedArticle = new FeaturedArticle();
        newFeaturedArticle.setFeaturedOrder(1);
        newFeaturedArticle.setIsActive(true);

        FeaturedArticle result = featuredArticleService.createFeaturedArticleForArticle(publishedArticle.getId(), newFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(publishedArticle.getId(), result.getArticle().getId());
        assertEquals(1, result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }

    @Test
    void createFeaturedArticleForArticle_WithInvalidArticleId_ShouldThrowArticleNotFoundException() {
        FeaturedArticle newFeaturedArticle = new FeaturedArticle();
        newFeaturedArticle.setFeaturedOrder(1);
        newFeaturedArticle.setIsActive(true);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(999L, newFeaturedArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
    }

    @Test
    void createFeaturedArticleForArticle_WithAlreadyFeaturedArticle_ShouldThrowArticleAlreadyFeaturedException() {
        featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle newFeaturedArticle = new FeaturedArticle();
        newFeaturedArticle.setFeaturedOrder(2);
        newFeaturedArticle.setIsActive(true);

        ArticleAlreadyFeaturedException exception = assertThrows(ArticleAlreadyFeaturedException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(publishedArticle.getId(), newFeaturedArticle);
        });

        assertEquals("Article is already featured", exception.getMessage());
    }

    // ========== Tests de validation Jakarta ==========

    @Test
    void createFeaturedArticle_WithNegativeOrder_ShouldThrowConstraintViolationException() {
        FeaturedArticle invalidFeaturedArticle = new FeaturedArticle();
        invalidFeaturedArticle.setArticle(publishedArticle);
        invalidFeaturedArticle.setFeaturedOrder(-1); // Ordre négatif
        invalidFeaturedArticle.setIsActive(true);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.createFeaturedArticle(invalidFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("featuredOrder"));
        assertTrue(exception.getMessage().contains("doit être supérieur ou égal à"));
    }

    @Test
    void createFeaturedArticle_WithTooLargeOrder_ShouldThrowConstraintViolationException() {
        FeaturedArticle invalidFeaturedArticle = new FeaturedArticle();
        invalidFeaturedArticle.setArticle(publishedArticle);
        invalidFeaturedArticle.setFeaturedOrder(1000000); // Ordre trop grand
        invalidFeaturedArticle.setIsActive(true);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.createFeaturedArticle(invalidFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("featuredOrder"));
        assertTrue(exception.getMessage().contains("doit être inférieur ou égal à"));
    }

    @Test
    void createFeaturedArticle_WithNullIsActive_ShouldThrowConstraintViolationException() {
        FeaturedArticle invalidFeaturedArticle = new FeaturedArticle();
        invalidFeaturedArticle.setArticle(publishedArticle);
        invalidFeaturedArticle.setFeaturedOrder(1);
        invalidFeaturedArticle.setIsActive(null); // isActive ne peut pas être null

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.createFeaturedArticle(invalidFeaturedArticle);
        });

        System.out.println(exception.getMessage());
        assertTrue(exception.getMessage().contains("isActive"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void updateFeaturedArticle_WithInvalidOrder_ShouldThrowConstraintViolationException() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setArticle(publishedArticle);
        updatedFeaturedArticle.setFeaturedOrder(-5); // Ordre négatif
        updatedFeaturedArticle.setIsActive(true);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.updateFeaturedArticle(savedFeaturedArticle.getId(), updatedFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("featuredOrder"));
        assertTrue(exception.getMessage().contains("doit être supérieur ou égal à"));
    }

    @Test
    void updateFeaturedArticle_WithNullIsActive_ShouldThrowConstraintViolationException() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setArticle(publishedArticle);
        updatedFeaturedArticle.setFeaturedOrder(2);
        updatedFeaturedArticle.setIsActive(null); // isActive ne peut pas être null

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.updateFeaturedArticle(savedFeaturedArticle.getId(), updatedFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("isActive"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createFeaturedArticleForArticle_WithInvalidOrder_ShouldThrowConstraintViolationException() {
        FeaturedArticle invalidFeaturedArticle = new FeaturedArticle();
        invalidFeaturedArticle.setFeaturedOrder(-1); // Ordre négatif
        invalidFeaturedArticle.setIsActive(true);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(publishedArticle.getId(), invalidFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("featuredOrder"));
        assertTrue(exception.getMessage().contains("doit être supérieur ou égal à"));
    }

    @Test
    void createFeaturedArticleForArticle_WithNullIsActive_ShouldThrowConstraintViolationException() {
        FeaturedArticle invalidFeaturedArticle = new FeaturedArticle();
        invalidFeaturedArticle.setFeaturedOrder(1);
        invalidFeaturedArticle.setIsActive(null); // isActive ne peut pas être null

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(publishedArticle.getId(), invalidFeaturedArticle);
        });

        assertTrue(exception.getMessage().contains("isActive"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createFeaturedArticle_WithValidData_ShouldSucceed() {
        FeaturedArticle validFeaturedArticle = new FeaturedArticle();
        validFeaturedArticle.setArticle(publishedArticle);
        validFeaturedArticle.setFeaturedOrder(1);
        validFeaturedArticle.setIsActive(true);

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(validFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(publishedArticle.getId(), result.getArticle().getId());
        assertEquals(1, result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }

    @Test
    void createFeaturedArticle_WithZeroOrder_ShouldSucceed() {
        FeaturedArticle validFeaturedArticle = new FeaturedArticle();
        validFeaturedArticle.setArticle(publishedArticle);
        validFeaturedArticle.setFeaturedOrder(0); // Ordre 0 est valide
        validFeaturedArticle.setIsActive(true);

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(validFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(0, result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }

    @Test
    void createFeaturedArticle_WithMaxOrder_ShouldSucceed() {
        FeaturedArticle validFeaturedArticle = new FeaturedArticle();
        validFeaturedArticle.setArticle(publishedArticle);
        validFeaturedArticle.setFeaturedOrder(999); // Ordre maximal valide
        validFeaturedArticle.setIsActive(true);

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(validFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(999, result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }

    @Test
    void createFeaturedArticle_WithInactiveStatus_ShouldSucceed() {
        FeaturedArticle validFeaturedArticle = new FeaturedArticle();
        validFeaturedArticle.setArticle(publishedArticle);
        validFeaturedArticle.setFeaturedOrder(1);
        validFeaturedArticle.setIsActive(false); // Inactif est valide

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(validFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(1, result.getFeaturedOrder());
        assertFalse(result.getIsActive());
    }

    @Test
    void updateFeaturedArticle_WithValidData_ShouldSucceed() {
        FeaturedArticle savedFeaturedArticle = featuredArticleRepository.save(testFeaturedArticle);

        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setArticle(publishedArticle);
        updatedFeaturedArticle.setFeaturedOrder(5);
        updatedFeaturedArticle.setIsActive(false);

        FeaturedArticle result = featuredArticleService.updateFeaturedArticle(savedFeaturedArticle.getId(), updatedFeaturedArticle);

        assertEquals(5, result.getFeaturedOrder());
        assertFalse(result.getIsActive());
    }

    @Test
    void createFeaturedArticle_WithValidBusinessRules_ShouldSucceed() {
        // Créer un article publié valide
        Article validArticle = new Article();
        validArticle.setTitle("Valid Article");
        validArticle.setContent("This is valid content that meets the minimum requirements for article creation and validation.");
        validArticle.setStatus(Article.Status.PUBLISHED);
        validArticle.setAuthor(authorUser);
        validArticle = articleRepository.save(validArticle);

        FeaturedArticle validFeaturedArticle = new FeaturedArticle();
        validFeaturedArticle.setArticle(validArticle);
        validFeaturedArticle.setFeaturedOrder(1);
        validFeaturedArticle.setIsActive(true);

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(validFeaturedArticle);

        assertNotNull(result.getId());
        assertEquals(validArticle.getId(), result.getArticle().getId());
        assertEquals(1, result.getFeaturedOrder());
        assertTrue(result.getIsActive());
    }
}
