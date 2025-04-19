package com.jcode.hometogo.Controller;

import com.jcode.hometogo.Model.Host;
import com.jcode.hometogo.Model.Tenant;
import com.jcode.hometogo.Model.User;
import com.jcode.hometogo.Service.HostService;
import com.jcode.hometogo.Service.TenantService;
import com.jcode.hometogo.Service.UserService;
import com.jcode.hometogo.dto.GoogleUserDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final HostService hostService;
    private final TenantService tenantService;

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    @PostMapping("/google")
public ResponseEntity<User> createGoogleUser(@RequestBody GoogleUserDTO dto) {
    User savedUser = userService.saveGoogleUser(dto);
    return ResponseEntity.ok(savedUser); // Includes role, etc.
}

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {

        return userService.getUserById(id);
    }
    @GetMapping("/email/{email}")
public User getUserByEmail(@PathVariable String email) {
    return userService.getUserByEmail(email);
}

    @PutMapping("/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
    }
    @PostMapping("{userId}/host")
    public Host createHostforUser(@PathVariable Long userId, @RequestBody Host hostData) {
        return hostService.createHost(userId, hostData);
    }
    @PostMapping("{userId}/tenant")
    public Tenant createTenantForUser(@PathVariable Long userId, @RequestBody Tenant tenantData) {
        return tenantService.createTenant(userId, tenantData);
    }


}