package com.nhxv.taskmanager.config;

import com.nhxv.taskmanager.model.Employee;
import com.nhxv.taskmanager.model.Role;
import com.nhxv.taskmanager.repository.EmployeeRepository;
import com.nhxv.taskmanager.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataLoader implements ApplicationRunner {
    private EmployeeRepository employeeRepository;
    private RoleRepository roleRepository;

    @Autowired
    public DataLoader(EmployeeRepository employeeRepository, RoleRepository roleRepository) {
        this.employeeRepository = employeeRepository;
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (this.employeeRepository.findAll().isEmpty()) {
            Employee admin = new Employee();
            admin.setEmail("admin@gmail.com");
            admin.setName("Admin");
            admin.setPassword("$2y$12$D3wl929Xy6N9f01GjSWBy.rwFl7R9xPMaT76sgvdEoeII6NqVA8OO");
            admin.setUsername("admin");
            Set<Role> roles = new HashSet<>();
            roles.add(new Role(Role.ADMIN));
            admin.setRoles(roles);
            this.employeeRepository.save(admin);
            this.roleRepository.save(new Role(Role.USER));
        }
    }
}
