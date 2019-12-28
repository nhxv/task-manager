import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class ArchiveApiService {
  private baseUrl = 'http://localhost:8080/task-archives';

  constructor(private http: HttpClient) {}

  findTaskArchive(query: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/search?q=${query}`);
  }

  getTaskArchive(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getTaskArchiveList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createTaskArchive(taskArchive: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, taskArchive);
  }

  updateTaskArchive(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteTaskArchive(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
}
