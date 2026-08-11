package com.bank.model;

import java.time.LocalDateTime;

// Java 17 Sealed Interface — restricts which classes can implement it.
// Only Credit, Debit, and Transfer are permitted implementations.
public sealed interface Transaction permits Credit, Debit, Transfer {
    String id();

    double amount();

    LocalDateTime timestamp();
}