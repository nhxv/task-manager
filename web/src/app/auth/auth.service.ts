import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() { }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
