import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../employees.service';
import {Employee} from '../employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];
  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees;
    });
  }

}
