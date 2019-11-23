import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './employees.component';
import {CommonModule} from '@angular/common';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeeListComponent
  ],
  imports: [
    RouterModule,
    EmployeesRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class EmployeesModule {}
