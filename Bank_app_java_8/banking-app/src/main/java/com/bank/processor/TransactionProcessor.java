package com.bank.processor;
import com.bank.model.Credit;
import com.bank.model.Debit;
import com.bank.model.Transaction;
import com.bank.model.Transfer;

public class TransactionProcessor {

    // Java 21 Pattern Matching for switch + Record Patterns.
    // No casting needed — the switch deconstructs the record directly.
    public String process(Transaction txn) {
        return switch (txn) {
            case Credit(String id, String accountId, double amount, var ts) ->
                """
                        ------ CREDIT RECEIPT ------
                        Txn ID   : %s
                        Account  : %s
                        Amount   : +%.2f
                        Time     : %s
                        -----------------------------
                        """.formatted(id, accountId, amount, ts);

            case Debit(String id, String accountId, double amount, var ts) ->
                """
                        ------ DEBIT RECEIPT -------
                        Txn ID   : %s
                        Account  : %s
                        Amount   : -%.2f
                        Time     : %s
                        -----------------------------
                        """.formatted(id, accountId, amount, ts);

            // Guarded pattern (Java 21) — extra condition on the matched pattern
            case Transfer(String id, String from, String to, double amount, var ts) when amount > 100000 ->
                """
                        ---- HIGH VALUE TRANSFER ----
                        Txn ID   : %s
                        From     : %s
                        To       : %s
                        Amount   : %.2f (FLAGGED FOR REVIEW)
                        Time     : %s
                        -----------------------------
                        """.formatted(id, from, to, amount, ts);

            case Transfer(String id, String from, String to, double amount, var ts) ->
                """
                        ------ TRANSFER RECEIPT ----
                        Txn ID   : %s
                        From     : %s
                        To       : %s
                        Amount   : %.2f
                        Time     : %s
                        -----------------------------
                        """.formatted(id, from, to, amount, ts);
        };
    }
}