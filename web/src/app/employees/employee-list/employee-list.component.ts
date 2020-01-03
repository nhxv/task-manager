import {Component, OnDestroy, OnInit} from '@angular/core';
import {EmployeeService} from '../employee.service';
import {Employee} from '../employee.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../../tasks/task.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employeeList: Employee[] = [];
  employeeListSub: Subscription;

  constructor(private employeeService: EmployeeService, private taskService: TaskService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
    this.employeeListSub = this.employeeService.employeesChanged.subscribe((employeeData: Employee[]) => {
      this.employeeList = employeeData;
    });
  }

  onDeleteEmployee(employee: Employee) {
    if (employee.task) {
      this.taskService.deleteTask(employee.task.id);
    }
    this.employeeService.deleteEmployee(employee.id);
  }

  ngOnDestroy(): void {
    this.employeeListSub.unsubscribe();
  }

}
