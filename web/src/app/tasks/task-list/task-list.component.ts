import {Component, OnDestroy, OnInit} from '@angular/core';
import {Task} from '../task.model';
import {Subscription} from 'rxjs';
import {TaskService} from '../task.service';
import {ArchiveService} from '../../archives/archive.service';
import {Archive} from '../../archives/archive.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  taskList: Task[];
  taskListSub: Subscription;
  isEdit: boolean = false;

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
    this.isEdit = true;
  }

  onArchiveTask(task: Task) {
    // confirm task done, move to archive
    const archive: Archive = new Archive(task.name, task.description, task.employee.name);
    this.archiveService.createArchive(archive);
    this.onDeleteTask(task.id);
  }

  ngOnDestroy(): void {
    this.taskListSub.unsubscribe();
  }
}
