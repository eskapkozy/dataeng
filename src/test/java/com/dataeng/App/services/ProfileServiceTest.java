package com.dataeng.App.services;

import com.dataeng.App.exception.ProfileAlreadyExistsException;
import com.dataeng.App.exception.ProfileNotFoundException;
import com.dataeng.App.exception.UserNotFoundException;
import com.dataeng.App.model.entity.Profile;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ProfileRepository;
import com.dataeng.App.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProfileServiceTest {

    @Mock
    private ProfileRepository profileRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private ProfileService profileService;

    private User testUser;
    private Profile testProfile;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setRole(User.Role.USER);

        testProfile = new Profile();
        testProfile.setId(1L);
        testProfile.setBio("Test bio");
        testProfile.setLinkedinUrl("https://linkedin.com/test");
        testProfile.setTwitterUrl("https://twitter.com/test");
        testProfile.setGithubUrl("https://github.com/test");
        testProfile.setWebsiteUrl("https://test.com");
        testProfile.setProfileImageUrl("https://test.com/image.jpg");
        testProfile.setUser(testUser);
    }

    @Test
    void getAllProfiles_ShouldReturnAllProfiles() {
        List<Profile> profiles = Arrays.asList(testProfile);
        when(profileRepository.findAll()).thenReturn(profiles);

        List<Profile> result = profileService.getAllProfiles();

        assertEquals(1, result.size());
        assertEquals(testProfile.getBio(), result.get(0).getBio());
        verify(profileRepository).findAll();
    }

    @Test
    void getProfileById_WithValidId_ShouldReturnProfile() {
        when(profileRepository.findById(1L)).thenReturn(Optional.of(testProfile));

        Optional<Profile> result = profileService.getProfileById(1L);

        assertTrue(result.isPresent());
        assertEquals(testProfile.getBio(), result.get().getBio());
        verify(profileRepository).findById(1L);
    }

    @Test
    void getProfileById_WithInvalidId_ShouldReturnEmpty() {
        when(profileRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<Profile> result = profileService.getProfileById(999L);

        assertFalse(result.isPresent());
        verify(profileRepository).findById(999L);
    }

    @Test
    void getProfileByUserId_WithValidUserId_ShouldReturnProfile() {
        when(profileRepository.findByUserId(1L)).thenReturn(Optional.of(testProfile));

        Optional<Profile> result = profileService.getProfileByUserId(1L);

        assertTrue(result.isPresent());
        assertEquals(testProfile.getBio(), result.get().getBio());
        verify(profileRepository).findByUserId(1L);
    }

    @Test
    void getProfilesWithBio_ShouldReturnProfilesWithBio() {
        List<Profile> profiles = Arrays.asList(testProfile);
        when(profileRepository.findProfilesWithBio()).thenReturn(profiles);

        List<Profile> result = profileService.getProfilesWithBio();

        assertEquals(1, result.size());
        assertNotNull(result.get(0).getBio());
        verify(profileRepository).findProfilesWithBio();
    }

    @Test
    void getProfilesWithSocialLinks_ShouldReturnProfilesWithSocialLinks() {
        List<Profile> profiles = Arrays.asList(testProfile);
        when(profileRepository.findProfilesWithSocialLinks()).thenReturn(profiles);

        List<Profile> result = profileService.getProfilesWithSocialLinks();

        assertEquals(1, result.size());
        verify(profileRepository).findProfilesWithSocialLinks();
    }

    @Test
    void getProfilesByUserRole_ShouldReturnProfilesWithRole() {
        List<Profile> profiles = Arrays.asList(testProfile);
        when(profileRepository.findByUserRole(User.Role.USER)).thenReturn(profiles);

        List<Profile> result = profileService.getProfilesByUserRole(User.Role.USER);

        assertEquals(1, result.size());
        verify(profileRepository).findByUserRole(User.Role.USER);
    }

    @Test
    void createProfile_WithValidProfile_ShouldReturnCreatedProfile() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(profileRepository.existsByUser(testUser)).thenReturn(false);
        when(profileRepository.save(any(Profile.class))).thenReturn(testProfile);

        Profile result = profileService.createProfile(testProfile);

        assertEquals(testProfile.getBio(), result.getBio());
        assertEquals(testUser.getId(), result.getUser().getId());
        verify(userRepository).findById(1L);
        verify(profileRepository).existsByUser(testUser);
        verify(profileRepository).save(testProfile);
    }

    @Test
    void createProfile_WithNullUser_ShouldThrowUserNotFoundException() {
        testProfile.setUser(null);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("User is required", exception.getMessage());
        verify(profileRepository, never()).save(any());
    }

    @Test
    void createProfile_WithExistingProfileForUser_ShouldThrowProfileAlreadyExistsException() {

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(profileRepository.existsByUser(testUser)).thenReturn(true);

        ProfileAlreadyExistsException exception = assertThrows(ProfileAlreadyExistsException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("Profile already exists for this user", exception.getMessage());
        verify(userRepository).findById(1L);
        verify(profileRepository).existsByUser(testUser);
        verify(profileRepository, never()).save(any());
    }

    @Test
    void createProfile_WithInvalidUserId_ShouldThrowUserNotFoundException() {

        testUser.setId(999L);
        testProfile.setUser(testUser);

        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfile(testProfile);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
        verify(userRepository).findById(999L);
        verify(profileRepository, never()).save(any());
    }

    @Test
    void updateProfile_WithValidId_ShouldReturnUpdatedProfile() {
        Profile updatedProfile = new Profile();
        updatedProfile.setBio("Updated bio");
        updatedProfile.setLinkedinUrl("https://linkedin.com/updated");

        when(profileRepository.findById(1L)).thenReturn(Optional.of(testProfile));
        when(profileRepository.save(any(Profile.class))).thenReturn(updatedProfile);

        Profile result = profileService.updateProfile(1L, updatedProfile);

        assertEquals("Updated bio", result.getBio());
        verify(profileRepository).findById(1L);
        verify(profileRepository).save(any(Profile.class));
    }

    @Test
    void updateProfile_WithInvalidId_ShouldThrowProfileNotFoundException() {
        when(profileRepository.findById(999L)).thenReturn(Optional.empty());

        ProfileNotFoundException exception = assertThrows(ProfileNotFoundException.class, () -> {
            profileService.updateProfile(999L, testProfile);
        });

        assertEquals("Profile not found with id: 999", exception.getMessage());
        verify(profileRepository).findById(999L);
        verify(profileRepository, never()).save(any());
    }

    @Test
    void deleteProfile_WithValidId_ShouldDeleteProfile() {
        when(profileRepository.existsById(1L)).thenReturn(true);

        profileService.deleteProfile(1L);

        verify(profileRepository).existsById(1L);
        verify(profileRepository).deleteById(1L);
    }

    @Test
    void deleteProfile_WithInvalidId_ShouldThrowProfileNotFoundException() {
        when(profileRepository.existsById(999L)).thenReturn(false);

        ProfileNotFoundException exception = assertThrows(ProfileNotFoundException.class, () -> {
            profileService.deleteProfile(999L);
        });

        assertEquals("Profile not found with id: 999", exception.getMessage());
        verify(profileRepository).existsById(999L);
        verify(profileRepository, never()).deleteById(any());
    }

    @Test
    void existsByUserId_ShouldReturnTrueIfExists() {
        when(profileRepository.existsByUserId(1L)).thenReturn(true);

        boolean result = profileService.existsByUserId(1L);

        assertTrue(result);
        verify(profileRepository).existsByUserId(1L);
    }

    @Test
    void createProfileForUser_WithValidUserId_ShouldReturnCreatedProfile() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(profileRepository.existsByUser(testUser)).thenReturn(false);
        when(profileRepository.save(any(Profile.class))).thenReturn(testProfile);

        Profile result = profileService.createProfileForUser(1L, testProfile);

        assertEquals(testProfile.getBio(), result.getBio());
        assertEquals(testUser.getId(), result.getUser().getId());
        verify(userRepository).findById(1L);
        verify(profileRepository).existsByUser(testUser);
        verify(profileRepository).save(testProfile);
    }

    @Test
    void createProfileForUser_WithInvalidUserId_ShouldThrowUserNotFoundException() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            profileService.createProfileForUser(999L, testProfile);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
        verify(userRepository).findById(999L);
        verify(profileRepository, never()).save(any());
    }

    @Test
    void createProfileForUser_WithExistingProfile_ShouldThrowProfileAlreadyExistsException() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(profileRepository.existsByUser(testUser)).thenReturn(true);

        ProfileAlreadyExistsException exception = assertThrows(ProfileAlreadyExistsException.class, () -> {
            profileService.createProfileForUser(1L, testProfile);
        });

        assertEquals("Profile already exists for this user", exception.getMessage());
        verify(userRepository).findById(1L);
        verify(profileRepository).existsByUser(testUser);
        verify(profileRepository, never()).save(any());
    }
}
