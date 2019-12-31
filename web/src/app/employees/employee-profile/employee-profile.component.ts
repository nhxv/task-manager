import {Component, OnDestroy, OnInit} from '@angular/core';
import {Employee} from '../employee.model';
import {EmployeeService} from '../employee.service';
import {TaskService} from '../../tasks/task.service';
import {Task} from 'src/app/tasks/task.model';
import {EmployeeApiService} from '../../api/employee-api.service';
import {Subscription} from 'rxjs';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html'
})
export class EmployeeProfileComponent implements OnInit, OnDestroy {
  employee: Employee;
  employeeSub: Subscription;
  isDoing: boolean;
  isDone: boolean;

  constructor(private employeeService: EmployeeService, private taskService: TaskService, private employeeApiService: EmployeeApiService) {}

  ngOnInit() {
    // get employee from database
    this.employeeApiService.getEmployeeByUsername(sessionStorage.getItem('username')).pipe(take(1)).subscribe((employeeData: Employee) => {
      this.employee = employeeData;
      // set employee data to employee service
      this.employeeService.setEmployee(this.employee);
      }
    );

    // get employee from employee service
    this.employeeSub = this.employeeService.employeeChanged.subscribe((employeeData: Employee) => {
      this.employee = employeeData;
      if (this.employee.task) {
        this.isDoing = this.employee.task.status === 'DOING';
        this.isDone = this.employee.task.status === 'DONE';
      }
    });
  }

  onAccept() {
    this.updateStatus('DOING');
    this.isDoing = true;
  }

  onDone() {
    this.updateStatus('DONE');
    this.isDoing = false;
    this.isDone = true;
  }

  private updateStatus(status: string) {
    this.employee.task.status = status;
    let employeeClone = {...this.employee};
    employeeClone.task = null;
    const id: number = this.employee.task.id;
    const task: Task = new Task(this.employee.task.name, this.employee.task.description, employeeClone, this.employee.task.status);
    this.taskService.updateTask(id, task);
  }

  setBtnColor() {
    if (!this.isDoing && !this.isDone) {
      return 'btn-primary';
    }

    if(this.isDoing) {
      return 'btn-success';
    }
  }

  setTaskColor() {
    if (this.employee.task) {
      switch(this.employee.task.status) {
        case 'ASSIGN':
          return 'bg-danger';
        case 'DOING':
          return 'bg-warning';
        case 'DONE':
          return 'bg-success';
      }
    }
  }

  ngOnDestroy(): void {
    this.employeeSub.unsubscribe();
  }
}
