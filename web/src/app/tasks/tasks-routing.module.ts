import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks.component';
import {AuthGuard} from '../auth/auth.guard';

const tasksRoutes: Routes = [
  {path: '', component: TasksComponent, canActivate: [AuthGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
