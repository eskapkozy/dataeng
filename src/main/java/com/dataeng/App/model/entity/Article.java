package com.dataeng.App.model.entity;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "articles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Article {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    @NotNull
    @NotBlank
    @Size(min = 5, max = 200)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    @NotNull
    @NotBlank
    @Size(min = 50, max = 50000)
    private String content;
    
    @Column(length = 500)
    @Size(max = 500)
    private String excerpt;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Status status = Status.DRAFT;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id", nullable = false)
    private User author;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "article_tags",
        joinColumns = @JoinColumn(name = "article_id"),
        inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    @Valid
    @Size(max = 10)
    private Set<Tag> tags = new HashSet<>();
    
    @OneToOne(mappedBy = "article", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private FeaturedArticle featuredArticle;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public enum Status {
        DRAFT, PUBLISHED
    }
}
