import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArchivesComponent} from './archives.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserGuard} from '../auth/user.guard';
import {AdminGuard} from '../auth/admin.guard';

@NgModule({
  declarations: [ArchivesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ArchivesComponent, canActivate: [AdminGuard]}])
  ]
})
export class ArchivesModule {}
