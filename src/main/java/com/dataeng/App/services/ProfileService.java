package com.dataeng.App.services;

import com.dataeng.App.exception.ProfileAlreadyExistsException;
import com.dataeng.App.exception.ProfileNotFoundException;
import com.dataeng.App.exception.UserNotFoundException;
import com.dataeng.App.model.entity.Profile;
import com.dataeng.App.model.entity.User;
import com.dataeng.App.repository.ProfileRepository;
import com.dataeng.App.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    public Optional<Profile> getProfileById(Long id) {
        return profileRepository.findById(id);
    }

    public Optional<Profile> getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }

    public List<Profile> getProfilesWithBio() {
        return profileRepository.findProfilesWithBio();
    }

    public List<Profile> getProfilesWithSocialLinks() {
        return profileRepository.findProfilesWithSocialLinks();
    }

    public List<Profile> getProfilesByUserRole(User.Role role) {
        return profileRepository.findByUserRole(role);
    }

    public Profile createProfile(Profile profile) {
        if (profile.getUser() == null || profile.getUser().getId() == null) {
            throw new UserNotFoundException("User is required");
        }

        // 1. D'abord vérifier que l'user existe
        Optional<User> user = userRepository.findById(profile.getUser().getId());
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with id: " + profile.getUser().getId());
        }
        if (profileRepository.existsByUser(user.get())) {
            throw new ProfileAlreadyExistsException("Profile already exists for this user");
        }



        profile.setUser(user.get());
        return profileRepository.save(profile);
    }

    public Profile updateProfile(Long id, Profile profileDetails) {
        Optional<Profile> existingProfile = profileRepository.findById(id);
        if (existingProfile.isEmpty()) {
            throw new ProfileNotFoundException("Profile not found with id: " + id);
        }

        Profile profile = existingProfile.get();

        if (profileDetails.getUser() != null && profileDetails.getUser().getId() != null) {
            if (!profile.getUser().getId().equals(profileDetails.getUser().getId())) {
                Optional<User> user = userRepository.findById(profileDetails.getUser().getId());
                if (user.isEmpty()) {
                    throw new UserNotFoundException("User not found with id: " + profileDetails.getUser().getId());
                }
                if (profileRepository.existsByUser(user.get())) {
                    throw new ProfileAlreadyExistsException("Profile already exists for this user");
                }
                profile.setUser(user.get());
            }
        }

        profile.setBio(profileDetails.getBio());
        profile.setLinkedinUrl(profileDetails.getLinkedinUrl());
        profile.setTwitterUrl(profileDetails.getTwitterUrl());
        profile.setGithubUrl(profileDetails.getGithubUrl());
        profile.setWebsiteUrl(profileDetails.getWebsiteUrl());
        profile.setProfileImageUrl(profileDetails.getProfileImageUrl());

        return profileRepository.save(profile);
    }

    public void deleteProfile(Long id) {
        if (!profileRepository.existsById(id)) {
            throw new ProfileNotFoundException("Profile not found with id: " + id);
        }
        profileRepository.deleteById(id);
    }

    public boolean existsByUserId(Long userId) {
        return profileRepository.existsByUserId(userId);
    }

    public Profile createProfileForUser(Long userId, Profile profile) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isEmpty()) {
            throw new UserNotFoundException("User not found with id: " + userId);
        }

        if (profileRepository.existsByUser(user.get())) {
            throw new ProfileAlreadyExistsException("Profile already exists for this user");
        }

        profile.setUser(user.get());
        return profileRepository.save(profile);
    }
}
