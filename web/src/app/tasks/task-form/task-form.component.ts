import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task.model';
import {TasksService} from '../tasks.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private tasksService: TasksService) { }

  ngOnInit() {
    this.initForm();
  }

  private initForm() {
    let name = '';
    let description = '';
    this.taskForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required)
    });
  }

  onSubmit() {
    const task = new Task(this.taskForm.get('name').value, this.taskForm.get('description').value);
    this.tasksService.createTask(task);
    this.taskForm.reset();
  }

}
