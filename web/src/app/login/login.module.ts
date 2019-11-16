import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {RouterModule} from '@angular/router';
import {LoginRoutingModule} from './login-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    RouterModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginModule {}
