package com.dataeng.App.controller;

import com.dataeng.App.model.entity.Profile;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.services.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/profiles")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<List<Profile>> getAllProfiles() {
        List<Profile> profiles = profileService.getAllProfiles();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Profile> getProfileById(@PathVariable Long id) {
        Optional<Profile> profile = profileService.getProfileById(id);
        return profile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Profile> getProfileByUserId(@PathVariable Long userId) {
        Optional<Profile> profile = profileService.getProfileByUserId(userId);
        return profile.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/with-bio")
    public ResponseEntity<List<Profile>> getProfilesWithBio() {
        List<Profile> profiles = profileService.getProfilesWithBio();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/with-social-links")
    public ResponseEntity<List<Profile>> getProfilesWithSocialLinks() {
        List<Profile> profiles = profileService.getProfilesWithSocialLinks();
        return ResponseEntity.ok(profiles);
    }

    @GetMapping("/role/{role}")
    public ResponseEntity<List<Profile>> getProfilesByUserRole(@PathVariable User.Role role) {
        List<Profile> profiles = profileService.getProfilesByUserRole(role);
        return ResponseEntity.ok(profiles);
    }

    @PostMapping
    public ResponseEntity<Profile> createProfile(@RequestBody Profile profile) {
        try {
            Profile savedProfile = profileService.createProfile(profile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("User is required") || e.getMessage().contains("User not found")) {
                return ResponseEntity.badRequest().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Profile> updateProfile(@PathVariable Long id, @RequestBody Profile profileDetails) {
        try {
            Profile updatedProfile = profileService.updateProfile(id, profileDetails);
            return ResponseEntity.ok(updatedProfile);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("Profile not found") || e.getMessage().contains("User not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable Long id) {
        try {
            profileService.deleteProfile(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/exists/user/{userId}")
    public ResponseEntity<Boolean> checkProfileExistsByUserId(@PathVariable Long userId) {
        boolean exists = profileService.existsByUserId(userId);
        return ResponseEntity.ok(exists);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<Profile> createProfileForUser(@PathVariable Long userId, @RequestBody Profile profile) {
        try {
            Profile savedProfile = profileService.createProfileForUser(userId, profile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProfile);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("User not found")) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }
}
