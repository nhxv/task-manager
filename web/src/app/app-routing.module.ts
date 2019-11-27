import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';


const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'employees', loadChildren: () => import('./employees/employee-list/employee-list.module').then(m => m.EmployeeListModule)},
  {path: 'employee-profile', loadChildren: () => import('./employees/employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule { }
