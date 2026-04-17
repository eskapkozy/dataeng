package com.dataeng.App.repository;

import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ArticleRepository extends JpaRepository<Article, Long> {
    
    List<Article> findByAuthor(User author);
    
    List<Article> findByAuthorId(Long authorId);
    
    List<Article> findByStatus(Article.Status status);
    
    List<Article> findByAuthorAndStatus(User author, Article.Status status);
    
    @Query("SELECT a FROM Article a WHERE a.title LIKE %:title%")
    List<Article> findByTitleContaining(@Param("title") String title);
    
    @Query("SELECT a FROM Article a WHERE a.status = :status ORDER BY a.createdAt DESC")
    List<Article> findByStatusOrderByCreatedAtDesc(@Param("status") Article.Status status);
    
    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.name = :tagName")
    List<Article> findByTagName(@Param("tagName") String tagName);
    
    @Query("SELECT a FROM Article a JOIN a.tags t WHERE t.id = :tagId")
    List<Article> findByTagId(@Param("tagId") Long tagId);
    
    @Query("SELECT a FROM Article a WHERE a.status = 'PUBLISHED' ORDER BY a.createdAt DESC")
    List<Article> findPublishedArticlesOrderByCreatedAtDesc();
    
    @Query("SELECT COUNT(a) FROM Article a WHERE a.author = :author AND a.status = :status")
    long countByAuthorAndStatus(@Param("author") User author, @Param("status") Article.Status status);
    
    @Query("SELECT CASE WHEN COUNT(a) > 0 THEN true ELSE false END FROM Article a WHERE a.title = :title AND a.author = :author")
    boolean existsByTitleAndAuthor(@Param("title") String title, @Param("author") User author);
}
