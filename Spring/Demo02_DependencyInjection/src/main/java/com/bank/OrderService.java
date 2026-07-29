package com.bank;

public class OrderService {

    private PaymentService paymentService;

    // Constructor Injection
    public OrderService(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

    public void placeOrder(double amount) {

        System.out.println("Order placed");

        paymentService.pay(amount);
    }
}