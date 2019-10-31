import {NgModule} from '@angular/core';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskFormComponent} from './task-form/task-form.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {TasksRoutingModule} from './tasks-routing.module';
import {TasksComponent} from './tasks.component';

@NgModule({
  declarations: [
    TaskListComponent,
    TaskFormComponent,
    TasksComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    TasksRoutingModule,
    CommonModule
  ]
})
export class TasksModule {}
