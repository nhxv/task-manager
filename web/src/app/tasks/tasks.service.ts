import {Injectable, OnInit} from '@angular/core';
import {Task} from './task.model';
import {TasksAccessService} from '../data-access/tasks-access.service';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksService {
  tasks: Task[] = [];
  tasksChanged = new Subject<Task[]>();
  constructor(private tasksAccessService: TasksAccessService) {
    tasksAccessService.getTaskList().subscribe((tasksData: Task[]) => {
      this.tasks = tasksData;
      this.tasksChanged.next(this.tasks);
    });

  }

  createTask(task: Task) {
    this.tasksAccessService.createTask(task).subscribe(() => {
      this.tasks.push(task);
      // emit the updated tasks
      this.tasksChanged.next(this.tasks.slice());
    }, (error) => console.log(error));
  }
}
