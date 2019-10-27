import { Component, OnInit } from '@angular/core';
import {Task} from '../task.model';
import {TaskStorageService} from '../../data-storage/task-storage.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  constructor(private taskStorageService: TaskStorageService) { }

  ngOnInit() {
    this.loadTaskList();
  }

  loadTaskList() {
    this.taskStorageService.getTaskList().subscribe((taskData: Task[]) => {
      this.tasks = taskData;
    });
  }
}
