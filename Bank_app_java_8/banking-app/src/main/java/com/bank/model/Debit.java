package com.bank.model;

import java.time.LocalDateTime;

public record Debit(String id, String accountId, double amount, LocalDateTime timestamp)
        implements Transaction {
}