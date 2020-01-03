import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Task} from '../task.model';
import {TaskService} from '../task.service';
import {EmployeeService} from '../../employees/employee.service';
import {Employee} from '../../employees/employee.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  editMode: boolean = false;
  editedTask: Task;
  employeeList: Employee[];
  employeeListInEdit: Employee[];
  employeeSelected: Employee = null;
  errorMessage: string = null;

  constructor(private taskService: TaskService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployeeList();
    this.employeeService.employeesChanged.subscribe((employees: Employee[]) => {
      this.employeeList = employees.filter(employee => !employee.task);
      this.initForm();
    });
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
    this.taskService.taskEdit.pipe(first()).subscribe((id: number) => {
      // set edit mode to true when there is id being passed in
      this.editMode = true;

      // get the task that needed to be edited from task service
      this.editedTask = this.taskService.getTask(id);

      // set up employeeList in edit mode
      this.employeeListInEdit = this.employeeList.slice();
      this.employeeListInEdit.unshift(this.editedTask.employee);

      //auto select employee of the edited task
      this.employeeSelected = this.editedTask.employee;

      // set value of edited task to form
      this.taskForm.setValue({
        name: this.editedTask.name,
        description: this.editedTask.description,
        employee: this.employeeListInEdit[0]
      })
    });
  }

  onAssignEmployee(employee: Employee) {
    this.employeeSelected = employee;
  }

  onSubmit() {
    // invalid form
    if (!this.taskForm.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }

    // no more employee to assign task
    if (this.employeeList.length === 0 && !this.editMode) {
      this.errorMessage = 'No employee available.';
      setTimeout(() => {
        this.errorMessage = null;
      }, 2000);
      return;
    }

    // auto select first employee if none is selected
    if (!this.employeeSelected && this.employeeList[0] && !this.editMode) {
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

  isEmptyField(field: string): boolean {
    if (!this.taskForm.get(field).valid && this.taskForm.get(field).touched) {
      return true;
    }
    return false;
  }
}
