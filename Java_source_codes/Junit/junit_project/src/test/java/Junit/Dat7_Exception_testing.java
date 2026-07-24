package Junit;

import com.example.Junit.Day7_BankCustomer;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertThrows;
 
public class Dat7_Exception_testing {
 
    @Test

    void testWithdrawInsufficientFunds() {
 
        Day7_BankCustomer account = new Day7_BankCustomer("123", 100.0);
 
        Exception ex = assertThrows(

                IllegalArgumentException.class,() -> account.withdraw(200.0)

        );
 
        assertEquals("Insufficient balance", ex.getMessage());
 
    }
    @Test
    void testWithdrawInsufficientFundsFail() {
 
        Day7_BankCustomer account =
                new Day7_BankCustomer("123", 100.0);
 
        Exception ex = assertThrows(
                IllegalArgumentException.class,
                () -> account.withdraw(200.0)
        );
        assertEquals("Low balance", ex.getMessage());
    }
 
}
 