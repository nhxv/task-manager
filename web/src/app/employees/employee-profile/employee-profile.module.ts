import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EmployeeProfileRoutingModule} from './employee-profile.routing.module';
import {EmployeeProfileComponent} from './employee-profile.component';

@NgModule({
  declarations: [EmployeeProfileComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    EmployeeProfileRoutingModule
  ]
})
export class EmployeeProfileModule {}
