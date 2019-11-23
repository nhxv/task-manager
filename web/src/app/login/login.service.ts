import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(loginPayload): Observable<Object> {
    return this.http.post<Object>('http://localhost:8080/' + 'get-token', loginPayload);
  }
}
