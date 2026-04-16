package com.dataeng.App.controller;

import com.dataeng.App.model.entity.FeaturedArticle;
import com.dataeng.App.services.FeaturedArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/featured-articles")
public class FeaturedArticleController {

    @Autowired
    private FeaturedArticleService featuredArticleService;

    @GetMapping
    public ResponseEntity<List<FeaturedArticle>> getAllFeaturedArticles() {
        List<FeaturedArticle> featuredArticles = featuredArticleService.getAllFeaturedArticles();
        return ResponseEntity.ok(featuredArticles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FeaturedArticle> getFeaturedArticleById(@PathVariable Long id) {
        Optional<FeaturedArticle> featuredArticle = featuredArticleService.getFeaturedArticleById(id);
        return featuredArticle.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/article/{articleId}")
    public ResponseEntity<FeaturedArticle> getFeaturedArticleByArticleId(@PathVariable Long articleId) {
        Optional<FeaturedArticle> featuredArticle = featuredArticleService.getFeaturedArticleByArticleId(articleId);
        return featuredArticle.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/active")
    public ResponseEntity<List<FeaturedArticle>> getActiveFeaturedArticles() {
        List<FeaturedArticle> featuredArticles = featuredArticleService.getActiveFeaturedArticles();
        return ResponseEntity.ok(featuredArticles);
    }

    @GetMapping("/active/ordered")
    public ResponseEntity<List<FeaturedArticle>> getActiveFeaturedArticlesOrdered() {
        List<FeaturedArticle> featuredArticles = featuredArticleService.getActiveFeaturedArticlesOrdered();
        return ResponseEntity.ok(featuredArticles);
    }

    @GetMapping("/order/{order}")
    public ResponseEntity<FeaturedArticle> getFeaturedArticleByOrder(@PathVariable Integer order) {
        Optional<FeaturedArticle> featuredArticle = featuredArticleService.getFeaturedArticleByOrder(order);
        return featuredArticle.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/max-order")
    public ResponseEntity<Integer> getMaxFeaturedOrder() {
        Integer maxOrder = featuredArticleService.getMaxFeaturedOrder();
        return ResponseEntity.ok(maxOrder);
    }

    @PostMapping
    public ResponseEntity<FeaturedArticle> createFeaturedArticle(@RequestBody FeaturedArticle featuredArticle) {
        try {
            FeaturedArticle savedFeaturedArticle = featuredArticleService.createFeaturedArticle(featuredArticle);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedFeaturedArticle);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Article is required") || e.getMessage().contains("Article not found")) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<FeaturedArticle> updateFeaturedArticle(@PathVariable Long id, @RequestBody FeaturedArticle featuredArticleDetails) {
        try {
            FeaturedArticle updatedFeaturedArticle = featuredArticleService.updateFeaturedArticle(id, featuredArticleDetails);
            return ResponseEntity.ok(updatedFeaturedArticle);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Featured article not found") || e.getMessage().contains("Article not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeaturedArticle(@PathVariable Long id) {
        try {
            featuredArticleService.deleteFeaturedArticle(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/exists/article/{articleId}")
    public ResponseEntity<Boolean> checkArticleExistsInFeatured(@PathVariable Long articleId) {
        boolean exists = featuredArticleService.existsByArticleId(articleId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/article/{articleId}")
    public ResponseEntity<FeaturedArticle> createFeaturedArticleForArticle(
            @PathVariable Long articleId, 
            @RequestBody FeaturedArticle featuredArticle) {
        try {
            FeaturedArticle savedFeaturedArticle = featuredArticleService.createFeaturedArticleForArticle(articleId, featuredArticle);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedFeaturedArticle);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Article not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
