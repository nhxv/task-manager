import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {EmployeesService} from '../employees/employees.service';
import {TasksService} from '../tasks/tasks.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalid: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private employeesService: EmployeesService, private tasksService: TasksService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    //check if login is valid
    if (this.isInvalid) {
      return;
    }
    const loginPayload = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.loginService.login(loginPayload).subscribe((data:any) => {
      if (data.status === 200) {
        localStorage.setItem('token', data.result.token);
        sessionStorage.setItem('username', this.loginForm.get('username').value);
        sessionStorage.setItem('role', data.result.roles[0].name);
        // check user role before navigate
        switch(data.result.roles[0].name) {
          case 'ADMIN':
            this.employeesService.getEmployeeList();
            this.tasksService.getTaskList();
            this.router.navigate(['/tasks']);
            break;
          case 'USER':
            this.router.navigate(['/profile']);
            break;
          default:
            this.router.navigate(['/profile']);
        }
      } else {
        this.isInvalid = true;
        alert(data.message);
      }
    });
  }
}
