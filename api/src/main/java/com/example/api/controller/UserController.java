package com.example.api.controller;

import com.example.api.dto.UserDTO;
import com.example.api.exception.BadRequestException;
import com.example.api.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private IUserService userService;

    @GetMapping("/user-info")
    public ResponseEntity<UserDTO> getUserInfo(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");

        try {
            UserDTO userDTO;
            userDTO = userService.getUserByEmail(email);
            return ResponseEntity.ok(userDTO);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
