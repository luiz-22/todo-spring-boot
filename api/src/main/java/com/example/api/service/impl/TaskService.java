package com.example.api.service.impl;

import com.example.api.dto.TaskDTO;
import com.example.api.entity.Task;
import com.example.api.entity.User;
import com.example.api.exception.BadRequestException;
import com.example.api.repository.ITaskRepository;
import com.example.api.repository.IUserRepository;
import com.example.api.service.ITaskService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class TaskService implements ITaskService {

    @Autowired
    private ITaskRepository taskRepository;

    @Autowired
    private IUserRepository userRepository;

    @Autowired
    private ObjectMapper mapper;

    @Override
    public void createTask(TaskDTO taskDTO, String email) throws BadRequestException {
        if (taskDTO == null) {
            throw new BadRequestException("Task cannot be null");
        }
        
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isEmpty()) {
            throw new BadRequestException("User not found");
        }

        Task task = mapper.convertValue(taskDTO, Task.class);
        task.setUser(userOptional.get());
        task.setDone(false);
        taskRepository.save(task);
    }

    @Override
    public Set<TaskDTO> getTasks(Long userId) throws BadRequestException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new BadRequestException("User not found");
        }
        List<Task> tasks = taskRepository.findByUser(userOptional.get(), Sort.by(Sort.Direction.ASC, "id"));
        return tasks.stream().map(task -> {
            TaskDTO taskDTO = mapper.convertValue(task, TaskDTO.class);
            taskDTO.setUserId(task.getUser().getId());
            return taskDTO;
        }).collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public void updateTask(TaskDTO taskDTO) throws BadRequestException {
        if (taskDTO == null || taskDTO.getId() == null) {
            throw new BadRequestException("Task or task ID cannot be null");
        }
        Optional<Task> taskOptional = taskRepository.findById(taskDTO.getId());
        if (taskOptional.isEmpty()) {
            throw new BadRequestException("Task not found");
        }

        Task task = taskOptional.get();
        task.setDone(taskDTO.isDone());
        taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public void deleteCompletedTasks(Long userId) throws BadRequestException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new BadRequestException("User not found");
        }
        Set<Task> completedTasks = taskRepository.findByUser(userOptional.get(), Sort.unsorted())
                .stream()
                .filter(Task::isDone)
                .collect(Collectors.toSet());

        taskRepository.deleteAll(completedTasks);
    }

    @Override
    public void deleteAllTasks(Long userId) throws BadRequestException {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new BadRequestException("User not found");
        }
        Set<Task> userTasks = taskRepository.findByUser(userOptional.get(), Sort.unsorted())
                .stream()
                .collect(Collectors.toSet());

        taskRepository.deleteAll(userTasks);
    }
}
