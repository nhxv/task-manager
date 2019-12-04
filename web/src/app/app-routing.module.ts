import { NgModule } from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';


const appRoutes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'tasks', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)},
  {path: 'employees', loadChildren: () => import('./employees/employee-list/employee-list.module').then(m => m.EmployeeListModule)},
  {path: 'profile', loadChildren: () => import('./employees/employee-profile/employee-profile.module').then(m => m.EmployeeProfileModule)},
  {path: 'archives', loadChildren: () => import('./archives/archives.module').then(m => m.ArchivesModule)},
  {path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)},
  {path: 'register', loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)},
  // { path: 'not-found', component: PageNotFoundComponent },
  {path: 'not-found', loadChildren: () => import('./page-not-found/page-not-found.module').then(m => m.PageNotFoundModule), data: {message: 'Page not found!'}},
  {path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})], // register routes for app
  exports: [RouterModule]
})
export class AppRoutingModule { }
