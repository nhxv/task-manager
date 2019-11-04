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
  employeeSelected: Employee = null;

  constructor(private tasksService: TasksService, private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeesService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let description = '';
    this.taskForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      employee: new FormControl(this.employeeList[0])
    });

    this.tasksService.taskEdit.subscribe((id: number) => {
      // set edit mode to true when there is id being passed in
      this.editMode = true;
      // get the task that needed to be edited from tasks service
      this.editedTask = this.tasksService.getTask(id);
      // find employee index in dropdown list
      let index = 0;
      for (let employee of this.employeeList) {
        if (employee.id === this.editedTask.employee.id) {
          index = this.employeeList.indexOf(employee);
        }
      }
      // set value of employee selected, to employee of edited task
      this.employeeSelected = this.editedTask.employee;
      // set value of edited task to form
      this.taskForm.setValue({
        name: this.editedTask.name,
        description: this.editedTask.description,
        employee: this.employeeList[index]
      })
    });
  }

  onAssignEmployee(employee: Employee) {
    this.employeeSelected = employee;
  }

  onSubmit() {
    // auto select first employee if none is selected
    if (!this.employeeSelected && this.employeeList[0]) {
      this.employeeSelected = this.employeeList[0];
    }
    // to avoid violate db relationship
    this.employeeSelected.task = null;
    // send new task-employee relationship to employee service
    this.employeesService.updateEmployee(this.employeeSelected.id, this.employeeSelected);
    // create task object for submission
    const taskInput = new Task(this.taskForm.get('name').value, this.taskForm.get('description').value, this.employeeSelected);

    //if edit mode update task, create task otherwise
    if (this.editMode) {
      // use editedTask.id and new edited taskInput
      console.log('Update task info: ' + JSON.stringify(taskInput));
      this.tasksService.updateTask(this.editedTask.id, taskInput);
    } else {
      console.log('Create task info: ' + JSON.stringify(taskInput));
      this.tasksService.createTask(taskInput);
    }
    // reset the form
    this.editMode = false;
    this.taskForm.reset();
    this.taskForm.get('employee').setValue(this.employeeList[0]);
    this.employeeSelected = null;
  }

}
