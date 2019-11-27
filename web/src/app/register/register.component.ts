import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../employees/employee.model';
import {EmployeeApiService} from '../api/employee-api.service';
import {Router} from '@angular/router';
import {EmployeesService} from '../employees/employees.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  onSubmit() {
    const newEmployee: Employee = new Employee(
      this.registerForm.get('username').value,
      this.registerForm.get('password').value,
      this.registerForm.get('name').value,
      this.registerForm.get('email').value
    );
    this.employeesService.createEmployee(newEmployee);
    this.router.navigate(['/login']);
  }
}
