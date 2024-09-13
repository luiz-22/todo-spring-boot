package com.example.api.service.impl;

import com.example.api.dto.UserDTO;
import com.example.api.exception.BadRequestException;
import com.example.api.repository.IUserRepository;
import com.example.api.service.IUserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService implements IUserService {

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ObjectMapper mapper;

    public UserDTO getUserByEmail(String email) throws BadRequestException {
        return userRepository.findByEmail(email)
                .map(user -> mapper.convertValue(user, UserDTO.class))
                .orElseThrow(() -> new BadRequestException("User not found with email: " + email));
    }
}
