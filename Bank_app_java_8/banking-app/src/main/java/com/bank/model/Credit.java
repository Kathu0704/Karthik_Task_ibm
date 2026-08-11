package com.bank.model;

import java.time.LocalDateTime;

// Record implementing a sealed interface
public record Credit(String id, String accountId, double amount, LocalDateTime timestamp)
        implements Transaction {
}