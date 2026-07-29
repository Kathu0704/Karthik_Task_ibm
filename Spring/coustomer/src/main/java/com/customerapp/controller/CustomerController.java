package com.example.customerapp.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.customerapp.entity.Customer;
import com.example.customerapp.repository.CustomerRepository;

@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    CustomerRepository repository;

    @PostMapping
    public Customer saveCustomer(@RequestBody Customer customer) {
        return repository.save(customer);
    }

    @GetMapping
    public List<Customer> getCustomers() {
        return repository.findAll();
    }
}