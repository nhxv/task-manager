package com.xv.mytodo.service.impl;

import com.xv.mytodo.model.Employee;
import com.xv.mytodo.model.EmployeeDto;
import com.xv.mytodo.model.Role;
import com.xv.mytodo.repository.EmployeeRepository;
import com.xv.mytodo.service.EmployeeService;
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
    private BCryptPasswordEncoder bcryptEncoder;

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);
        if(employee == null){
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
        newEmployee.setUsername(employee.getUsername());
        newEmployee.setPassword(bcryptEncoder.encode(employee.getPassword()));
        newEmployee.setName(employee.getName());
        newEmployee.setEmail(employee.getEmail());
        return employeeRepository.save(newEmployee);
    }
}

