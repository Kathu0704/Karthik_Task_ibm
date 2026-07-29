package com.bank;

public class DebitCardPayment implements PaymentService {

    @Override
    public void pay(double amount) {
        System.out.println(
                "Payment of $" + amount + " done using Debit Card");
    }
}