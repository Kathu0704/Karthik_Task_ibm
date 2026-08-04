package com.example.bank.repository;

import com.example.bank.entity.BankBranch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BankBranchRepository extends JpaRepository<BankBranch, Integer> {
}