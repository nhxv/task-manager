import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task.model';
import {TasksService} from '../tasks.service';
import {EmployeesService} from '../../employees/employees.service';
import {Employee} from '../../employees/employee.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  editMode: boolean = false;
  editedTask: Task;
  employeeList: Employee[];
  employeeNameSelected: string = '';

  constructor(private tasksService: TasksService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees;
    });
    this.initForm();
  }

  private initForm() {
    let name = '';
    let description = '';
    this.taskForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required)
    });
    this.tasksService.taskEdit.subscribe((id: number) => {
      // set edit mode to true when there is id being passed in
      this.editMode = true;
      // get the task that needed to be edited from tasks service
      this.editedTask = this.tasksService.getTask(id);
      this.taskForm.setValue({
        name: this.editedTask.name,
        description: this.editedTask.description
      })
    });
  }

  onAssignEmployee(employeeName: string) {
    console.log(employeeName);
    this.employeeNameSelected = employeeName;
  }

  onSubmit() {
    const taskInput = new Task(this.taskForm.get('name').value, this.taskForm.get('description').value);
    if (this.editMode) {
      // use editedTask.id and new edited taskInput
      this.tasksService.updateTask(this.editedTask.id, taskInput);
    } else {
      this.tasksService.createTask(taskInput);
    }
    this.editMode = false;
    this.taskForm.reset();
  }

}
