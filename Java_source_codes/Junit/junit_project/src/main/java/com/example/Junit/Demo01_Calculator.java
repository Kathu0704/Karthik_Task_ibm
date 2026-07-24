package com.example.Junit;

public class Demo01_Calculator {

    public int add(int a, int b) {
        return a + b;
    }

    public static void main(String[] args) {
        Demo01_Calculator calc = new Demo01_Calculator();
        int result = calc.add(10, 5);
        System.out.println("10 + 5 = " + result);
    }
}