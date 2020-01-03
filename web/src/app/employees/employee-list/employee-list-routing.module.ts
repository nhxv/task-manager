import {RouterModule, Routes} from '@angular/router';
import {UserGuard} from '../../auth/user.guard';
import {NgModule} from '@angular/core';
import {EmployeeListComponent} from './employee-list.component';
import {AdminGuard} from '../../auth/admin.guard';

const employeeListRoutes: Routes = [
  {path: '', component: EmployeeListComponent, canActivate: [AdminGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(employeeListRoutes)],
  exports: [RouterModule]
})
export class EmployeeListRoutingModule {}
