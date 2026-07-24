package com.example.Junit;

public class Demo03_StringUtils {
    public static boolean isPalindrome(String text) {

        String reverse = "";

        for (int i = text.length() - 1; i >= 0; i--) {
            reverse = reverse + text.charAt(i);
        }

        return text.equals(reverse);
    }
    
}
