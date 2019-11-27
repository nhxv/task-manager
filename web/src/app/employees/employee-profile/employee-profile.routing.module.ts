import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeeProfileComponent} from './employee-profile.component';

const employeeProfileRoutes: Routes = [{path:'', component: EmployeeProfileComponent}];
@NgModule({
  imports: [RouterModule.forChild(employeeProfileRoutes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule {}
