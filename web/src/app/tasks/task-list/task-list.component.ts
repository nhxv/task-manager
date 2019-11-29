import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[];
  taskListSub: Subscription;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    // reload task list after add/delete task
    this.taskListSub = this.taskService.tasksChanged.subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  onDeleteTask(id: number) {
    this.taskService.deleteTask(id);
  }

  onEditTask(id: number) {
    // pass the id to task-form
    this.taskService.taskEdit.next(id);
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }
}
