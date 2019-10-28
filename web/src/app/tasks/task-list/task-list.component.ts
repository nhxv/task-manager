import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {TasksAccessService} from '../../data-access/tasks-access.service';
import {Observable, Subscription} from 'rxjs';
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

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }


  loadList() {

  }
}
