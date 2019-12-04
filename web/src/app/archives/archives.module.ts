import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ArchivesComponent} from './archives.component';

@NgModule({
  declarations: [ArchivesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ArchivesComponent}])
  ]
})
export class ArchivesModule {}
