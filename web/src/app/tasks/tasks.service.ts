import {Injectable} from '@angular/core';
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

  deleteTask(id: number) {
    this.tasksAccessService.deleteTask(id).subscribe(() => {
      let deletedIndex = 0;
      for (let task of this.tasks) {
        if (task.id === id) {
          deletedIndex = this.tasks.indexOf(task);
          break;
        }
      }
      this.tasks.splice(deletedIndex, 1);
      // emit the updated tasks
      this.tasksChanged.next(this.tasks.slice());
    });
  }
}
