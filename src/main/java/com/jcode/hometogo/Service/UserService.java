package com.jcode.hometogo.Service;

import com.jcode.hometogo.Model.User;
import com.jcode.hometogo.Repository.UserRepository;
import com.jcode.hometogo.dto.GoogleUserDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    ///  Create User
    public User createUser(User user) {
        return userRepository.save(user);
    }
    ///  get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    ///  Find User by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }
    ///  Find User by Username
    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    /// Find User by Email
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    ///  update User (needs more work)
    public User updateUser(User user) {
        User existing = userRepository.findById(user.getId()).orElseThrow();
        existing.setFirstName(user.getFirstName());
        existing.setEmail(user.getEmail());
        existing.setLastName(user.getLastName());
        existing.setUsername(user.getUsername());
        return userRepository.save(existing);
    }
    /// delete a user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    public User saveGoogleUser(GoogleUserDTO dto) {
        User existing = userRepository.findByEmail(dto.getEmail());
        if (existing != null) return existing;
    
        User user = new User();
        user.setGoogleSub(dto.getSub());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getGiven_name());
        user.setLastName(dto.getFamily_name());
        user.setUsername(dto.getEmail());
    
        user.setRole("TENANT"); // or "CUSTOMER" — whatever default makes sense
    
        return userRepository.save(user);
    }

}
