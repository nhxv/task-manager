package com.xv.mytodo.controller;

import com.xv.mytodo.config.JwtTokenUtil;
import com.xv.mytodo.model.ApiResponse;
import com.xv.mytodo.model.AuthToken;
import com.xv.mytodo.model.Employee;
import com.xv.mytodo.model.LoginEmployee;
import com.xv.mytodo.service.EmployeeService;
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

    @RequestMapping(value = "/get-token", method = RequestMethod.POST)
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

