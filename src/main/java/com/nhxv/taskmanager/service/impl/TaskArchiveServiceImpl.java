package com.nhxv.taskmanager.service.impl;

import com.nhxv.taskmanager.dao.TaskArchiveDao;
import com.nhxv.taskmanager.model.TaskArchive;
import com.nhxv.taskmanager.service.TaskArchiveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TaskArchiveServiceImpl implements TaskArchiveService {

    private TaskArchiveDao taskArchiveDao;

    @Autowired
    public TaskArchiveServiceImpl(TaskArchiveDao taskArchiveDao) {
        this.taskArchiveDao = taskArchiveDao;
    }

    @Override
    @Transactional
    public List<TaskArchive> findTaskArchives(String searchText) {
        return taskArchiveDao.findTaskArchives(searchText);
    }
}
