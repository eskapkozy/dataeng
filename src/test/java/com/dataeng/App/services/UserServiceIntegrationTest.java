package com.dataeng.App.services;

import com.dataeng.App.exception.UserAlreadyExistsException;
import com.dataeng.App.exception.UserNotFoundException;
import com.dataeng.App.model.entity.User;
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

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@Testcontainers
@SpringBootTest
@Transactional
class UserServiceIntegrationTest {

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
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User();
        testUser.setUsername("testuser1234"); // plus de 3 caractères
        testUser.setEmail("testuser@example.com"); // adresse valide
        testUser.setPassword("TestPass123!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        testUser.setRole(User.Role.USER); // role valide
    }

    @Test
    void getAllUsers_ShouldReturnAllUsers() {
        userRepository.save(testUser);

        List<User> result = userService.getAllUsers();

        assertEquals(1, result.size());
        assertEquals(testUser.getUsername(), result.get(0).getUsername());
    }

    @Test
    void getUserById_WithValidId_ShouldReturnUser() {
        User savedUser = userRepository.save(testUser);

        Optional<User> result = userService.getUserById(savedUser.getId());

        assertTrue(result.isPresent());
        assertEquals(testUser.getUsername(), result.get().getUsername());
    }

    @Test
    void getUserById_WithInvalidId_ShouldReturnEmpty() {
        Optional<User> result = userService.getUserById(999L);

        assertFalse(result.isPresent());
    }

    @Test
    void getUserByUsername_WithValidUsername_ShouldReturnUser() {
        userRepository.save(testUser);

        Optional<User> result = userService.getUserByUsername("testuser1234");

        assertTrue(result.isPresent());
        assertEquals(testUser.getUsername(), result.get().getUsername());
    }

    @Test
    void getUserByEmail_WithValidEmail_ShouldReturnUser() {
        userRepository.save(testUser);

        Optional<User> result = userService.getUserByEmail("testuser@example.com");

        assertTrue(result.isPresent());
        assertEquals(testUser.getEmail(), result.get().getEmail());
    }

    @Test
    void getUsersByRole_ShouldReturnUsersWithRole() {
        userRepository.save(testUser);

        List<User> result = userService.getUsersByRole(User.Role.USER);

        assertEquals(1, result.size());
        assertEquals(User.Role.USER, result.get(0).getRole());
    }

    @Test
    void createUser_WithValidUser_ShouldReturnCreatedUser() {
        User result = userService.createUser(testUser);

        assertNotNull(result.getId());
        assertEquals(testUser.getUsername(), result.getUsername());
        assertEquals(testUser.getEmail(), result.getEmail());
    }

