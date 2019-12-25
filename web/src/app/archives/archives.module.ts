import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArchivesComponent} from './archives.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ArchivesComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: '', component: ArchivesComponent}])
  ]
})
export class ArchivesModule {}
