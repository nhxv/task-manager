import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task.model';
import {TaskService} from '../task.service';
import {EmployeeService} from '../../employees/employee.service';
import {Employee} from '../../employees/employee.model';
import {first, single, take} from 'rxjs/operators';

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

  constructor(private taskService: TaskService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
    this.employeeService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = this.filterEmployee(employees);
      this.initForm();
    });
  }

  filterEmployee(employees: Employee[]): Employee[] {
    //return a list of employee without task
    const filteredEmployees: Employee[] = [];
    for (let employee of employees) {
      if (!employee.task) {
        filteredEmployees.push(employee);
      }
    }
    return filteredEmployees;
  }

  private initForm() {
    // default add form
    let name = '';
    let description = '';
    this.taskForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      description: new FormControl(description, Validators.required),
      employee: new FormControl(this.employeeList[0])
    });

    // edit form
    this.taskService.taskEdit.subscribe((id: number) => {
      // set edit mode to true when there is id being passed in
      this.editMode = true;
      // get the task that needed to be edited from task service
      this.editedTask = this.taskService.getTask(id);

      this.employeeSelected = this.editedTask.employee;
      // set value of edited task to form
      this.taskForm.setValue({
        name: this.editedTask.name,
        description: this.editedTask.description,
        employee: this.employeeList[0]
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

    //set task status to ASSIGN
    const status = 'ASSIGN';

    // create task object for submission
    const taskInput = new Task(this.taskForm.get('name').value, this.taskForm.get('description').value, this.employeeSelected, status);

    // if edit mode, update task; create task otherwise
    if (this.editMode) {
      // use editedTask.id and new edited taskInput
      this.taskService.updateTask(this.editedTask.id, taskInput);
    } else {
      this.taskService.createTask(taskInput);
    }
    // reset the form
    this.editMode = false;
    this.taskForm.reset();
    this.taskForm.get('employee').setValue(this.employeeList[0]);
    this.employeeSelected = null;
  }
}
