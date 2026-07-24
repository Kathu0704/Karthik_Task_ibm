package Junit;


import com.example.Junit.Day7_BankCustomer;
import com.example.Junit.Demo03_StringUtils;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class Demo03_Parameterized_Test {
    @ParameterizedTest
    @ValueSource(strings = {"amma", "mom", "nitin"})
    void testPalindromePass(String candidate) {

        assertTrue(Demo03_StringUtils.isPalindrome(candidate));
    }


    // Normal Test - Failure example
    @Test
    void testPalindromeFail() {

        // "hello" is not a palindrome, so this test will fail
        assertTrue(
            Demo03_StringUtils.isPalindrome("hello"),
            "Expected true but got false"
        );
    }


    // Parameterized Test - Multiple non-palindrome values
    @ParameterizedTest
    @ValueSource(strings = {"java", "spring", "bank"})
    void testNotPalindrome(String candidate) {

        assertFalse(Demo03_StringUtils.isPalindrome(candidate));
    }
    
}
