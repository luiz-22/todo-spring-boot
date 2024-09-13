package com.example.api.service;

import com.example.api.dto.UserDTO;
import com.example.api.exception.BadRequestException;

public interface IUserService {
    UserDTO getUserByEmail(String email) throws BadRequestException;
}
