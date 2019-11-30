import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmployeeApiService {
  private baseUrl = 'http://localhost:8080/employees';

  constructor(private http: HttpClient) {}

  getEmployee(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getEmployeeByUsername(username: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/username/${username}`);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  createEmployee(employee: Object): Observable<Object> {
    return this.http.post('http://localhost:8080/register', employee);
  }

  updateEmployee(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, {responseType: 'text'});
  }
}
