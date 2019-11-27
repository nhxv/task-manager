import {NgModule} from '@angular/core';
import {EmployeeListComponent} from './employee-list.component';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {EmployeeListRoutingModule} from './employee-list-routing.module';

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    RouterModule,
    EmployeeListRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EmployeeListModule {}
