import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = [];
  employeeListSub: Subscription;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
    this.employeeListSub = this.employeeService.employeesChanged.subscribe((employeeData: Employee[]) => {
      this.employeeList = employeeData;
    });
  }

  ngOnDestroy(): void {
    this.employeeListSub.unsubscribe();
  }

}
