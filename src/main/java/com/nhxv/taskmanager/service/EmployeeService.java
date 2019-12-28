package com.nhxv.taskmanager.service;

import com.nhxv.taskmanager.model.Employee;
import com.nhxv.taskmanager.model.EmployeeDto;

import java.util.List;

public interface EmployeeService {
    Employee save(EmployeeDto user);
    List<Employee> findAll();
    void delete(long id);
    Employee findOne(String username);
    Employee findById(Long id);
}
