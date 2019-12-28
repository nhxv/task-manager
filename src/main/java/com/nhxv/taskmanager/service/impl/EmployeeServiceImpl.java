package com.nhxv.taskmanager.service.impl;

import com.nhxv.taskmanager.model.Employee;
import com.nhxv.taskmanager.model.EmployeeDto;
import com.nhxv.taskmanager.model.Role;
import com.nhxv.taskmanager.repository.EmployeeRepository;
import com.nhxv.taskmanager.repository.RoleRepository;
import com.nhxv.taskmanager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service(value = "userService")
public class EmployeeServiceImpl implements UserDetailsService, EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);
        if (employee == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(employee.getUsername(), employee.getPassword(), getAuthority(employee));
    }

    private Set<SimpleGrantedAuthority> getAuthority(Employee user) {
        Set<SimpleGrantedAuthority> authorities = new HashSet<>();
        user.getRoles().forEach(role -> {
            //authorities.add(new SimpleGrantedAuthority(role.getName()));
            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getName()));
        });
        return authorities;
        //return Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN"));
    }

    public List<Employee> findAll() {
        List<Employee> list = new ArrayList<>();
        employeeRepository.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public void delete(long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public Employee findOne(String username) {
        return employeeRepository.findByUsername(username);
    }

    @Override
    public Employee findById(Long id) {
        return employeeRepository.findById(id).get();
    }

    @Override
    public Employee save(EmployeeDto employee) {
        Employee newEmployee = new Employee();
        // auto set role to USER
        Role userRole = this.roleRepository.findById(Long.valueOf(2)).get();
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        newEmployee.setUsername(employee.getUsername());
        newEmployee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        newEmployee.setName(employee.getName());
        newEmployee.setEmail(employee.getEmail());
        newEmployee.setRoles(roles);
        return employeeRepository.save(newEmployee);
    }
}

