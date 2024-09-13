package com.example.api.controller;

import com.example.api.dto.TaskDTO;
import com.example.api.exception.BadRequestException;
import com.example.api.service.ITaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashSet;
import java.util.Set;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private ITaskService taskService;

    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskDTO taskDTO, @AuthenticationPrincipal OAuth2User principal) {
        try {
            String email = principal.getAttribute("email");

            taskService.createTask(taskDTO, email);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public Set<TaskDTO> getTasks(@PathVariable Long userId) {
        try {
            return taskService.getTasks(userId);
        } catch (BadRequestException e) {
            return new LinkedHashSet<>();
        }
    }

    @PutMapping
    public ResponseEntity<?> updateTask(@Valid @RequestBody TaskDTO taskDTO) {
        try {
            taskService.updateTask(taskDTO);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    @DeleteMapping("/completed/{userId}")
    public ResponseEntity<?> deleteCompletedTasks(@PathVariable Long userId) {
        try {
            taskService.deleteCompletedTasks(userId);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @DeleteMapping("/all/{userId}")
    public ResponseEntity<?> deleteAllTasks(@PathVariable Long userId) {
        try {
            taskService.deleteAllTasks(userId);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (BadRequestException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}