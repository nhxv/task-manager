import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {RegisterRoutingModule} from './register-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    RegisterRoutingModule
  ]
})
export class RegisterModule {}
