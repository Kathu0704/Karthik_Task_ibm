package main.java.com.example.myapp;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MyController {

    @Value("${name}")
    private String name;

    @GetMapping("/user")
    public String getUser() {
        return "User name is: " + name;
    }
}