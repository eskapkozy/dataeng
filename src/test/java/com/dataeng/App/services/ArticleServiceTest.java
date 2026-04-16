package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.AuthorNotFoundException;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ArticleRepository;
import com.dataeng.App.repository.UserRepository;
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
class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ArticleService articleService;

    private User testAuthor;
    private Article testArticle;

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
        testArticle.setExcerpt("Test excerpt");
        testArticle.setStatus(Article.Status.PUBLISHED);
        testArticle.setAuthor(testAuthor);
    }

    @Test
    void getAllArticles_ShouldReturnAllArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findAll()).thenReturn(articles);

        List<Article> result = articleService.getAllArticles();

        assertEquals(1, result.size());
        assertEquals(testArticle.getTitle(), result.get(0).getTitle());
        verify(articleRepository).findAll();
    }

    @Test
    void getArticleById_WithValidId_ShouldReturnArticle() {
        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));

        Optional<Article> result = articleService.getArticleById(1L);

        assertTrue(result.isPresent());
        assertEquals(testArticle.getTitle(), result.get().getTitle());
        verify(articleRepository).findById(1L);
    }

    @Test
    void getArticleById_WithInvalidId_ShouldReturnEmpty() {
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Article> result = articleService.getArticleById(999L);

        assertFalse(result.isPresent());
        verify(articleRepository).findById(999L);
    }

    @Test
    void getArticlesByAuthor_WithValidAuthorId_ShouldReturnArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testAuthor));
        when(articleRepository.findByAuthor(testAuthor)).thenReturn(articles);

        List<Article> result = articleService.getArticlesByAuthor(1L);

        assertEquals(1, result.size());
        assertEquals(testArticle.getTitle(), result.get(0).getTitle());
        verify(userRepository).findById(1L);
        verify(articleRepository).findByAuthor(testAuthor);
    }

    @Test
    void getArticlesByAuthor_WithInvalidAuthorId_ShouldThrowAuthorNotFoundException() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.getArticlesByAuthor(999L);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
        verify(userRepository).findById(999L);
        verify(articleRepository, never()).findByAuthor(any());
    }

    @Test
    void getArticlesByStatus_ShouldReturnArticlesWithStatus() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findByStatus(Article.Status.PUBLISHED)).thenReturn(articles);

        List<Article> result = articleService.getArticlesByStatus(Article.Status.PUBLISHED);

        assertEquals(1, result.size());
        assertEquals(Article.Status.PUBLISHED, result.get(0).getStatus());
        verify(articleRepository).findByStatus(Article.Status.PUBLISHED);
    }

    @Test
    void getPublishedArticles_ShouldReturnPublishedArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findPublishedArticlesOrderByCreatedAtDesc()).thenReturn(articles);

        List<Article> result = articleService.getPublishedArticles();

        assertEquals(1, result.size());
        assertEquals(Article.Status.PUBLISHED, result.get(0).getStatus());
        verify(articleRepository).findPublishedArticlesOrderByCreatedAtDesc();
    }

    @Test
    void searchArticlesByTitle_ShouldReturnMatchingArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findByTitleContaining("Test")).thenReturn(articles);

        List<Article> result = articleService.searchArticlesByTitle("Test");

        assertEquals(1, result.size());
        assertTrue(result.get(0).getTitle().contains("Test"));
        verify(articleRepository).findByTitleContaining("Test");
    }

    @Test
    void getArticlesByTag_ShouldReturnArticlesWithTag() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findByTagName("java")).thenReturn(articles);

        List<Article> result = articleService.getArticlesByTag("java");

        assertEquals(1, result.size());
        verify(articleRepository).findByTagName("java");
    }

    @Test
    void createArticle_WithValidArticle_ShouldReturnCreatedArticle() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testAuthor));
        when(articleRepository.save(any(Article.class))).thenReturn(testArticle);

        Article result = articleService.createArticle(testArticle);

        assertEquals(testArticle.getTitle(), result.getTitle());
        assertEquals(testAuthor.getId(), result.getAuthor().getId());
        verify(userRepository).findById(1L);
        verify(articleRepository).save(testArticle);
    }

    @Test
    void createArticle_WithNullAuthor_ShouldThrowAuthorNotFoundException() {
        testArticle.setAuthor(null);

        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.createArticle(testArticle);
        });

        assertEquals("Author is required", exception.getMessage());
        verify(articleRepository, never()).save(any());
    }

    @Test
    void createArticle_WithInvalidAuthorId_ShouldThrowAuthorNotFoundException() {
       testAuthor.setId(999l);
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        AuthorNotFoundException exception = assertThrows(AuthorNotFoundException.class, () -> {
            articleService.createArticle(testArticle);
        });

        assertEquals("Author not found with id: 999", exception.getMessage());
        verify(userRepository).findById(999L);
        verify(articleRepository, never()).save(any());
    }

    @Test
    void updateArticle_WithValidId_ShouldReturnUpdatedArticle() {
        Article updatedArticle = new Article();
        updatedArticle.setTitle("Updated Article");
        updatedArticle.setContent("Updated content");
        updatedArticle.setStatus(Article.Status.DRAFT);

        when(articleRepository.findById(1L)).thenReturn(Optional.of(testArticle));
        when(articleRepository.save(any(Article.class))).thenReturn(updatedArticle);

        Article result = articleService.updateArticle(1L, updatedArticle);

        assertEquals("Updated Article", result.getTitle());
        verify(articleRepository).findById(1L);
        verify(articleRepository).save(any(Article.class));
    }

    @Test
    void updateArticle_WithInvalidId_ShouldThrowArticleNotFoundException() {
        when(articleRepository.findById(999L)).thenReturn(Optional.empty());

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            articleService.updateArticle(999L, testArticle);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
        verify(articleRepository).findById(999L);
        verify(articleRepository, never()).save(any());
    }

    @Test
    void deleteArticle_WithValidId_ShouldDeleteArticle() {
        when(articleRepository.existsById(1L)).thenReturn(true);

        articleService.deleteArticle(1L);

        verify(articleRepository).existsById(1L);
        verify(articleRepository).deleteById(1L);
    }

    @Test
    void deleteArticle_WithInvalidId_ShouldThrowArticleNotFoundException() {
        when(articleRepository.existsById(999L)).thenReturn(false);

        ArticleNotFoundException exception = assertThrows(ArticleNotFoundException.class, () -> {
            articleService.deleteArticle(999L);
        });

        assertEquals("Article not found with id: 999", exception.getMessage());
        verify(articleRepository).existsById(999L);
        verify(articleRepository, never()).deleteById(any());
    }

    @Test
    void getArticlesByAuthorAndStatus_ShouldReturnArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testAuthor));
        when(articleRepository.findByAuthorAndStatus(testAuthor, Article.Status.PUBLISHED)).thenReturn(articles);

        List<Article> result = articleService.getArticlesByAuthorAndStatus(1L, Article.Status.PUBLISHED);

        assertEquals(1, result.size());
        verify(userRepository).findById(1L);
        verify(articleRepository).findByAuthorAndStatus(testAuthor, Article.Status.PUBLISHED);
    }

    @Test
    void countArticlesByAuthorAndStatus_ShouldReturnCount() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testAuthor));
        when(articleRepository.countByAuthorAndStatus(testAuthor, Article.Status.PUBLISHED)).thenReturn(5L);

        long result = articleService.countArticlesByAuthorAndStatus(1L, Article.Status.PUBLISHED);

        assertEquals(5L, result);
        verify(userRepository).findById(1L);
        verify(articleRepository).countByAuthorAndStatus(testAuthor, Article.Status.PUBLISHED);
    }

    @Test
    void getArticlesByTagId_ShouldReturnArticles() {
        List<Article> articles = Arrays.asList(testArticle);
        when(articleRepository.findByTagId(1L)).thenReturn(articles);

        List<Article> result = articleService.getArticlesByTagId(1L);

        assertEquals(1, result.size());
        verify(articleRepository).findByTagId(1L);
    }
}
