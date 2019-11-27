import {Injectable} from '@angular/core';
import {Task} from './task.model';
import {TasksApiService} from '../api/tasks-api.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {EmployeesService} from '../employees/employees.service';

@Injectable({providedIn: 'root'})
export class TasksService {
  tasks: Task[] = [];
  tasksChanged = new BehaviorSubject<Task[]>(this.tasks.slice());
  taskEdit = new Subject<number>();

  constructor(private tasksAccessService: TasksApiService, private employeesService: EmployeesService) {
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
      // let employees service know that new task is created
      this.employeesService.changeEmployeeTask();
    }, (error) => console.log(error));
  }

  updateTask(id: number, task: Task) {
    this.tasksAccessService.updateTask(id, task).subscribe(() => {
      //get new task list, after task is updated from db
      this.tasksAccessService.getTaskList().subscribe((tasksData: Task[]) => {
        this.tasks = tasksData;
        this.tasksChanged.next(this.tasks.slice());
      });

      //let employees service knows that tasks is updated
      this.employeesService.changeEmployeeTask();
    });
  }

  getTask(id: number) {
    for (let task of this.tasks) {
      if (task.id === id) {
        return task;
      }
    }
  }

  deleteTask(id: number) {
    this.tasksAccessService.deleteTask(id).subscribe(() => {
      // get task based on id given, then find index of task in tasks array
      const deletedIndex = this.tasks.indexOf(this.getTask(id));
      // delete from tasks array, after knowing task was deleted from database
      this.tasks.splice(deletedIndex, 1);
      // emit updated tasks
      this.tasksChanged.next(this.tasks.slice());

      // let employees service know that task is deleted
      this.employeesService.changeEmployeeTask();
    });
  }
}
