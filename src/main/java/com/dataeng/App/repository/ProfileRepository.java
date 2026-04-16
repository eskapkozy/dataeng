package com.dataeng.App.repository;

import com.dataeng.App.model.entity.Profile;
import com.dataeng.App.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    
    Optional<Profile> findByUser(User user);
    
    Optional<Profile> findByUserId(Long userId);
    
    boolean existsByUser(User user);
    
    boolean existsByUserId(Long userId);
    
    @Query("SELECT p FROM Profile p WHERE p.bio IS NOT NULL AND p.bio != ''")
    java.util.List<Profile> findProfilesWithBio();
    
    @Query("SELECT p FROM Profile p WHERE p.linkedinUrl IS NOT NULL OR p.twitterUrl IS NOT NULL OR p.githubUrl IS NOT NULL OR p.websiteUrl IS NOT NULL")
    java.util.List<Profile> findProfilesWithSocialLinks();
    
    @Query("SELECT p FROM Profile p WHERE p.user.role = :role")
    java.util.List<Profile> findByUserRole(@Param("role") User.Role role);
}
