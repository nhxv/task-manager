import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EmployeeProfileRoutingModule} from './employee-profile.routing.module';
import {EmployeeProfileComponent} from './employee-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeEditComponent} from '../employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    EmployeeProfileComponent,
    EmployeeEditComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    EmployeeProfileRoutingModule
  ],
  entryComponents: [
    EmployeeEditComponent
  ]
})
export class EmployeeProfileModule {}
