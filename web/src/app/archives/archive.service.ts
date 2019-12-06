import {Injectable} from '@angular/core';
import {Archive} from './archive.model';
import {BehaviorSubject} from 'rxjs';
import {ArchiveApiService} from '../api/archive-api.service';

@Injectable({providedIn: 'root'})
export class ArchiveService {
  archives: Archive[] = [];
  archivesChanged = new BehaviorSubject<Archive[]>(this.archives.slice());

  constructor(private archiveApiService: ArchiveApiService) {}

  getArchiveList() {
    this.archiveApiService.getTaskArchiveList().subscribe((archiveData: Archive[]) => {
      this.archives = archiveData;
      this.archivesChanged.next(this.archives.slice());
    })
  }

  getArchive(id: number) {
    for (let archive of this.archives) {
      if (archive.id === id) {
        return archive;
      }
    }
  }

  createArchive(archive: Archive) {
    this.archiveApiService.createTaskArchive(archive).subscribe(() => {
      this.archiveApiService.getTaskArchiveList().subscribe((archiveData: Archive[]) => {
        this.archives = archiveData;
        this.archivesChanged.next(this.archives.slice());
      });
    });
  }

  deleteArchive(id: number) {
    this.archiveApiService.deleteTaskArchive(id).subscribe((archiveData: Archive[]) => {
      const deletedIndex = this.archives.indexOf(this.getArchive(id));
      // deleted from archives array, after knowing archives is deleted from database
      this.archives.splice(deletedIndex, 1);
      // emit updated archives
      this.archivesChanged.next(this.archives.slice());
    })
  }
}
