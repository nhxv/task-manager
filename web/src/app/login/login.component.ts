import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isInvalid = false;

  constructor(private router: Router, private authService: AuthService) { }

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
    // check user login
    if (this.authService.authenticate(this.loginForm.get('username').value, this.loginForm.get('password').value)) {
      this.router.navigate(['tasks']);
      this.isInvalid = false;
    } else {
      this.isInvalid = true;
    }
  }
}
