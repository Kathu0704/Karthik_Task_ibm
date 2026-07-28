package com.wellcome;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EmployeeApplication implements CommandLineRunner {

    @Autowired
    private Employee employee;

    public static void main(String[] args) {

        SpringApplication.run(EmployeeApplication.class, args);

    }

    @Override
    public void run(String... args) {

        employee.setId(101);
        employee.setName("Karthik");
        employee.setDepartment("Development");

        System.out.println("Employee Details:");
        System.out.println(employee);

    }
}