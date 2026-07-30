package com.bank;

public interface BankRepository {

    BankAccount findByAccountNumber(String accountNumber);

    void save(BankAccount account);
}