import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployeesService} from '../employees.service';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    let name = '';
    let email = '';
    this.employeeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      email: new FormControl(email, Validators.required)
    });
  }

  onSubmit() {
    const employeeInput = new Employee(this.employeeForm.get('name').value, this.employeeForm.get('email').value);
    this.employeesService.createEmployee(employeeInput);
    this.employeeForm.reset();
  }
}
