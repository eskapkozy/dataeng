package com.dataeng.App.repository;

import com.dataeng.App.model.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long> {
    
    Optional<Tag> findByName(String name);
    
    boolean existsByName(String name);
    
    @Query("SELECT t FROM Tag t WHERE t.name LIKE %:name%")
    List<Tag> findByNameContaining(@Param("name") String name);
    
    @Query("SELECT t FROM Tag t JOIN t.articles a GROUP BY t.id ORDER BY COUNT(a) DESC")
    List<Tag> findMostUsedTags();
    
    @Query("SELECT t FROM Tag t WHERE SIZE(t.articles) > :minArticles")
    List<Tag> findByMinArticlesCount(@Param("minArticles") int minArticles);
    
    @Query("SELECT COUNT(a) FROM Tag t JOIN t.articles a WHERE t.id = :tagId")
    long countArticlesByTagId(@Param("tagId") Long tagId);
}
