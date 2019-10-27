import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task.model';
import {TaskStorageService} from '../../data-storage/task-storage.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;

  constructor(private taskStorageService: TaskStorageService) { }

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
    this.taskStorageService.createTask(task).subscribe(data => console.log(data), error => console.log(error));
    this.taskForm.reset();
  }

}
