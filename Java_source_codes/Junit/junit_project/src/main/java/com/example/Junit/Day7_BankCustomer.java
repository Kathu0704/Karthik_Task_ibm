package com.example.Junit;

public class Day7_BankCustomer {
    public static void main(String[] args) {
        Day7_BankCustomer customer = new Day7_BankCustomer("12345", 1000.0);
        System.out.println("Initial balance: " + customer.getBalance());
        customer.withdraw(500.0);
        System.out.println("Balance after withdrawal: " + customer.getBalance());
    }

    private String accountNumber;
    private double balance;

    public Day7_BankCustomer(String accountNumber, double balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
 
    public void withdraw(double amount) {
        if (amount > balance) {
            throw new IllegalArgumentException("Insufficient balance");
        }
        balance -= amount;
    }
 
    public double getBalance() {
        return balance;
    }
    
}

