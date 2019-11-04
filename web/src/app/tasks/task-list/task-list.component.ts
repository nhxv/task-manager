import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {Subscription} from 'rxjs';
import {TasksService} from '../tasks.service';
import {EmployeesService} from '../../employees/employees.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[];
  taskListSub: Subscription;

  constructor(private tasksService: TasksService, private employeesService: EmployeesService) {}

  ngOnInit(): void {
    // reload task list after navigate
    // this.taskList = this.tasksService.getTasks().reverse();

    // reload task list after add/delete task
    this.taskListSub = this.tasksService.tasksChanged.subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  onDeleteTask(id: number) {
    for (let task of this.taskList) {
      if (task.id === id) {
        console.log('Update employee: ' + task.employee.id, task.employee);
        this.employeesService.updateEmployee(task.employee.id, task.employee);
      }
    }
    this.tasksService.deleteTask(id);
  }

  onEditTask(id: number) {
    // pass the id to task-form
    this.tasksService.taskEdit.next(id);
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }
}
