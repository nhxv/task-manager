import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../auth/auth.guard';
import {NgModule} from '@angular/core';
import {EmployeeListComponent} from './employee-list.component';

const employeeListRoutes: Routes = [
  {path: '', component: EmployeeListComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(employeeListRoutes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule {}
