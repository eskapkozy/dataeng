package com.dataeng.App.repository;

import com.dataeng.App.model.entity.FeaturedArticle;
import com.dataeng.App.model.entity.Article;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FeaturedArticleRepository extends JpaRepository<FeaturedArticle, Long> {
    
    Optional<FeaturedArticle> findByArticle(Article article);
    
    Optional<FeaturedArticle> findByArticleId(Long articleId);
    
    List<FeaturedArticle> findByIsActive(Boolean isActive);
    
    @Query("SELECT f FROM FeaturedArticle f WHERE f.isActive = true ORDER BY f.featuredOrder ASC")
    List<FeaturedArticle> findActiveFeaturedArticlesOrderByOrder();
    
    @Query("SELECT f FROM FeaturedArticle f WHERE f.isActive = true ORDER BY f.featuredOrder ASC")
    List<FeaturedArticle> findActiveByOrderByFeaturedOrderAsc();
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FeaturedArticle f WHERE f.article = :article")
    boolean existsByArticle(@Param("article") Article article);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM FeaturedArticle f WHERE f.article.id = :articleId")
    boolean existsByArticleId(@Param("articleId") Long articleId);
    
    @Query("SELECT MAX(f.featuredOrder) FROM FeaturedArticle f WHERE f.isActive = true")
    Integer findMaxFeaturedOrder();
    
    @Query("SELECT f FROM FeaturedArticle f WHERE f.featuredOrder = :order AND f.isActive = true")
    Optional<FeaturedArticle> findByFeaturedOrderAndIsActive(@Param("order") Integer order);
}
