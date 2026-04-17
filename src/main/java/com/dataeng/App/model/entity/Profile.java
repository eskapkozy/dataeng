package com.dataeng.App.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.validator.constraints.URL;

import java.time.LocalDateTime;

@Entity
@Table(name = "profiles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;
    
    @Column(length = 1000)
    @Size(max = 2000, min = 50)
    private String bio;
    
    @Column(name = "linkedin_url", length = 255)
    @URL
    @Size(max = 255)
    private String linkedinUrl;
    
    @Column(name = "twitter_url", length = 255)
    @URL
    @Size(max = 255)
    private String twitterUrl;
    
    @Column(name = "github_url", length = 255)
    @URL
    @Size(max = 255)
    private String githubUrl;
    
    @Column(name = "website_url", length = 255)
    @URL
    @Size(max = 255)
    private String websiteUrl;
    
    @Column(name = "profile_image_url", length = 500)
    @URL
    @Size(max = 255)
    private String profileImageUrl;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
