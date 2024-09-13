package com.example.api.service;

import com.example.api.dto.TaskDTO;
import com.example.api.exception.BadRequestException;

import java.util.Set;

public interface ITaskService {
    void createTask(TaskDTO taskDTO, String email) throws BadRequestException;
    Set<TaskDTO> getTasks(Long userId) throws BadRequestException;
    void updateTask(TaskDTO taskDTO) throws BadRequestException;
    void deleteTask(Long id);
    void deleteCompletedTasks(Long userId) throws BadRequestException;
    void deleteAllTasks(Long userId) throws BadRequestException;
}
