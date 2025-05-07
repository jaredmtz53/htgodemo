package com.jcode.hometogo.Controller;


import com.jcode.hometogo.Model.User;
import com.jcode.hometogo.dto.GoogleUserDTO;
import com.jcode.hometogo.Security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    // In-memory user storage (for simplicity, adjust to DB later)
    private Map<String, User> users = new HashMap<>();

    public AuthController() {
        // Example user
        User exampleUser = User.builder()
                .id(1L)
                .firstName("John")
                .lastName("Doe")
                .email("johndoe@example.com")
                .username("john123")
                .role("TENANT")
                .build();
        users.put(exampleUser.getEmail(), exampleUser);
    }

    @PostMapping("/login")
public ResponseEntity<?> login(@RequestBody GoogleUserDTO googleUserDTO) {
    String email = googleUserDTO.getEmail();
    User user = users.get(email);

    if (user != null) {
        String token = JwtUtil.generateToken(user.getId().toString(), email);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);

        return ResponseEntity.ok(response);
    }

    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found.");
}



    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        return ResponseEntity.ok("User logged out.");
    }
}
