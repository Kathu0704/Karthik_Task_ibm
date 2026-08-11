package com.bank.service;

import com.bank.model.Transaction;
import com.bank.processor.TransactionProcessor;

import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class BankService {

    private final TransactionProcessor processor = new TransactionProcessor();

    // Java 21 Virtual Threads — lightweight threads, ideal for
    // I/O-bound / high-throughput concurrent tasks like transaction processing.
    public void processAllConcurrently(List<Transaction> transactions) {
        try (ExecutorService executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (Transaction txn : transactions) {
                executor.submit(() -> {
                    String receipt = processor.process(txn);
                    System.out.println(receipt);
                });
            }
        } // executor.close() auto-waits for all virtual threads to finish
    }

    public double totalAmount(List<Transaction> transactions) {
        return transactions.stream()
                .mapToDouble(Transaction::amount)
                .sum();
    }
}