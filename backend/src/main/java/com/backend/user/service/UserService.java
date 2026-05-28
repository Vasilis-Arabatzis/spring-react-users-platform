package com.backend.user.service;

import com.backend.user.dto.UserDTO;
import com.backend.user.entity.User;
import com.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository repository;

    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public UserDTO create(UserDTO dto) {
        User user = toEntity(dto);
        User saved = repository.save(user);
        return toDto(saved);
    }

    public List<UserDTO> getAll() {
        return repository.findAll()
                .stream()
                .map(this::toDto)
                .toList();
    }

    public UserDTO getById(Long id) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return toDto(user);
    }

    public UserDTO update(Long id, UserDTO dto) {
        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());

        return toDto(repository.save(user));
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    private User toEntity(UserDTO dto) {
        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        return user;
    }

    private UserDTO toDto(User user) {
        UserDTO dto = new UserDTO();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        return dto;
    }
}