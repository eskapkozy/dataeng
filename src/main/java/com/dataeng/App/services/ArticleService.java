package com.dataeng.App.services;

import com.dataeng.App.exception.ArticleNotFoundException;
import com.dataeng.App.exception.AuthorNotFoundException;
import com.dataeng.App.model.entity.Article;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ArticleRepository;
import com.dataeng.App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Article> getAllArticles() {
        return articleRepository.findAll();
    }

    public Optional<Article> getArticleById(Long id) {
        return articleRepository.findById(id);
    }

    public List<Article> getArticlesByAuthor(Long authorId) {
        Optional<User> author = userRepository.findById(authorId);
        if (author.isEmpty()) {
            throw new AuthorNotFoundException("Author not found with id: " + authorId);
        }
        return articleRepository.findByAuthor(author.get());
    }

    public List<Article> getArticlesByStatus(Article.Status status) {
        return articleRepository.findByStatus(status);
    }

    public List<Article> getPublishedArticles() {
        return articleRepository.findPublishedArticlesOrderByCreatedAtDesc();
    }

    public List<Article> searchArticlesByTitle(String title) {
        return articleRepository.findByTitleContaining(title);
    }

    public List<Article> getArticlesByTag(String tagName) {
        return articleRepository.findByTagName(tagName);
    }

    public Article createArticle(Article article) {
        if (article.getAuthor() == null || article.getAuthor().getId() == null) {
            throw new AuthorNotFoundException("Author is required");
        }

        Optional<User> author = userRepository.findById(article.getAuthor().getId());
        if (author.isEmpty()) {
            throw new AuthorNotFoundException("Author not found with id: " + article.getAuthor().getId());
        }

        article.setAuthor(author.get());
        return articleRepository.save(article);
    }

    public Article updateArticle(Long id, Article articleDetails) {
        Optional<Article> existingArticle = articleRepository.findById(id);
        if (existingArticle.isEmpty()) {
            throw new ArticleNotFoundException("Article not found with id: " + id);
        }

        Article article = existingArticle.get();

        if (articleDetails.getAuthor() != null && articleDetails.getAuthor().getId() != null) {
            Optional<User> author = userRepository.findById(articleDetails.getAuthor().getId());
            if (author.isEmpty()) {
                throw new AuthorNotFoundException("Author not found with id: " + articleDetails.getAuthor().getId());
            }
            article.setAuthor(author.get());
        }

        article.setTitle(articleDetails.getTitle());
        article.setContent(articleDetails.getContent());
        article.setExcerpt(articleDetails.getExcerpt());
        article.setStatus(articleDetails.getStatus());
        article.setTags(articleDetails.getTags());

        return articleRepository.save(article);
    }

    public void deleteArticle(Long id) {
        if (!articleRepository.existsById(id)) {
            throw new ArticleNotFoundException("Article not found with id: " + id);
        }
        articleRepository.deleteById(id);
    }

    public List<Article> getArticlesByAuthorAndStatus(Long authorId, Article.Status status) {
        Optional<User> author = userRepository.findById(authorId);
        if (author.isEmpty()) {
            throw new AuthorNotFoundException("Author not found with id: " + authorId);
        }
        return articleRepository.findByAuthorAndStatus(author.get(), status);
    }

    public long countArticlesByAuthorAndStatus(Long authorId, Article.Status status) {
        Optional<User> author = userRepository.findById(authorId);
        if (author.isEmpty()) {
            throw new AuthorNotFoundException("Author not found with id: " + authorId);
        }
        return articleRepository.countByAuthorAndStatus(author.get(), status);
    }

    public List<Article> getArticlesByTagId(Long tagId) {
        return articleRepository.findByTagId(tagId);
    }
}
