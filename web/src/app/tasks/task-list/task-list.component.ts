import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {Subscription} from 'rxjs';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[];
  taskListSub: Subscription;

  constructor(private tasksService: TasksService) {}

  ngOnInit(): void {
    this.taskListSub = this.tasksService.tasksChanged.subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  onDeleteTask(id: number) {
    this.tasksService.deleteTask(id);
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }


}
