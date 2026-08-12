package com.bank.repository;

import com.bank.model.*;

import java.sql.*;

/**
 * Simple JDBC repository for persisting Transaction records.
 * Uses Java 21 sealed-interface pattern matching to figure out
 * transaction type + account without casting.
 */
public class TransactionRepository {

    private final String jdbcUrl;
    private final String username;
    private final String password;

    public TransactionRepository(String jdbcUrl, String username, String password) {
        this.jdbcUrl = jdbcUrl;
        this.username = username;
        this.password = password;
    }

    public void createSchema() throws SQLException {
        String sql = """
                CREATE TABLE IF NOT EXISTS transactions (
                    id VARCHAR(50) PRIMARY KEY,
                    type VARCHAR(20) NOT NULL,
                    account_id VARCHAR(50) NOT NULL,
                    amount DOUBLE PRECISION NOT NULL,
                    created_at TIMESTAMP NOT NULL
                )
                """;
        try (Connection conn = connect(); Statement stmt = conn.createStatement()) {
            stmt.execute(sql);
        }
    }

    public void save(Transaction txn) throws SQLException {
        String type;
        String accountId;

        switch (txn) {
            case Credit c -> {
                type = "CREDIT";
                accountId = c.accountId();
            }
            case Debit d -> {
                type = "DEBIT";
                accountId = d.accountId();
            }
            case Transfer t -> {
                type = "TRANSFER";
                accountId = t.fromAccountId();
            }
        }

        String sql = """
                INSERT INTO transactions (id, type, account_id, amount, created_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT (id) DO NOTHING
                """;

        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, txn.id());
            ps.setString(2, type);
            ps.setString(3, accountId);
            ps.setDouble(4, txn.amount());
            ps.setTimestamp(5, Timestamp.valueOf(txn.timestamp()));
            ps.executeUpdate();
        }
    }

    public int countAll() throws SQLException {
        String sql = "SELECT COUNT(*) FROM transactions";
        try (Connection conn = connect();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {
            rs.next();
            return rs.getInt(1);
        }
    }

    public double sumAmountByAccount(String accountId) throws SQLException {
        String sql = "SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE account_id = ?";
        try (Connection conn = connect(); PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, accountId);
            try (ResultSet rs = ps.executeQuery()) {
                rs.next();
                return rs.getDouble(1);
            }
        }
    }

    private Connection connect() throws SQLException {
        return DriverManager.getConnection(jdbcUrl, username, password);
    }
}