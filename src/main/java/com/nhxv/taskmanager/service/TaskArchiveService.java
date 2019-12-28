package com.nhxv.taskmanager.service;

import com.nhxv.taskmanager.model.TaskArchive;

import java.util.List;

public interface TaskArchiveService {
    List<TaskArchive> findTaskArchives(String searchText);
}
