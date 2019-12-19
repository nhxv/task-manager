import { Component, OnInit } from '@angular/core';
import {Employee} from '../employee.model';
import {EmployeeService} from '../employee.service';
import {TaskService} from '../../tasks/task.service';
import {Task} from 'src/app/tasks/task.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeEditComponent} from '../employee-edit/employee-edit.component';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  employee: Employee;
  isDoing: boolean;
  isDone: boolean;

  constructor(private employeeService: EmployeeService, private taskService: TaskService, private modalService: NgbModal) {}

  ngOnInit() {
    //load employee logging in
    this.employeeService.getEmployee(sessionStorage.getItem('username'));
    this.employeeService.employeeChanged.subscribe((employeeData: Employee) => {
      this.employee = employeeData;
      if (this.employee.task) {
        this.isDoing = this.employee.task.status === 'DOING';
        this.isDone = this.employee.task.status === 'DONE';
      }
    });
  }

  onEdit() {
    this.modalService.open(EmployeeEditComponent);
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

}
