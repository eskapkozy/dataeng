package com.dataeng.App.config;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest
public class TransactionRepositoryTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15-alpine")
            .withDatabaseName("dataengDb")
            .withUsername("macbookpro")
            .withPassword("    ");

    /**
     * Le contenaire a besoin de savoir ou trouver les info sur la db
     * elle va de manierer dinamyque creer une url special
     * @param registry
     */
    @DynamicPropertySource
    static void configure(DynamicPropertyRegistry registry){
        registry.add("spring.datasource.url", () -> postgres.getJdbcUrl());
        registry.add("spring.datasource.username", () -> postgres.getUsername());
        registry.add("spring.datasource.password", () -> postgres.getPassword());
    }
    @Test
    void contextLoads() {
        // Test container startup
    }
}
