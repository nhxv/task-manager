package com.nhxv.taskmanager.repository;

import com.nhxv.taskmanager.model.TaskArchive;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskArchiveRepository extends JpaRepository<TaskArchive, Long> {
    List<TaskArchive> findByNameContaining(String name);
}
