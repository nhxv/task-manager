package com.xv.mytodo.controller;

import com.xv.mytodo.exception.ResourceNotFoundException;
import com.xv.mytodo.model.Task;
import com.xv.mytodo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class TaskController {
    private TaskRepository taskRepository;

    @Autowired
    public TaskController(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/tasks")
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @GetMapping("/tasks/{id}")
    public ResponseEntity<Task> getTaskById(@PathVariable(value = "id") Long taskId) throws ResourceNotFoundException {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task not found for this id: " + taskId));
        return ResponseEntity.ok().body(task);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/tasks")
    public Task createTask(@Valid @RequestBody Task task) {
        return taskRepository.save(task);
    }

    @PreAuthorize("hasAnyRole('USER', 'ADMIN')")
    @PutMapping("/tasks/{id}")
    public ResponseEntity<Task> updateTask(@PathVariable(value = "id") Long taskId, @Valid @RequestBody Task taskUpdate) throws ResourceNotFoundException {
        System.out.println(taskUpdate);
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task not found for this id: " + taskId));
        task.setName(taskUpdate.getName());
        task.setDescription(taskUpdate.getDescription());
        System.out.println(taskUpdate);
        task.setStatus(taskUpdate.getStatus());
        task.setEmployee(taskUpdate.getEmployee());
        return ResponseEntity.ok(taskRepository.save(task));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/tasks/{id}")
    public Map<String, Boolean> deleteTask(@PathVariable(value = "id") Long taskId) throws ResourceNotFoundException {
        Task task = taskRepository.findById(taskId).orElseThrow(() -> new ResourceNotFoundException("Task not found for this id: " + taskId));
        taskRepository.delete(task);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }
}
