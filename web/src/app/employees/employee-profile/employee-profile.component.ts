import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee.model';
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee;
  constructor(private employeeService: EmployeeService) {}

  ngOnInit() {
    this.employeeService.getEmployee(sessionStorage.getItem('username'));
    this.employeeService.employeeChanged.subscribe((employeeData: Employee) => {
      this.employee = employeeData;
    });
  }

}
