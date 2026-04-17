package com.dataeng.App.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "featured_articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeaturedArticle {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "article_id", nullable = false, unique = true)
    private Article article;
    
    @Column(name = "featured_order", nullable = false)
    @NotNull
    @Min(1)
    @Max(100)
    private Integer featuredOrder;
    
    @Column(name = "is_active", nullable = false)
    @NotNull
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
