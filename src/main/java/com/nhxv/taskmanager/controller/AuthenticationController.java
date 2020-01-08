package com.nhxv.taskmanager.controller;

import com.nhxv.taskmanager.config.JwtTokenUtil;
import com.nhxv.taskmanager.model.ApiResponse;
import com.nhxv.taskmanager.model.AuthToken;
import com.nhxv.taskmanager.model.Employee;
import com.nhxv.taskmanager.model.LoginEmployee;
import com.nhxv.taskmanager.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private EmployeeService employeeService;

    @PostMapping(value = "/login")
    public ApiResponse<AuthToken> getToken(@RequestBody LoginEmployee loginEmployee) throws AuthenticationException {
        final Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                        loginEmployee.getUsername(),
                        loginEmployee.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);
        final Employee employee = employeeService.findOne(loginEmployee.getUsername());
        final String token = jwtTokenUtil.generateToken(authentication);
        return new ApiResponse<>(200, "success", new AuthToken(token, employee.getRoles()));
    }
}

