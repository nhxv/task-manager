import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {EmployeeProfileComponent} from './employee-profile.component';
import {UserGuard} from '../../auth/user.guard';

const employeeProfileRoutes: Routes = [{path:'', component: EmployeeProfileComponent, canActivate: [UserGuard]}];
@NgModule({
  imports: [RouterModule.forChild(employeeProfileRoutes)],
  exports: [RouterModule]
})
export class EmployeeProfileRoutingModule {}
