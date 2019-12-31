import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../task.service';
import {ArchiveService} from '../../archives/archive.service';
import {Archive} from '../../archives/archive.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html'
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[];
  taskListSub: Subscription;

  constructor(private taskService: TaskService, private archiveService: ArchiveService) {}

  ngOnInit(): void {
    this.taskService.getTaskList();
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

  onArchiveTask(task: Task) {
    // confirm task done, move to archive
    const archive: Archive = new Archive(task.name, task.description, task.employee.name);
    this.archiveService.createArchive(archive);
    this.onDeleteTask(task.id);
  }

  setTaskColor(task) {
    switch(task.status) {
      case 'ASSIGN':
        return 'text-danger';
      case 'DOING':
        return 'text-warning';
      case 'DONE':
        return 'text-success';
    }
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }
}
