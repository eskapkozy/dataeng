package com.dataeng.App.services;

import com.dataeng.App.exception.ProfileAlreadyExistsException;
import com.dataeng.App.exception.ProfileNotFoundException;
import com.dataeng.App.exception.UserNotFoundException;
import com.dataeng.App.model.entity.Profile;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ProfileRepository;
import com.dataeng.App.repository.UserRepository;
import jakarta.validation.ConstraintViolationException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
@Transactional
class ProfileServiceIntegrationTest {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("dataengDb")
            .withUsername("testuser")
            .withPassword("testpass");

    @DynamicPropertySource
    static void configure(DynamicPropertyRegistry registry) {
        registry.add("spring.datasource.url", () -> postgres.getJdbcUrl());
        registry.add("spring.datasource.username", () -> postgres.getUsername());
        registry.add("spring.datasource.password", () -> postgres.getPassword());
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "create-drop");
    }

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProfileService profileService;

    private User testUser;
    private Profile testProfile;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUsername("testuser1234"); // plus de 3 caractères
        testUser.setEmail("testuser@example.com"); // adresse valide
        testUser.setPassword("TestPass123!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        testUser.setRole(User.Role.USER);
        testUser = userRepository.save(testUser);

        testProfile = new Profile();
        testProfile.setUser(testUser);
        testProfile.setBio("Test bio");
        testProfile.setLinkedinUrl("https://linkedin.com/in/testuser");
        testProfile.setTwitterUrl("https://twitter.com/testuser");
        testProfile.setGithubUrl("https://github.com/testuser");
        testProfile.setWebsiteUrl("https://testuser.com");
        testProfile.setProfileImageUrl("https://testuser.com/profile.jpg");
    }

    @Test
    void getAllProfiles_ShouldReturnAllProfiles() {
        profileRepository.save(testProfile);

        List<Profile> result = profileService.getAllProfiles();

        assertEquals(1, result.size());
        assertEquals(testProfile.getBio(), result.get(0).getBio());
    }

    @Test
    void getProfileById_WithValidId_ShouldReturnProfile() {
        Profile savedProfile = profileRepository.save(testProfile);

        Optional<Profile> result = profileService.getProfileById(savedProfile.getId());

        assertTrue(result.isPresent());
        assertEquals(testProfile.getBio(), result.get().getBio());
    }

    @Test
    void getProfileById_WithInvalidId_ShouldReturnEmpty() {
        Optional<Profile> result = profileService.getProfileById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getProfileByUserId_WithValidUserId_ShouldReturnProfile() {
        profileRepository.save(testProfile);

        Optional<Profile> result = profileService.getProfileByUserId(testUser.getId());

        assertTrue(result.isPresent());
        assertEquals(testProfile.getBio(), result.get().getBio());
    }

    @Test
    void getProfilesWithBio_ShouldReturnProfilesWithBio() {
        profileRepository.save(testProfile);

        List<Profile> result = profileService.getProfilesWithBio();

        assertEquals(1, result.size());
        assertEquals(testProfile.getBio(), result.get(0).getBio());
    }

    @Test
    void getProfilesWithSocialLinks_ShouldReturnProfilesWithSocialLinks() {
        profileRepository.save(testProfile);

        List<Profile> result = profileService.getProfilesWithSocialLinks();

        assertEquals(1, result.size());
        assertEquals(testProfile.getLinkedinUrl(), result.get(0).getLinkedinUrl());
    }

    @Test
    void getProfilesByUserRole_ShouldReturnProfilesWithUserRole() {
        profileRepository.save(testProfile);

        List<Profile> result = profileService.getProfilesByUserRole(User.Role.USER);

        assertEquals(1, result.size());
        assertEquals(User.Role.USER, result.get(0).getUser().getRole());
    }

    @Test
    void createProfile_WithValidProfile_ShouldReturnCreatedProfile() {
        Profile result = profileService.createProfile(testProfile);

        assertNotNull(result.getId());
        assertEquals(testProfile.getBio(), result.getBio());
        assertEquals(testProfile.getUser().getId(), result.getUser().getId());
    }

    @Test
    void createProfile_WithNullUser_ShouldThrowUserNotFoundException() {
        testProfile.setUser(null);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("User is required", exception.getMessage());
    }

    @Test
    void createProfile_WithNullUserId_ShouldThrowUserNotFoundException() {
        User userWithNullId = new User();
        userWithNullId.setId(null);
        testProfile.setUser(userWithNullId);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("User is required", exception.getMessage());
    }

    @Test
    void createProfile_WithInvalidUserId_ShouldThrowUserNotFoundException() {
        User invalidUser = new User();
        invalidUser.setId(999L);
        testProfile.setUser(invalidUser);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
    }

    @Test
    void createProfile_WithExistingProfileForUser_ShouldThrowProfileAlreadyExistsException() {
        profileRepository.save(testProfile);

        Profile newProfile = new Profile();
        newProfile.setUser(testUser);
        newProfile.setBio("Different bio");

        ProfileAlreadyExistsException exception = assertThrows(ProfileAlreadyExistsException.class, () -> {
            profileService.createProfile(newProfile);
        });

        assertEquals("Profile already exists for this user", exception.getMessage());
    }

    @Test
    void updateProfile_WithValidId_ShouldReturnUpdatedProfile() {
        Profile savedProfile = profileRepository.save(testProfile);

        Profile updatedProfile = new Profile();
        updatedProfile.setBio("Updated bio");
        updatedProfile.setLinkedinUrl("https://linkedin.com/in/updateduser");
        updatedProfile.setTwitterUrl("https://twitter.com/updateduser");
        updatedProfile.setGithubUrl("https://github.com/updateduser");
        updatedProfile.setWebsiteUrl("https://updateduser.com");
        updatedProfile.setProfileImageUrl("https://updateduser.com/profile.jpg");

        Profile result = profileService.updateProfile(savedProfile.getId(), updatedProfile);

        assertEquals("Updated bio", result.getBio());
        assertEquals("https://linkedin.com/in/updateduser", result.getLinkedinUrl());
    }

    @Test
    void updateProfile_WithInvalidId_ShouldThrowProfileNotFoundException() {
        Profile updatedProfile = new Profile();
        updatedProfile.setBio("Updated bio");

        ProfileNotFoundException exception = assertThrows(ProfileNotFoundException.class, () -> {
            profileService.updateProfile(999L, updatedProfile);
        });

        assertEquals("Profile not found with id: 999", exception.getMessage());
    }

    @Test
    void deleteProfile_WithValidId_ShouldDeleteProfile() {
        Profile savedProfile = profileRepository.save(testProfile);

        profileService.deleteProfile(savedProfile.getId());

        assertFalse(profileRepository.existsById(savedProfile.getId()));
    }

    @Test
    void deleteProfile_WithInvalidId_ShouldThrowProfileNotFoundException() {
        ProfileNotFoundException exception = assertThrows(ProfileNotFoundException.class, () -> {
            profileService.deleteProfile(999L);
        });

        assertEquals("Profile not found with id: 999", exception.getMessage());
    }

    @Test
    void existsByUserId_ShouldReturnTrueIfExists() {
        profileRepository.save(testProfile);

        boolean result = profileService.existsByUserId(testUser.getId());

        assertTrue(result);
    }

    @Test
    void existsByUserId_ShouldReturnFalseIfNotExists() {
        boolean result = profileService.existsByUserId(999L);

        assertFalse(result);
    }

    @Test
    void createProfileForUser_WithValidUserId_ShouldReturnCreatedProfile() {
        User newUser = new User();
        newUser.setUsername("newuser");
        newUser.setEmail("newuser@example.com");
        newUser.setPassword("passworD1234!");
        newUser.setRole(User.Role.USER);
        newUser = userRepository.save(newUser);

        Profile newProfile = new Profile();
        newProfile.setBio("New user bio");

        Profile result = profileService.createProfileForUser(newUser.getId(), newProfile);

        assertNotNull(result.getId());
        assertEquals("New user bio", result.getBio());
        assertEquals(newUser.getId(), result.getUser().getId());
    }

    @Test
    void createProfileForUser_WithInvalidUserId_ShouldThrowUserNotFoundException() {
        Profile newProfile = new Profile();
        newProfile.setBio("New user bio");

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfileForUser(999L, newProfile);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
    }

    @Test
    void createProfileForUser_WithExistingProfileForUser_ShouldThrowProfileAlreadyExistsException() {
        profileRepository.save(testProfile);

        Profile newProfile = new Profile();
        newProfile.setBio("Different bio");

        ProfileAlreadyExistsException exception = assertThrows(ProfileAlreadyExistsException.class, () -> {
            profileService.createProfileForUser(testUser.getId(), newProfile);
        });

        assertEquals("Profile already exists for this user", exception.getMessage());
    }

    // ========== Tests de validation Jakarta ==========

    @Test
    void createProfile_WithLongBio_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setBio("a".repeat(2050)); // Plus de 1000 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
            profileRepository.flush();
        });

        assertTrue(exception.getMessage().contains("bio"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithLongLinkedinUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setLinkedinUrl("https://linkedin.com/in/" + "a".repeat(300)); // Plus de 255 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("linkedinUrl"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithInvalidLinkedinUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setLinkedinUrl("not-a-valid-url"); // URL invalide

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });


        assertTrue(exception.getMessage().contains("linkedinUrl"));
        assertTrue(exception.getMessage().contains("doit être une URL valide"));
    }

    @Test
    void createProfile_WithLongTwitterUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setTwitterUrl("https://twitter.com/" + "a".repeat(300)); // Plus de 255 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("twitterUrl"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithInvalidTwitterUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setTwitterUrl("not-a-valid-url"); // URL invalide

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("twitterUrl"));
        assertTrue(exception.getMessage().contains("doit être une URL valide"));
    }

    @Test
    void createProfile_WithLongGithubUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setGithubUrl("https://github.com/" + "a".repeat(300)); // Plus de 255 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("githubUrl"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithInvalidGithubUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setGithubUrl("not-a-valid-url"); // URL invalide

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("githubUrl"));
        assertTrue(exception.getMessage().contains("doit être une URL valide"));
    }

    @Test
    void createProfile_WithLongWebsiteUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setWebsiteUrl("https://website.com/" + "a".repeat(300)); // Plus de 255 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("websiteUrl"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithInvalidWebsiteUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setWebsiteUrl("not-a-valid-url"); // URL invalide

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("websiteUrl"));
        assertTrue(exception.getMessage().contains("doit être une URL valide"));
    }

    @Test
    void createProfile_WithLongProfileImageUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setProfileImageUrl("https://example.com/image/" + "a".repeat(600)); // Plus de 500 caractères

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("profileImageUrl"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithInvalidProfileImageUrl_ShouldThrowConstraintViolationException() {
        Profile invalidProfile = new Profile();
        invalidProfile.setUser(testUser);
        invalidProfile.setProfileImageUrl("not-a-valid-url"); // URL invalide

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.createProfile(invalidProfile);
        });

        assertTrue(exception.getMessage().contains("profileImageUrl"));
        assertTrue(exception.getMessage().contains("doit être une URL valide"));
    }

    @Test
    void updateProfile_WithInvalidData_ShouldThrowConstraintViolationException() {
        Profile savedProfile = profileRepository.save(testProfile);

        Profile updatedProfile = new Profile();
        updatedProfile.setBio("a".repeat(2051)); // Bio trop longue

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            profileService.updateProfile(savedProfile.getId(), updatedProfile);
        });

        assertTrue(exception.getMessage().contains("bio"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createProfile_WithValidUrls_ShouldSucceed() {
        Profile validProfile = new Profile();
        validProfile.setUser(testUser);
        validProfile.setBio("Valid bio content");
        validProfile.setLinkedinUrl("https://linkedin.com/in/testuser");
        validProfile.setTwitterUrl("https://twitter.com/testuser");
        validProfile.setGithubUrl("https://github.com/testuser");
        validProfile.setWebsiteUrl("https://testuser.com");
        validProfile.setProfileImageUrl("https://testuser.com/profile.jpg");

        Profile result = profileService.createProfile(validProfile);

        assertNotNull(result.getId());
        assertEquals("Valid bio content", result.getBio());
        assertEquals("https://linkedin.com/in/testuser", result.getLinkedinUrl());
        assertEquals("https://twitter.com/testuser", result.getTwitterUrl());
        assertEquals("https://github.com/testuser", result.getGithubUrl());
        assertEquals("https://testuser.com", result.getWebsiteUrl());
        assertEquals("https://testuser.com/profile.jpg", result.getProfileImageUrl());
    }

    @Test
    void createProfile_WithNullUrls_ShouldSucceed() {
        Profile validProfile = new Profile();
        validProfile.setUser(testUser);
        validProfile.setBio("Valid bio content");
        validProfile.setLinkedinUrl(null);
        validProfile.setTwitterUrl(null);
        validProfile.setGithubUrl(null);
        validProfile.setWebsiteUrl(null);
        validProfile.setProfileImageUrl(null);

        Profile result = profileService.createProfile(validProfile);

        assertNotNull(result.getId());
        assertEquals("Valid bio content", result.getBio());
        assertNull(result.getLinkedinUrl());
        assertNull(result.getTwitterUrl());
        assertNull(result.getGithubUrl());
        assertNull(result.getWebsiteUrl());
        assertNull(result.getProfileImageUrl());
    }

    @Test
    void createProfile_WithEmptyUrls_ShouldSucceed() {
        Profile validProfile = new Profile();
        validProfile.setUser(testUser);
        validProfile.setBio("Valid bio content");
        validProfile.setLinkedinUrl("");
        validProfile.setTwitterUrl("");
        validProfile.setGithubUrl("");
        validProfile.setWebsiteUrl("");
        validProfile.setProfileImageUrl("");

        Profile result = profileService.createProfile(validProfile);

        assertNotNull(result.getId());
        assertEquals("Valid bio content", result.getBio());
        assertEquals("", result.getLinkedinUrl());
        assertEquals("", result.getTwitterUrl());
        assertEquals("", result.getGithubUrl());
        assertEquals("", result.getWebsiteUrl());
        assertEquals("", result.getProfileImageUrl());
    }
}
