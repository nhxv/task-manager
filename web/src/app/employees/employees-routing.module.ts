import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EmployeesComponent} from './employees.component';
import {AuthGuard} from '../auth/auth.guard';

const employeesRoutes: Routes = [
  {path: '', component: EmployeesComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(employeesRoutes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {}
