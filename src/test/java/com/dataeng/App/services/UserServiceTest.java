package com.dataeng.App.services;

import com.dataeng.App.exception.UserAlreadyExistsException;
import com.dataeng.App.exception.UserNotFoundException;
import com.dataeng.App.model.entity.User;
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
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setId(1L);
        testUser.setUsername("testuser");
        testUser.setEmail("test@example.com");
        testUser.setPassword("password");
        testUser.setRole(User.Role.USER);
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findAll()).thenReturn(users);

        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals(testUser.getUsername(), result.get(0).getUsername());
        verify(userRepository).findAll();
    }

    @Test
    void getUserById_WithValidId_ShouldReturnUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.getUserById(1L);

        assertTrue(result.isPresent());
        assertEquals(testUser.getUsername(), result.get().getUsername());
        verify(userRepository).findById(1L);
    }

    @Test
    void getUserById_WithInvalidId_ShouldReturnEmpty() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        Optional<User> result = userService.getUserById(999L);

        assertFalse(result.isPresent());
        verify(userRepository).findById(999L);
    }

    @Test
    void getUserByUsername_WithValidUsername_ShouldReturnUser() {
        when(userRepository.findByUsername("testuser")).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.getUserByUsername("testuser");

        assertTrue(result.isPresent());
        assertEquals(testUser.getUsername(), result.get().getUsername());
        verify(userRepository).findByUsername("testuser");
    }

    @Test
    void getUserByEmail_WithValidEmail_ShouldReturnUser() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        Optional<User> result = userService.getUserByEmail("test@example.com");

        assertTrue(result.isPresent());
        assertEquals(testUser.getEmail(), result.get().getEmail());
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void getUsersByRole_ShouldReturnUsersWithRole() {
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByRole(User.Role.USER)).thenReturn(users);

        List<User> result = userService.getUsersByRole(User.Role.USER);

        assertEquals(1, result.size());
        assertEquals(User.Role.USER, result.get(0).getRole());
        verify(userRepository).findByRole(User.Role.USER);
    }

    @Test
    void createUser_WithValidUser_ShouldReturnCreatedUser() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        User result = userService.createUser(testUser);

        assertEquals(testUser.getUsername(), result.getUsername());
        assertEquals(testUser.getEmail(), result.getEmail());
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository).save(testUser);
    }

    @Test
    void createUser_WithExistingUsername_ShouldThrowUserAlreadyExistsException() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
            userService.createUser(testUser);
        });

        assertEquals("Username already exists: testuser", exception.getMessage());
        verify(userRepository).existsByUsername("testuser");
        verify(userRepository, never()).save(any());
    }

    @Test
    void createUser_WithExistingEmail_ShouldThrowUserAlreadyExistsException() {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
            userService.createUser(testUser);
        });

        assertEquals("Email already exists: test@example.com", exception.getMessage());
        verify(userRepository).existsByEmail("test@example.com");
        verify(userRepository, never()).save(any());
    }

    @Test
    void updateUser_WithValidId_ShouldReturnUpdatedUser() {
        User updatedUser = new User();
        updatedUser.setUsername("newuser");
        updatedUser.setEmail("new@example.com");
        updatedUser.setPassword("newpassword");
        updatedUser.setRole(User.Role.ADMIN);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByUsername("newuser")).thenReturn(false);
        when(userRepository.existsByEmail("new@example.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        User result = userService.updateUser(1L, updatedUser);

        assertEquals("newuser", result.getUsername());
        assertEquals("new@example.com", result.getEmail());
        verify(userRepository).findById(1L);
        verify(userRepository).save(any(User.class));
    }

    @Test
    void updateUser_WithInvalidId_ShouldThrowUserNotFoundException() {
        when(userRepository.findById(999L)).thenReturn(Optional.empty());

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            userService.updateUser(999L, testUser);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
        verify(userRepository).findById(999L);
        verify(userRepository, never()).save(any());
    }

    @Test
    void deleteUser_WithValidId_ShouldDeleteUser() {
        when(userRepository.existsById(1L)).thenReturn(true);

        userService.deleteUser(1L);

        verify(userRepository).existsById(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test
    void deleteUser_WithInvalidId_ShouldThrowUserNotFoundException() {
        when(userRepository.existsById(999L)).thenReturn(false);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUser(999L);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
        verify(userRepository).existsById(999L);
        verify(userRepository, never()).deleteById(any());
    }

    @Test
    void existsByUsername_ShouldReturnTrueIfExists() {
        when(userRepository.existsByUsername("testuser")).thenReturn(true);

        boolean result = userService.existsByUsername("testuser");

        assertTrue(result);
        verify(userRepository).existsByUsername("testuser");
    }

    @Test
    void existsByEmail_ShouldReturnTrueIfExists() {
        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        boolean result = userService.existsByEmail("test@example.com");

        assertTrue(result);
        verify(userRepository).existsByEmail("test@example.com");
    }

    @Test
    void getUsersByRoles_ShouldReturnUsersWithRoles() {
        List<User.Role> roles = Arrays.asList(User.Role.USER, User.Role.ADMIN);
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByRoleIn(roles)).thenReturn(users);

        List<User> result = userService.getUsersByRoles(roles);

        assertEquals(1, result.size());
        verify(userRepository).findByRoleIn(roles);
    }
}
