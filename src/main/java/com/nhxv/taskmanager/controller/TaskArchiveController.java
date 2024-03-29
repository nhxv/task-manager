package com.nhxv.taskmanager.controller;

import com.nhxv.taskmanager.exception.ResourceNotFoundException;
import com.nhxv.taskmanager.model.TaskArchive;
import com.nhxv.taskmanager.repository.TaskArchiveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class TaskArchiveController {
    private TaskArchiveRepository taskArchiveRepository;
    @Autowired
    public TaskArchiveController(TaskArchiveRepository taskArchiveRepository) {
        this.taskArchiveRepository = taskArchiveRepository;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/task-archives")
    public List<TaskArchive> getAllTaskArchives() {
        return this.taskArchiveRepository.findAll();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/task-archives/{id}")
    public ResponseEntity<TaskArchive> getTaskArchive(@PathVariable(value = "id") long taskArchiveId) throws ResourceNotFoundException {
        TaskArchive taskArchive = this.taskArchiveRepository.findById(taskArchiveId).orElseThrow(() -> new ResourceNotFoundException("Task archive not found: " + taskArchiveId));
        return ResponseEntity.ok().body(taskArchive);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/task-archives/search")
    public List<TaskArchive> findTaskArchives(@RequestParam(value="q", required = false) String searchText) {
        return this.taskArchiveRepository.findByNameContaining(searchText);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/task-archives")
    public TaskArchive createArchive(@Valid @RequestBody TaskArchive taskArchive) {
        return this.taskArchiveRepository.save(taskArchive);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/task-archives/{id}")
    public ResponseEntity<TaskArchive> updateTaskArchive(@PathVariable(value = "id") long taskArchiveId, @Valid @RequestBody TaskArchive taskArchiveUpdate) throws ResourceNotFoundException {
        TaskArchive taskArchive = this.taskArchiveRepository.findById(taskArchiveId).orElseThrow(() -> new ResourceNotFoundException("Task archive not found: " + taskArchiveId));
        taskArchive.setName(taskArchiveUpdate.getName());
        taskArchive.setDescription(taskArchiveUpdate.getDescription());
        taskArchive.setEmployeeName(taskArchiveUpdate.getEmployeeName());
        return ResponseEntity.ok(taskArchiveRepository.save(taskArchive));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/task-archives/{id}")
    public Map<String, Boolean> deleteArchive(@PathVariable(value = "id") long taskArchiveId) throws ResourceNotFoundException {
        TaskArchive taskArchive = this.taskArchiveRepository.findById(taskArchiveId).orElseThrow(() -> new ResourceNotFoundException("Task archive not found: " + taskArchiveId));
        taskArchiveRepository.delete(taskArchive);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return response;
    }


}
