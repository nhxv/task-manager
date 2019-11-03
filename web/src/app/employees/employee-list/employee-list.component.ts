import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeesService} from '../employees.service';
import {Employee} from '../employee.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = [];
  employeeListSub: Subscription;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeeListSub = this.employeesService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees;
    });
  }

  ngOnDestroy(): void {
    this.employeeListSub.unsubscribe();
  }

}
