import {Component, OnDestroy, OnInit} from '@angular/core';
import {Archive} from './archive.model';
import {Subscription} from 'rxjs';
import {ArchiveService} from './archive.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-archives',
  templateUrl: './archives.component.html',
  styleUrls: ['./archives.component.css']
})
export class ArchivesComponent implements OnInit, OnDestroy {
  searchForm: FormGroup;
  archiveList: Archive[];
  archiveListSub: Subscription;

  constructor(private archiveService: ArchiveService) { }

  ngOnInit() {
    this.initForm();
    // when refresh page, load archive list
    this.archiveService.getArchiveList();
    this.archiveListSub = this.archiveService.archivesChanged.subscribe((archiveData: Archive[]) => {
      this.archiveList = archiveData;
    })
  }

  initForm() {
    this.searchForm = new FormGroup({
      query: new FormControl('')
    });
  }

  onSubmitSearch() {
    const query = this.searchForm.get('query').value;
    this.archiveService.findArchive(query);
  }

  onDeleteArchive(id: number) {
    this.archiveService.deleteArchive(id);
  }

  ngOnDestroy(): void {
    this.archiveListSub.unsubscribe();
  }
}
