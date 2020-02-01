import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from './tasks.component';
import {AdminGuard} from '../auth/admin.guard';

const tasksRoutes: Routes = [
  {path: '', component: TasksComponent, canActivate: [AdminGuard]}
];
@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}
