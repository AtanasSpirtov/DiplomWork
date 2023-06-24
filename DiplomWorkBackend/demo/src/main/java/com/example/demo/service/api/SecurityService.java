package com.example.demo.service.api;

import com.example.demo.model.User;
import org.springframework.stereotype.Service;

//@Service
public interface SecurityService {
    void createUser(User user);

    User getUserByUsername(String username);
}
