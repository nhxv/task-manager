import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {EmployeeProfileRoutingModule} from './employee-profile.routing.module';
import {EmployeeProfileComponent} from './employee-profile.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {EmployeeEditComponent} from './employee-edit/employee-edit.component';
import { EmployeeEditModalComponent } from './employee-edit/employee-edit-modal/employee-edit-modal.component';

@NgModule({
  declarations: [
    EmployeeProfileComponent,
    EmployeeEditComponent,
    EmployeeEditModalComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgbModule,
    EmployeeProfileRoutingModule
  ],
  entryComponents: [
    EmployeeEditModalComponent
  ]
})
export class EmployeeProfileModule {}
