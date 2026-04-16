package com.dataeng.App.repository;

import com.dataeng.App.model.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByUsername(String username);
    
    Optional<User> findByEmail(String email);
    
    boolean existsByUsername(String username);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.role = :role")
    java.util.List<User> findByRole(@Param("role") User.Role role);
    
    @Query("SELECT u FROM User u WHERE u.role IN :roles")
    java.util.List<User> findByRoleIn(@Param("roles") java.util.List<User.Role> roles);
}
