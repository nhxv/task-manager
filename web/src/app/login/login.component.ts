import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {LoginService} from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalid: boolean = false;

  constructor(private router: Router, private loginService: LoginService) { }

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
        console.log(JSON.stringify(data));
        window.localStorage.setItem('token', data.result.token);
        sessionStorage.setItem('username', this.loginForm.get('username').value);
        // check user role before navigate
        switch(data.result.roles[0].name) {
          case 'ADMIN':
            this.router.navigate(['/tasks']);
            break;
          case 'USER':
            this.router.navigate(['/employees']);
            break;
          default:
            this.router.navigate(['/employees']);
        }
      } else {
        this.isInvalid = true;
        alert(data.message);
      }
    });

    // check user login
    // if (this.authService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value)) {
    //   this.router.navigate(['tasks']);
    //   this.isInvalid = false;
    // } else {
    //   this.isInvalid = true;
    // }
  }
}
