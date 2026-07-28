package com.wellcome;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WelcomeApplication implements CommandLineRunner {

    @Autowired
    private Student student;

    public static void main(String[] args) {
        SpringApplication.run(WelcomeApplication.class, args);
    }

    @Override
    public void run(String... args) {
        System.out.println("Student Bean Details");
        System.out.println(student);
    }
}