package com.dataeng.App.controller;

import com.dataeng.App.model.entity.Article;
import com.dataeng.App.services.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public ResponseEntity<List<Article>> getAllArticles() {
        List<Article> articles = articleService.getAllArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Article> getArticleById(@PathVariable Long id) {
        Optional<Article> article = articleService.getArticleById(id);
        return article.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/author/{authorId}")
    public ResponseEntity<List<Article>> getArticlesByAuthor(@PathVariable Long authorId) {
        try {
            List<Article> articles = articleService.getArticlesByAuthor(authorId);
            return ResponseEntity.ok(articles);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Article>> getArticlesByStatus(@PathVariable Article.Status status) {
        List<Article> articles = articleService.getArticlesByStatus(status);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/published")
    public ResponseEntity<List<Article>> getPublishedArticles() {
        List<Article> articles = articleService.getPublishedArticles();
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/search")
    public ResponseEntity<List<Article>> searchArticlesByTitle(@RequestParam String title) {
        List<Article> articles = articleService.searchArticlesByTitle(title);
        return ResponseEntity.ok(articles);
    }

    @GetMapping("/tag/{tagName}")
    public ResponseEntity<List<Article>> getArticlesByTag(@PathVariable String tagName) {
        List<Article> articles = articleService.getArticlesByTag(tagName);
        return ResponseEntity.ok(articles);
    }

    @PostMapping
    public ResponseEntity<Article> createArticle(@RequestBody Article article) {
        try {
            Article savedArticle = articleService.createArticle(article);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedArticle);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Author is required") || e.getMessage().contains("Author not found")) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Article> updateArticle(@PathVariable Long id, @RequestBody Article articleDetails) {
        try {
            Article updatedArticle = articleService.updateArticle(id, articleDetails);
            return ResponseEntity.ok(updatedArticle);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Article not found") || e.getMessage().contains("Author not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteArticle(@PathVariable Long id) {
        try {
            articleService.deleteArticle(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/author/{authorId}/status/{status}")
    public ResponseEntity<List<Article>> getArticlesByAuthorAndStatus(
            @PathVariable Long authorId, 
            @PathVariable Article.Status status) {
        try {
            List<Article> articles = articleService.getArticlesByAuthorAndStatus(authorId, status);
            return ResponseEntity.ok(articles);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/count/author/{authorId}/status/{status}")
    public ResponseEntity<Long> countArticlesByAuthorAndStatus(
            @PathVariable Long authorId, 
            @PathVariable Article.Status status) {
        try {
            long count = articleService.countArticlesByAuthorAndStatus(authorId, status);
            return ResponseEntity.ok(count);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
