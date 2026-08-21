package com.microservices.userservice.service;

import com.microservices.userservice.model.User;
import com.microservices.userservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Creates and persists a new user.
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }

    /**
     * Retrieves all users from the database.
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * Retrieves a single user by id.
     * Returns an Optional so callers can handle the "not found" case gracefully.
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteUser(Long id) {
    userRepository.deleteById(id);
}
}
