package com.nhxv.taskmanager.repository;

import com.nhxv.taskmanager.model.TaskArchive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskArchiveRepository extends JpaRepository<TaskArchive, Long> {
}
