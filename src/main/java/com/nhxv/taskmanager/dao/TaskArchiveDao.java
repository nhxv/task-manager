package com.nhxv.taskmanager.dao;

import com.nhxv.taskmanager.model.TaskArchive;

import java.util.List;

public interface TaskArchiveDao {
    List<TaskArchive> findTaskArchives(String searchText);
}
