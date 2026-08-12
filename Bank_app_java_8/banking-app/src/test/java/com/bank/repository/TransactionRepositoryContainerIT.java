package com.bank.repository;

import com.bank.model.Credit;
import com.bank.model.Debit;
import com.bank.model.Transaction;
import org.junit.jupiter.api.*;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import java.sql.SQLException;
import java.time.LocalDateTime;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Demonstrates Testcontainers: @Container spins up a REAL PostgreSQL
 * instance inside a Docker container before tests run, and tears it
 * down automatically afterward. No mocking, no embedded/in-memory DB —
 * this hits an actual Postgres server, just like production would.
 */
@Testcontainers
@DisplayName("TransactionRepository - Testcontainers PostgreSQL Integration Tests")
class TransactionRepositoryContainerIT {

    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16-alpine")
            .withDatabaseName("banking_test")
            .withUsername("bank_user")
            .withPassword("bank_pass");

    private static TransactionRepository repository;

    @BeforeAll
    static void setUp() throws SQLException {
        // By this point Testcontainers has already started the container
        // and postgres.getJdbcUrl() points at a real, running Postgres instance.
        repository = new TransactionRepository(
                postgres.getJdbcUrl(),
                postgres.getUsername(),
                postgres.getPassword());
        repository.createSchema();
    }

    @Test
    @DisplayName("Container starts and is reachable")
    void containerIsRunning() {
        assertTrue(postgres.isRunning());
        assertNotNull(postgres.getJdbcUrl());
    }

    @Test
    @DisplayName("Saves a Credit transaction into real Postgres and counts it")
    void savesAndCountsCreditTransaction() throws SQLException {
        Transaction credit = new Credit("PG-T1", "A100", 5000.0, LocalDateTime.now());

        repository.save(credit);

        assertTrue(repository.countAll() >= 1);
    }

    @Test
    @DisplayName("Sums Debit transaction amounts per account correctly")
    void sumsAmountsByAccount() throws SQLException {
        repository.save(new Debit("PG-T2", "A200", 1200.0, LocalDateTime.now()));
        repository.save(new Debit("PG-T3", "A200", 300.0, LocalDateTime.now()));

        double total = repository.sumAmountByAccount("A200");

        assertEquals(1500.0, total, 0.001);
    }
}