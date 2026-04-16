package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.ArticleAlreadyFeaturedException;
import com.dataeng.App.exception.FeaturedArticleNotFoundException;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.FeaturedArticle;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ArticleRepository;
import com.dataeng.App.repository.FeaturedArticleRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class FeaturedArticleServiceTest {

    @Mock
    private FeaturedArticleRepository featuredArticleRepository;

    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private FeaturedArticleService featuredArticleService;

    private User testAuthor;
    private Article testArticle;
    private FeaturedArticle testFeaturedArticle;

    @BeforeEach
    void setUp() {
        testAuthor = new User();
        testAuthor.setId(1L);
        testAuthor.setUsername("author");
        testAuthor.setEmail("author@example.com");
        testAuthor.setRole(User.Role.AUTHOR);

        testArticle = new Article();
        testArticle.setId(1L);
        testArticle.setTitle("Test Article");
        testArticle.setContent("Test content");
        testArticle.setStatus(Article.Status.PUBLISHED);
        testArticle.setAuthor(testAuthor);

        testFeaturedArticle = new FeaturedArticle();
        testFeaturedArticle.setId(1L);
        testFeaturedArticle.setArticle(testArticle);
        testFeaturedArticle.setFeaturedOrder(1);
        testFeaturedArticle.setIsActive(true);
    }

    @Test
    void getAllFeaturedArticles_ShouldReturnAllFeaturedArticles() {
        List<FeaturedArticle> featuredArticles = Arrays.asList(testFeaturedArticle);
        when(featuredArticleRepository.findAll()).thenReturn(featuredArticles);

        List<FeaturedArticle> result = featuredArticleService.getAllFeaturedArticles();

        assertEquals(1, result.size());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.get(0).getFeaturedOrder());
        verify(featuredArticleRepository).findAll();
    }

    @Test
    void getFeaturedArticleById_WithValidId_ShouldReturnFeaturedArticle() {
        when(featuredArticleRepository.findById(1L)).thenReturn(Optional.of(testFeaturedArticle));

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleById(1L);

        assertTrue(result.isPresent());
        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.get().getFeaturedOrder());
        verify(featuredArticleRepository).findById(1L);
    }

    @Test
    void getFeaturedArticleById_WithInvalidId_ShouldReturnEmpty() {
        when(featuredArticleRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleById(999L);

        assertFalse(result.isPresent());
        verify(featuredArticleRepository).findById(999L);
    }

    @Test
    void getFeaturedArticleByArticleId_WithValidArticleId_ShouldReturnFeaturedArticle() {
        when(featuredArticleRepository.findByArticleId(1L)).thenReturn(Optional.of(testFeaturedArticle));

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleByArticleId(1L);

        assertTrue(result.isPresent());
        assertEquals(testFeaturedArticle.getArticle().getId(), result.get().getArticle().getId());
        verify(featuredArticleRepository).findByArticleId(1L);
    }

    @Test
    void getActiveFeaturedArticles_ShouldReturnActiveFeaturedArticles() {
        List<FeaturedArticle> featuredArticles = Arrays.asList(testFeaturedArticle);
        when(featuredArticleRepository.findByIsActive(true)).thenReturn(featuredArticles);

        List<FeaturedArticle> result = featuredArticleService.getActiveFeaturedArticles();

        assertEquals(1, result.size());
        assertTrue(result.get(0).getIsActive());
        verify(featuredArticleRepository).findByIsActive(true);
    }

    @Test
    void getActiveFeaturedArticlesOrdered_ShouldReturnOrderedActiveFeaturedArticles() {
        List<FeaturedArticle> featuredArticles = Arrays.asList(testFeaturedArticle);
        when(featuredArticleRepository.findActiveFeaturedArticlesOrderByOrder()).thenReturn(featuredArticles);

        List<FeaturedArticle> result = featuredArticleService.getActiveFeaturedArticlesOrdered();

        assertEquals(1, result.size());
        verify(featuredArticleRepository).findActiveFeaturedArticlesOrderByOrder();
    }

    @Test
    void getFeaturedArticleByOrder_WithValidOrder_ShouldReturnFeaturedArticle() {
        when(featuredArticleRepository.findByFeaturedOrderAndIsActive(1)).thenReturn(Optional.of(testFeaturedArticle));

        Optional<FeaturedArticle> result = featuredArticleService.getFeaturedArticleByOrder(1);

        assertTrue(result.isPresent());
        assertEquals(1, result.get().getFeaturedOrder());
        verify(featuredArticleRepository).findByFeaturedOrderAndIsActive(1);
    }

    @Test
    void getMaxFeaturedOrder_ShouldReturnMaxOrder() {
        when(featuredArticleRepository.findMaxFeaturedOrder()).thenReturn(5);

        Integer result = featuredArticleService.getMaxFeaturedOrder();

        assertEquals(5, result);
        verify(featuredArticleRepository).findMaxFeaturedOrder();
    }

    @Test
    void createFeaturedArticle_WithValidFeaturedArticle_ShouldReturnCreatedFeaturedArticle() {
        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));
        when(featuredArticleRepository.existsByArticle(testArticle)).thenReturn(false);
        when(featuredArticleRepository.save(any(FeaturedArticle.class))).thenReturn(testFeaturedArticle);

        FeaturedArticle result = featuredArticleService.createFeaturedArticle(testFeaturedArticle);

        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.getFeaturedOrder());
        assertEquals(testArticle.getId(), result.getArticle().getId());
        verify(articleRepository).findById(1L);
        verify(featuredArticleRepository).existsByArticle(testArticle);
        verify(featuredArticleRepository).save(testFeaturedArticle);
    }

    @Test
    void createFeaturedArticle_WithNullArticle_ShouldThrowArticleNotFoundException() {
        testFeaturedArticle.setArticle(null);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article is required", exception.getMessage());
        verify(featuredArticleRepository, never()).save(any());
    }

    @Test
    void createFeaturedArticle_WithInvalidArticleId_ShouldThrowArticleNotFoundException() {
        testArticle.setId(999L);
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
        verify(articleRepository).findById(999L);
        verify(featuredArticleRepository, never()).save(any());
    }

    @Test
    void createFeaturedArticle_WithAlreadyFeaturedArticle_ShouldThrowArticleAlreadyFeaturedException() {
        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));
        when(featuredArticleRepository.existsByArticle(testArticle)).thenReturn(true);

        ArticleAlreadyFeaturedException exception = assertThrows(ArticleAlreadyFeaturedException.class, () -> {
            featuredArticleService.createFeaturedArticle(testFeaturedArticle);
        });

        assertEquals("Article is already featured", exception.getMessage());
        verify(articleRepository).findById(1L);
        verify(featuredArticleRepository).existsByArticle(testArticle);
        verify(featuredArticleRepository, never()).save(any());
    }

    @Test
    void updateFeaturedArticle_WithValidId_ShouldReturnUpdatedFeaturedArticle() {
        FeaturedArticle updatedFeaturedArticle = new FeaturedArticle();
        updatedFeaturedArticle.setFeaturedOrder(2);
        updatedFeaturedArticle.setIsActive(false);

        when(featuredArticleRepository.findById(1L)).thenReturn(Optional.of(testFeaturedArticle));
        when(featuredArticleRepository.save(any(FeaturedArticle.class))).thenReturn(updatedFeaturedArticle);

        FeaturedArticle result = featuredArticleService.updateFeaturedArticle(1L, updatedFeaturedArticle);

        assertEquals(2, result.getFeaturedOrder());
        assertFalse(result.getIsActive());
        verify(featuredArticleRepository).findById(1L);
        verify(featuredArticleRepository).save(any(FeaturedArticle.class));
    }

    @Test
    void updateFeaturedArticle_WithInvalidId_ShouldThrowFeaturedArticleNotFoundException() {
        when(featuredArticleRepository.findById(999L)).thenReturn(Optional.empty());

        FeaturedArticleNotFoundException exception = assertThrows(FeaturedArticleNotFoundException.class, () -> {
            featuredArticleService.updateFeaturedArticle(999L, testFeaturedArticle);
        });

        assertEquals("Featured article not found with id: 999", exception.getMessage());
        verify(featuredArticleRepository).findById(999L);
        verify(featuredArticleRepository, never()).save(any());
    }

    @Test
    void deleteFeaturedArticle_WithValidId_ShouldDeleteFeaturedArticle() {
        when(featuredArticleRepository.existsById(1L)).thenReturn(true);

        featuredArticleService.deleteFeaturedArticle(1L);

        verify(featuredArticleRepository).existsById(1L);
        verify(featuredArticleRepository).deleteById(1L);
    }

    @Test
    void deleteFeaturedArticle_WithInvalidId_ShouldThrowFeaturedArticleNotFoundException() {
        when(featuredArticleRepository.existsById(999L)).thenReturn(false);

        FeaturedArticleNotFoundException exception = assertThrows(FeaturedArticleNotFoundException.class, () -> {
            featuredArticleService.deleteFeaturedArticle(999L);
        });

        assertEquals("Featured article not found with id: 999", exception.getMessage());
        verify(featuredArticleRepository).existsById(999L);
        verify(featuredArticleRepository, never()).deleteById(any());
    }

    @Test
    void existsByArticleId_ShouldReturnTrueIfExists() {
        when(featuredArticleRepository.existsByArticleId(1L)).thenReturn(true);

        boolean result = featuredArticleService.existsByArticleId(1L);

        assertTrue(result);
        verify(featuredArticleRepository).existsByArticleId(1L);
    }

    @Test
    void createFeaturedArticleForArticle_WithValidArticleId_ShouldReturnCreatedFeaturedArticle() {
        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));
        when(featuredArticleRepository.existsByArticle(testArticle)).thenReturn(false);
        when(featuredArticleRepository.save(any(FeaturedArticle.class))).thenReturn(testFeaturedArticle);

        FeaturedArticle result = featuredArticleService.createFeaturedArticleForArticle(1L, testFeaturedArticle);

        assertEquals(testFeaturedArticle.getFeaturedOrder(), result.getFeaturedOrder());
        assertEquals(testArticle.getId(), result.getArticle().getId());
        verify(articleRepository).findById(1L);
        verify(featuredArticleRepository).existsByArticle(testArticle);
        verify(featuredArticleRepository).save(testFeaturedArticle);
    }

    @Test
    void createFeaturedArticleForArticle_WithInvalidArticleId_ShouldThrowArticleNotFoundException() {
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(999L, testFeaturedArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
        verify(articleRepository).findById(999L);
        verify(featuredArticleRepository, never()).save(any());
    }

    @Test
    void createFeaturedArticleForArticle_WithAlreadyFeaturedArticle_ShouldThrowArticleAlreadyFeaturedException() {
        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));
        when(featuredArticleRepository.existsByArticle(testArticle)).thenReturn(true);

        ArticleAlreadyFeaturedException exception = assertThrows(ArticleAlreadyFeaturedException.class, () -> {
            featuredArticleService.createFeaturedArticleForArticle(1L, testFeaturedArticle);
        });

        assertEquals("Article is already featured", exception.getMessage());
        verify(articleRepository).findById(1L);
        verify(featuredArticleRepository).existsByArticle(testArticle);
        verify(featuredArticleRepository, never()).save(any());
    }
}
