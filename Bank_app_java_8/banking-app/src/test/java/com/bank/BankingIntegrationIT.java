package com.bank;

import com.bank.model.*;
import com.bank.processor.TransactionProcessor;
import com.bank.service.BankService;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.io.ByteArrayOutputStream;
import java.io.PrintStream;
import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

/**
 * Integration test — wires together real BankService, TransactionProcessor,
 * and the sealed Transaction model with NO mocking. Verifies the components
 * work correctly end-to-end, including virtual-thread based concurrent
 * processing.
 *
 * Naming convention "*IT" is picked up by maven-failsafe-plugin, separate
 * from unit tests run by surefire. Run with: mvn verify
 */
@DisplayName("Banking App Integration Tests")
class BankingIntegrationIT {

    private final BankService bankService = new BankService();
    private final TransactionProcessor processor = new TransactionProcessor();

    private ByteArrayOutputStream outputCapture;
    private PrintStream originalOut;

    @BeforeEach
    void redirectStdOut() {
        originalOut = System.out;
        outputCapture = new ByteArrayOutputStream();
        System.setOut(new PrintStream(outputCapture));
    }

    @AfterEach
    void restoreStdOut() {
        System.setOut(originalOut);
    }

    @Test
    @DisplayName("Customer record validates blank id/name via compact constructor")
    void customerValidationIntegratesWithRecordConstructor() {
        assertThrows(IllegalArgumentException.class,
                () -> new Customer("", "Ravi", "ravi@example.com"));
        assertThrows(IllegalArgumentException.class,
                () -> new Customer("C001", "", "ravi@example.com"));

        Customer valid = new Customer("C001", "Ravi Kumar", "ravi@example.com");
        assertEquals("Ravi Kumar", valid.name());
    }

    @Test
    @DisplayName("TransactionProcessor produces correct receipt for a Credit")
    void processorHandlesCreditCorrectly() {
        Credit credit = new Credit("T1", "A100", 5000.0, LocalDateTime.now());

        String receipt = processor.process(credit);

        assertTrue(receipt.contains("CREDIT RECEIPT"));
        assertTrue(receipt.contains("T1"));
        assertTrue(receipt.contains("A100"));
        assertTrue(receipt.contains("+5000"));
    }

    @Test
    @DisplayName("TransactionProcessor produces correct receipt for a Debit")
    void processorHandlesDebitCorrectly() {
        Debit debit = new Debit("T2", "A100", 1500.0, LocalDateTime.now());

        String receipt = processor.process(debit);

        assertTrue(receipt.contains("DEBIT RECEIPT"));
        assertTrue(receipt.contains("-1500"));
    }

    @Test
    @DisplayName("TransactionProcessor flags high-value transfers via guarded pattern")
    void processorFlagsHighValueTransfer() {
        Transfer bigTransfer = new Transfer("T3", "A100", "A200", 150000.0, LocalDateTime.now());
        Transfer normalTransfer = new Transfer("T4", "A100", "A300", 25000.0, LocalDateTime.now());

        String bigReceipt = processor.process(bigTransfer);
        String normalReceipt = processor.process(normalTransfer);

        assertTrue(bigReceipt.contains("HIGH VALUE TRANSFER"));
        assertTrue(bigReceipt.contains("FLAGGED FOR REVIEW"));
        assertFalse(normalReceipt.contains("FLAGGED FOR REVIEW"));
        assertTrue(normalReceipt.contains("TRANSFER RECEIPT"));
    }

    @Test
    @DisplayName("BankService.totalAmount sums all transactions correctly")
    void bankServiceCalculatesTotalAmount() {
        List<Transaction> transactions = List.of(
                new Credit("T1", "A100", 5000.0, LocalDateTime.now()),
                new Debit("T2", "A100", 1500.0, LocalDateTime.now()),
                new Transfer("T3", "A100", "A200", 25000.0, LocalDateTime.now()));

        double total = bankService.totalAmount(transactions);

        assertEquals(31500.0, total, 0.001);
    }

    @Test
    @DisplayName("BankService processes all transactions concurrently via virtual threads and prints every receipt")
    void bankServiceProcessesAllTransactionsConcurrently() {
        List<Transaction> transactions = List.of(
                new Credit("T1", "A100", 5000.0, LocalDateTime.now()),
                new Debit("T2", "A100", 1500.0, LocalDateTime.now()),
                new Transfer("T3", "A100", "A200", 25000.0, LocalDateTime.now()),
                new Transfer("T4", "A100", "A300", 150000.0, LocalDateTime.now()));

        bankService.processAllConcurrently(transactions);

        String output = outputCapture.toString();

        // All four receipts should have been printed, regardless of thread ordering
        assertTrue(output.contains("CREDIT RECEIPT"));
        assertTrue(output.contains("DEBIT RECEIPT"));
        assertTrue(output.contains("TRANSFER RECEIPT"));
        assertTrue(output.contains("HIGH VALUE TRANSFER"));
        assertTrue(output.contains("T1"));
        assertTrue(output.contains("T2"));
        assertTrue(output.contains("T3"));
        assertTrue(output.contains("T4"));
    }

    @Test
    @DisplayName("Full app flow: create customer, process transactions, verify totals")
    void endToEndBankingFlow() {
        Customer customer = new Customer("C001", "Ravi Kumar", "ravi@example.com");

        List<Transaction> transactions = List.of(
                new Credit("T1", "A100", 2000.0, LocalDateTime.now()),
                new Debit("T2", "A100", 500.0, LocalDateTime.now()));

        bankService.processAllConcurrently(transactions);
        double total = bankService.totalAmount(transactions);

        assertEquals("Ravi Kumar", customer.name());
        assertEquals(2500.0, total, 0.001);
        assertTrue(outputCapture.toString().contains("CREDIT RECEIPT"));
        assertTrue(outputCapture.toString().contains("DEBIT RECEIPT"));
    }
}