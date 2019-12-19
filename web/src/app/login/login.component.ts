import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';
import {EmployeeService} from '../employees/employee.service';
import {TaskService} from '../tasks/task.service';
import {ArchiveService} from '../archives/archive.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = '';
  isInvalid: boolean = false;

  constructor(private router: Router, private loginService: LoginService, private employeeService: EmployeeService, private taskService: TaskService, private archiveService: ArchiveService) { }

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
      // success login
      localStorage.setItem('token', data.result.token);
      sessionStorage.setItem('username', loginPayload.username);
      sessionStorage.setItem('role', data.result.roles[0].name);
      // check user role then navigate
      switch(data.result.roles[0].name) {
        case 'ADMIN':
          this.router.navigate(['/tasks']);
          break;
        case 'USER':
          this.router.navigate(['/profile']);
          break;
        default:
          this.router.navigate(['/profile']);
      }
    }, errorMessage => {
      this.errorMessage = errorMessage;
      setInterval(() => {
        this.errorMessage = '';
      }, 2000);
    });
  }

  isEmptyField(field: string): boolean {
    if (!this.loginForm.get(field).valid && this.loginForm.get(field).touched) {
      return true;
    }
    return false;
  }
}
