package com.xv.mytodo.repository;

import com.xv.mytodo.model.TaskArchive;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskArchiveRepository extends JpaRepository<TaskArchive, Long> {
}
