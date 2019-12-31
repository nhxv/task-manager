import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Employee} from '../employees/employee.model'
import {Router} from '@angular/router';
import {EmployeeService} from '../employees/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private router: Router, private employeeService: EmployeeService) { }

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
    this.employeeService.createEmployee(newEmployee);
    this.router.navigate(['/login']);
  }

  isEmptyField(field: string): boolean {
    if (!this.registerForm.get(field).valid && this.registerForm.get(field).touched) {
      return true;
    }
    return false;
  }
}
