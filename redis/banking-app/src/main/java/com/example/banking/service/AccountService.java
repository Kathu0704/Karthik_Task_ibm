package com.example.banking.service;

import com.example.banking.entity.Account;
import com.example.banking.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    // Cache-Aside: full list cached under a single fixed key ("accounts::all").
    // Any write operation below evicts this so it's rebuilt fresh on next read.
    @Cacheable(value = "accounts", key = "'all'")
    public List<Account> getAllAccounts() {
        System.out.println("Fetching all accounts from DB...");
        return accountRepository.findAll();
    }

    // Cache-Aside: first call hits DB, result is stored in Redis under "accounts::<id>".
    // Subsequent calls for the same id are served from Redis until evicted/expired.
    @Cacheable(value = "accounts", key = "#id")
    public Account getAccountById(Long id) {
        System.out.println("Fetching from DB... id=" + id);
        return accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
    }

    public Account getAccountByNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException(
                        "Account not found with account number: " + accountNumber));
    }

    // A new account doesn't exist in the cache yet (no individual key to update),
    // but the cached "all accounts" list is now stale, so evict it.
    @CacheEvict(value = "accounts", key = "'all'")
    @Transactional
    public Account createAccount(Account account) {
        if (account.getAccountNumber() == null || account.getAccountNumber().isBlank()) {
            account.setAccountNumber(generateAccountNumber());
        }
        if (account.getBalance() == null) {
            account.setBalance(BigDecimal.ZERO);
        }
        return accountRepository.save(account);
    }

    // Write-Through: updates the DB and, since the return value is re-cached under
    // the same key, Redis is refreshed in the same call instead of just evicted.
    @CachePut(value = "accounts", key = "#id")
    @CacheEvict(value = "accounts", key = "'all'")
    @Transactional
    public Account updateAccount(Long id, Account updatedAccount) {
        Account existing = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
        existing.setAccountHolderName(updatedAccount.getAccountHolderName());
        existing.setBalance(updatedAccount.getBalance());
        return accountRepository.save(existing);
    }

    // Explicit Invalidation: removes this account's entry from Redis, and the
    // now-stale "all accounts" list, once it's deleted from the DB.
    @Caching(evict = {
            @CacheEvict(value = "accounts", key = "#id"),
            @CacheEvict(value = "accounts", key = "'all'")
    })
    @Transactional
    public void deleteAccount(Long id) {
        Account existing = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
        accountRepository.delete(existing);
    }

    // Write-Through: balance changes, so re-cache this id's entry with the fresh value.
    @CachePut(value = "accounts", key = "#id")
    @CacheEvict(value = "accounts", key = "'all'")
    @Transactional
    public Account deposit(Long id, BigDecimal amount) {
        validateAmount(amount);
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
        account.setBalance(account.getBalance().add(amount));
        return accountRepository.save(account);
    }

    @CachePut(value = "accounts", key = "#id")
    @CacheEvict(value = "accounts", key = "'all'")
    @Transactional
    public Account withdraw(Long id, BigDecimal amount) {
        validateAmount(amount);
        Account account = accountRepository.findById(id)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + id));
        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for account id: " + id);
        }
        account.setBalance(account.getBalance().subtract(amount));
        return accountRepository.save(account);
    }

    // Transfer touches two accounts, so both individual cache entries are evicted
    // (simplest correct approach — next read for either id repopulates via cache-aside).
    @Caching(evict = {
            @CacheEvict(value = "accounts", key = "#fromId"),
            @CacheEvict(value = "accounts", key = "#toId"),
            @CacheEvict(value = "accounts", key = "'all'")
    })
    @Transactional
    public void transfer(Long fromId, Long toId, BigDecimal amount) {
        validateAmount(amount);
        Account from = accountRepository.findById(fromId)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + fromId));
        Account to = accountRepository.findById(toId)
                .orElseThrow(() -> new AccountNotFoundException("Account not found with id: " + toId));

        if (from.getBalance().compareTo(amount) < 0) {
            throw new InsufficientBalanceException("Insufficient balance for account id: " + fromId);
        }

        from.setBalance(from.getBalance().subtract(amount));
        to.setBalance(to.getBalance().add(amount));

        accountRepository.save(from);
        accountRepository.save(to);
    }

    private void validateAmount(BigDecimal amount) {
        if (amount == null || amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("Amount must be greater than zero");
        }
    }

    private String generateAccountNumber() {
        String candidate;
        do {
            candidate = "ACC" + UUID.randomUUID().toString().replace("-", "").substring(0, 10).toUpperCase();
        } while (accountRepository.existsByAccountNumber(candidate));
        return candidate;
    }
}
