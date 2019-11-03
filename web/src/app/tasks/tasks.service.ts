import {Injectable} from '@angular/core';
import {Task} from './task.model';
import {TasksAccessService} from '../data-access/tasks-access.service';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TasksService {
  tasks: Task[] = [];
  tasksChanged = new BehaviorSubject<Task[]>(this.tasks.slice());
  taskEdit = new Subject<number>();

  constructor(private tasksAccessService: TasksAccessService) {
    tasksAccessService.getTaskList().subscribe((tasksData: Task[]) => {
      this.tasks = tasksData;
      this.tasksChanged.next(this.tasks.slice());
    });
  }

  createTask(task: Task) {
    this.tasksAccessService.createTask(task).subscribe(() => {
      this.tasksAccessService.getTaskList().subscribe((tasksData: Task[]) => {
        // subscribe to get tasks data (specifically the primary key of each task) from the database
        this.tasks = tasksData;
        // emit the updated tasks
        this.tasksChanged.next(this.tasks.slice());
      });
    }, (error) => console.log(error));
  }

  updateTask(id: number, task: Task) {
    this.tasksAccessService.updateTask(id, task).subscribe(() => {
      //get new task list, after task is updated from db
      this.tasksAccessService.getTaskList().subscribe((tasksData: Task[]) => {
        this.tasks = tasksData;
        this.tasksChanged.next(this.tasks.slice());
      });
    });
  }

  getTask(id: number) {
    for (let task of this.tasks) {
      if (task.id === id) {
        return task;
      }
    }
  }

  getTasks() {
    return this.tasks.slice();
  }

  deleteTask(id: number) {
    this.tasksAccessService.deleteTask(id).subscribe(() => {
      // get task based on id given, then find index of task in tasks array
      const deletedIndex = this.tasks.indexOf(this.getTask(id));
      // delete from tasks array, after knowing task was deleted from database
      this.tasks.splice(deletedIndex, 1);
      // emit updated tasks
      this.tasksChanged.next(this.tasks.slice());
    });
  }
}
