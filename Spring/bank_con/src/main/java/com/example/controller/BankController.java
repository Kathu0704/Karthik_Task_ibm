package com.example.bank.controller;

import com.example.bank.entity.Account;
import com.example.bank.entity.BankBranch;
import com.example.bank.repository.AccountRepository;
import com.example.bank.repository.BankBranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class BankController {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private BankBranchRepository bankBranchRepository;

    @GetMapping("/accounts")
    public List<Account> getAccounts() {
        return accountRepository.findAll();
    }

    @GetMapping("/branches")
    public List<BankBranch> getBranches() {
        return bankBranchRepository.findAll();
    }

}