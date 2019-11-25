import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../employees/employee.model';
import {EmployeesAccessService} from '../data-access/employees-access.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router, private employeesAccessService: EmployeesAccessService) { }

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
    this.employeesAccessService.createEmployee(newEmployee);
    this.router.navigate(['/login']);
  }
}
