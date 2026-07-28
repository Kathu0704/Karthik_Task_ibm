package com.bank;

public class CreditCardPayment implements PaymentService {

    @Override
    public void pay(double amount) {
        System.out.println(
                "Payment of $" + amount + " done using Credit Card");
    }
}