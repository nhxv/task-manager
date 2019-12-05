import {Injectable} from '@angular/core';
import {Archive} from './archive.model';
import {BehaviorSubject} from 'rxjs';
import {ArchiveApiService} from '../api/archive-api.service';

@Injectable({providedIn: 'root'})
export class ArchiveService {
  archives: Archive[];
  archivesChanged = new BehaviorSubject<Archive[]>(this.archives.slice());

  constructor(private archiveApiService: ArchiveApiService) {}

  createArchive(archive: Archive) {
    this.archiveApiService.createTaskArchive(archive).subscribe((archiveData: Archive[]) => {
      this.archives = archiveData;
      this.archivesChanged.next(this.archives.slice());
    })
  }
}
