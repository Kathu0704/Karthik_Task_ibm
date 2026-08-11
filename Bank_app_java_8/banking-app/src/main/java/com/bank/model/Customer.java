package com.bank.model;

// Java 17 Record — immutable data carrier, auto-generates constructor,
// getters, equals(), hashCode(), toString()
public record Customer(String id, String name, String email) {

    // Compact constructor for validation (Java 16+ record feature)
    public Customer {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("Customer id cannot be blank");
        }
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Customer name cannot be blank");
        }
    }
}