    @Test
    void createUser_WithExistingUsernameOrEmail_ShouldThrowUserAlreadyExistsException() {
        userRepository.save(testUser);



        User newUser = new User();
        newUser.setUsername("testuser1234"); // Même username que testUser
        newUser.setEmail("testuser@example.com"); // Même email que testUser
        newUser.setPassword("TestPass123!"); // Mot de passe valide
        newUser.setRole(User.Role.USER);

        UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
            userService.createUser(newUser);
        });

        assertEquals("Username already exists: "+testUser.getUsername(), exception.getMessage());
    }

    @Test
    void createUser_WithExistingEmail_ShouldThrowUserAlreadyExistsException() {
        userRepository.save(testUser);

        User savedUser = userRepository.findByEmail(testUser.getEmail()).orElse(null);
        assertNotNull(savedUser);

        User newUser = new User();
        newUser.setUsername("differentuser");
        newUser.setEmail(testUser.getEmail());
        newUser.setPassword("Password1234!"); // 8 caractères minimum, contenant une majuscule, une minuscule, un chiffre et un caractère spécial
        newUser.setRole(User.Role.USER);

        UserAlreadyExistsException exception = assertThrows(UserAlreadyExistsException.class, () -> {
            userService.createUser(newUser);
        });

        assertEquals("Email already exists: " + testUser.getEmail(), exception.getMessage());
    }

    @Test
    void updateUser_WithValidId_ShouldReturnUpdatedUser() {
        User savedUser = userRepository.save(testUser);

        User updatedUser = new User();
        updatedUser.setUsername("newuser");
        updatedUser.setEmail("new@example.com");
        updatedUser.setPassword("newpassword");
        updatedUser.setRole(User.Role.ADMIN);

        User result = userService.updateUser(savedUser.getId(), updatedUser);

        assertEquals("newuser", result.getUsername());
        assertEquals("new@example.com", result.getEmail());
        assertEquals(User.Role.ADMIN, result.getRole());
    }

    @Test
    void updateUser_WithInvalidId_ShouldThrowUserNotFoundException() {
        User updatedUser = new User();
        updatedUser.setUsername("newuser");
        updatedUser.setEmail("new@example.com");
        updatedUser.setPassword("newpassword");
        updatedUser.setRole(User.Role.ADMIN);

        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            userService.updateUser(999L, updatedUser);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
    }

    @Test
    void deleteUser_WithValidId_ShouldDeleteUser() {
        User savedUser = userRepository.save(testUser);

        userService.deleteUser(savedUser.getId());

        assertFalse(userRepository.existsById(savedUser.getId()));
    }

    @Test
    void deleteUser_WithInvalidId_ShouldThrowUserNotFoundException() {
        UserNotFoundException exception = assertThrows(UserNotFoundException.class, () -> {
            userService.deleteUser(999L);
        });

        assertEquals("User not found with id: 999", exception.getMessage());
    }

    @Test
    void existsByUsername_ShouldReturnTrueIfExists() {
        testUser.setUsername("testuser");
        userRepository.save(testUser);

        boolean result = userService.existsByUsername("testuser");

        assertTrue(result);
    }

    @Test
    void existsByEmail_ShouldReturnTrueIfExists() {
        testUser.setEmail("test@example.com");
        userRepository.save(testUser);

        boolean result = userService.existsByEmail("test@example.com");

        assertTrue(result);
    }

    @Test
    void getUsersByRoles_ShouldReturnUsersWithRoles() {
        userRepository.save(testUser);

        List<User.Role> roles = Arrays.asList(User.Role.USER, User.Role.ADMIN);
        List<User> result = userService.getUsersByRoles(roles);

        assertEquals(1, result.size());
        assertEquals(User.Role.USER, result.get(0).getRole());
    }

    // ========== Tests de validation Jakarta ==========

    @Test
    void createUser_WithNullUsername_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername(null);
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("username"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createUser_WithShortUsername_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("ab"); // Moins de 3 caractères
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("username"));

        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createUser_WithLongUsername_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("verylongusernamethatexceedstwentycharacters"); // Plus de 20 caractères
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("username"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createUser_WithInvalidUsernamePattern_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("user@name"); // Caractères non autorisés
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("username"));
        assertTrue(exception.getMessage().contains("doit correspondre"));
    }

    @Test
    void createUser_WithNullEmail_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail(null);
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("email"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createUser_WithInvalidEmail_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("invalid-email"); // Email invalide
        invalidUser.setPassword("TestPass123!"); // Mot de passe valide
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        System.out.println(exception.getMessage());
        assertTrue(exception.getMessage().contains("email"));
        assertTrue(exception.getMessage().contains("doit être une adresse électronique syntaxiquement correcte"));
    }

    @Test
    void createUser_WithLongEmail_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("verylongemailaddressthatdefinitelyexceedshundredcharacterslimit@verylongdomainnamethatalsoexceedsthelimit.com");
        invalidUser.setPassword("TestPass123!"); // Mot de passe valide
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("email"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createUser_WithNullPassword_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword(null);
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("password"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void createUser_WithShortPassword_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("short"); // Moins de 8 caractères
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("password"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }

    @Test
    void createUser_WithWeakPassword_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("weakpassword"); // Ne respecte pas le pattern
        invalidUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("password"));
        assertTrue(exception.getMessage().contains("doit correspondre"));
    }

    @Test
    void createUser_WithNullRole_ShouldThrowConstraintViolationException() {
        User invalidUser = new User();
        invalidUser.setUsername("testuser");
        invalidUser.setEmail("test@example.com");
        invalidUser.setPassword("Password123!");
        invalidUser.setRole(null);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.createUser(invalidUser);
        });

        assertTrue(exception.getMessage().contains("role"));
        assertTrue(exception.getMessage().contains("ne doit pas être nul"));
    }

    @Test
    void updateUser_WithInvalidData_ShouldThrowConstraintViolationException() {
        User savedUser = userRepository.save(testUser);

        User updatedUser = new User();
        updatedUser.setUsername("a"); // Username trop court, ce qui viole la contrainte de taille minimale de 3 caractères
        updatedUser.setEmail("test@example.com");
        updatedUser.setPassword("Password123!");
        updatedUser.setRole(User.Role.USER);

        ConstraintViolationException exception = assertThrows(ConstraintViolationException.class, () -> {
            userService.updateUser(savedUser.getId(), updatedUser);
            userRepository.flush(); // Force Hibernate à vérifier les contraintes
        });

        assertTrue(exception.getMessage().contains("username"));
        assertTrue(exception.getMessage().contains("la taille doit être comprise entre"));
    }
}
