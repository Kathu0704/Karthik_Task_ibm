package com.bank.model;

import java.time.LocalDateTime;

public record Transfer(String id, String fromAccountId, String toAccountId,
        double amount, LocalDateTime timestamp)
        implements Transaction {
}