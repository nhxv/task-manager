import { Component, OnInit } from '@angular/core';
import {EmployeesService} from '../employees.service';
import {Employee} from '../employee.model';
import {Subscription} from 'rxjs';
import {TasksService} from '../../tasks/tasks.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeListSub: Subscription;

  constructor(private employeesService: EmployeesService, private tasksService: TasksService) { }

  ngOnInit() {
    this.employeesService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees;
    });
  }

}
