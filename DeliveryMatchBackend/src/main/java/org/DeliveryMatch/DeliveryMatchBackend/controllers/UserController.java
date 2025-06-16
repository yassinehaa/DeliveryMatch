package org.DeliveryMatch.DeliveryMatchBackend.controllers;

import lombok.RequiredArgsConstructor;
import org.DeliveryMatch.DeliveryMatchBackend.Dto.UserDTO;
import org.DeliveryMatch.DeliveryMatchBackend.Services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> addUser(@RequestBody UserDTO dto) {
        UserDTO createdUser = userService.createUser(dto);
        return ResponseEntity.ok(createdUser);
    }

    @GetMapping("/{id}")
    public UserDTO getUser(@PathVariable Long id) throws Throwable {
        return userService.getUserById(id);
    }

    @PutMapping("/{id}")
    public UserDTO updateUser(@PathVariable Long id, @RequestBody UserDTO dto) throws Throwable {
        return userService.updateUser(id, dto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deactivate(@PathVariable Long id) throws Throwable {
        userService.deactivateUser(id);
        return ResponseEntity.ok().build();
    }
}

