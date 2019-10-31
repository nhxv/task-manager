import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';


const appRoutes: Routes = [
  {path: '', redirectTo: '/task-management', pathMatch: 'full'},
  {path: 'task-management', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'employees', loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule { }
