import {Component, OnDestroy, OnInit} from '@angular/core';
import {Archive} from './archive.model';
import {Subscription} from 'rxjs';
import {ArchiveService} from './archive.service';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit, OnDestroy {
  archiveList: Archive[];
  archiveListSub: Subscription;

  constructor(private archiveService: ArchiveService) { }

  ngOnInit() {
    // when refresh page, load archive list
    this.archiveService.getArchiveList();
    this.archiveListSub = this.archiveService.archivesChanged.subscribe((archiveData: Archive[]) => {
      this.archiveList = archiveData;
    })
  }

  onDeleteArchive(id: number) {
    this.archiveService.deleteArchive(id);
  }

  ngOnDestroy(): void {
    this.archiveListSub.unsubscribe();
  }


}
