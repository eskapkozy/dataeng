package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.ArticleAlreadyFeaturedException;
import com.dataeng.App.exception.FeaturedArticleNotFoundException;
import com.dataeng.App.exception.InvalidArticleStatusException;
import com.dataeng.App.exception.FeaturedLimitExceededException;
import com.dataeng.App.exception.DuplicateFeaturedOrderException;
import com.dataeng.App.model.entity.FeaturedArticle;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.repository.FeaturedArticleRepository;
import com.dataeng.App.repository.ArticleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FeaturedArticleService {

    @Autowired
    private FeaturedArticleRepository featuredArticleRepository;

    @Autowired
    private ArticleRepository articleRepository;

    public List<FeaturedArticle> getAllFeaturedArticles() {
        return featuredArticleRepository.findAll();
    }

    public Optional<FeaturedArticle> getFeaturedArticleById(Long id) {
        return featuredArticleRepository.findById(id);
    }

    public Optional<FeaturedArticle> getFeaturedArticleByArticleId(Long articleId) {
        return featuredArticleRepository.findByArticleId(articleId);
    }

    public List<FeaturedArticle> getActiveFeaturedArticles() {
        return featuredArticleRepository.findByIsActive(true);
    }

    public List<FeaturedArticle> getActiveFeaturedArticlesOrdered() {
        return featuredArticleRepository.findActiveFeaturedArticlesOrderByOrder();
    }

    public Optional<FeaturedArticle> getFeaturedArticleByOrder(Integer order) {
        return featuredArticleRepository.findByFeaturedOrderAndIsActive(order);
    }

    public Integer getMaxFeaturedOrder() {
        return featuredArticleRepository.findMaxFeaturedOrder();
    }

    public FeaturedArticle createFeaturedArticle(FeaturedArticle featuredArticle) {
        // 1. Vérifier que l'article existe via articleRepository.findById()
        if (featuredArticle.getArticle() == null || featuredArticle.getArticle().getId() == null) {
            throw new ArticleNotFoundException("Article is required");
        }

        Optional<Article> article = articleRepository.findById(featuredArticle.getArticle().getId());
        if (article.isEmpty()) {
            throw new ArticleNotFoundException("Article not found with id: " + featuredArticle.getArticle().getId());
        }

        // 2. Vérifier que l'article a le statut PUBLISHED
        if (article.get().getStatus() != Article.Status.PUBLISHED) {
            throw new InvalidArticleStatusException("Only PUBLISHED articles can be featured");
        }

        // 3. Vérifier que le nombre d'articles featured actifs (isActive == true) ne dépasse pas 10
        long activeFeaturedCount = featuredArticleRepository.countByIsActiveTrue();
        if (activeFeaturedCount >= 10) {
            throw new FeaturedLimitExceededException("Maximum of 10 featured articles allowed");
        }

        // 4. Vérifier que l'ordre (featuredOrder) n'est pas déjà utilisé parmi les featured actifs
        if (featuredArticle.getFeaturedOrder() != null && 
            featuredArticleRepository.existsByFeaturedOrderAndIsActiveTrue(featuredArticle.getFeaturedOrder())) {
            throw new DuplicateFeaturedOrderException("Featured order " + featuredArticle.getFeaturedOrder() + " is already taken");
        }

        // 5. Sauvegarder le featured article
        featuredArticle.setArticle(article.get());
        return featuredArticleRepository.save(featuredArticle);
    }

    public FeaturedArticle updateFeaturedArticle(Long id, FeaturedArticle featuredArticleDetails) {
        Optional<FeaturedArticle> existingFeaturedArticle = featuredArticleRepository.findById(id);
        if (existingFeaturedArticle.isEmpty()) {
            throw new FeaturedArticleNotFoundException("Featured article not found with id: " + id);
        }

        FeaturedArticle featuredArticle = existingFeaturedArticle.get();

        if (featuredArticleDetails.getArticle() != null && featuredArticleDetails.getArticle().getId() != null) {
            Optional<Article> article = articleRepository.findById(featuredArticleDetails.getArticle().getId());
            if (article.isEmpty()) {
                throw new ArticleNotFoundException("Article not found with id: " + featuredArticleDetails.getArticle().getId());
            }
            if (!featuredArticle.getArticle().getId().equals(featuredArticleDetails.getArticle().getId()) &&
                featuredArticleRepository.existsByArticle(article.get())) {
                throw new ArticleAlreadyFeaturedException("Article is already featured");
            }
            featuredArticle.setArticle(article.get());
        }

        featuredArticle.setFeaturedOrder(featuredArticleDetails.getFeaturedOrder());
        featuredArticle.setIsActive(featuredArticleDetails.getIsActive());

        return featuredArticleRepository.save(featuredArticle);
    }

    public void deleteFeaturedArticle(Long id) {
        if (!featuredArticleRepository.existsById(id)) {
            throw new FeaturedArticleNotFoundException("Featured article not found with id: " + id);
        }
        featuredArticleRepository.deleteById(id);
    }

    public boolean existsByArticleId(Long articleId) {
        return featuredArticleRepository.existsByArticleId(articleId);
    }

    public FeaturedArticle createFeaturedArticleForArticle(Long articleId, FeaturedArticle featuredArticle) {
        Optional<Article> article = articleRepository.findById(articleId);
        if (article.isEmpty()) {
            throw new ArticleNotFoundException("Article not found with id: " + articleId);
        }

        if (featuredArticleRepository.existsByArticle(article.get())) {
            throw new ArticleAlreadyFeaturedException("Article is already featured");
        }

        featuredArticle.setArticle(article.get());
        return featuredArticleRepository.save(featuredArticle);
    }
}
