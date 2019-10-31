import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {EmployeesRoutingModule} from './employees-routing.module';
import {EmployeesComponent} from './employees.component';
import {CommonModule} from '@angular/common';

@NgModule({
  declarations: [
    EmployeesComponent
  ],
  imports: [
    RouterModule,
    EmployeesRoutingModule,
    CommonModule
  ]
})
export class EmployeesModule {}
