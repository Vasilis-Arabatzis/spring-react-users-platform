package com.backend.user.controller;

import com.backend.user.dto.UserDTO;
import com.backend.user.service.UserService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins ={ "http://localhost:3000",
                        "http://localhost:5173"})
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public UserDTO create(@RequestBody @Valid UserDTO dto) {
        return service.create(dto);
    }

    // READ ALL
    @GetMapping
    public List<UserDTO> getAll() {
        return service.getAll();
    }

    // READ ONE
    @GetMapping("/{id}")
    public UserDTO getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // UPDATE
    @PutMapping("/{id}")
    public UserDTO update(@PathVariable Long id, @RequestBody @Valid UserDTO dto) {
        return service.update(id, dto);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}