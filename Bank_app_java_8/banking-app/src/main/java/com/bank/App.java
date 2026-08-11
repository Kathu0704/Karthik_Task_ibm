package com.bank;

import com.bank.model.*;
import com.bank.service.BankService;

import java.time.LocalDateTime;
import java.util.List;

public class App {
    public static void main(String[] args) {

        Customer customer = new Customer("C001", "Ravi Kumar", "ravi@example.com");
        System.out.println("Customer: " + customer);

        List<Transaction> transactions = List.of(
                new Credit("T1", "A100", 5000.0, LocalDateTime.now()),
                new Debit("T2", "A100", 1500.0, LocalDateTime.now()),
                new Transfer("T3", "A100", "A200", 25000.0, LocalDateTime.now()),
                new Transfer("T4", "A100", "A300", 150000.0, LocalDateTime.now()) // triggers high-value guard
        );

        BankService bankService = new BankService();

        // Java 21 Virtual Threads process each transaction concurrently
        bankService.processAllConcurrently(transactions);

        // Java 8+ Streams, still valid, combined with new features
        double total = bankService.totalAmount(transactions);
        System.out.printf("Total transaction volume: %.2f%n", total);

        // Java 17 Pattern Matching for instanceof (simple form)
        for (Transaction txn : transactions) {
            if (txn instanceof Transfer t && t.amount() > 100000) {
                System.out.println("⚠ Review needed for transfer: " + t.id());
            }
        }
    }
}