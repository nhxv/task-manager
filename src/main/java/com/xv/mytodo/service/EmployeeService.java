package com.xv.mytodo.service;

import com.xv.mytodo.model.Employee;
import com.xv.mytodo.model.EmployeeDto;
import org.springframework.stereotype.Component;

import java.util.List;

public interface EmployeeService {
    Employee save(EmployeeDto user);
    List<Employee> findAll();
    void delete(long id);
    Employee findOne(String username);
    Employee findById(Long id);
}
