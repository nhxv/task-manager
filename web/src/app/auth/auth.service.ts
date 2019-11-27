import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() { }

  isUserAuthorize() {
    let user = sessionStorage.getItem('username');
    if (!user) {
      return false;
    }
    return true;
  }

  logOut() {
    sessionStorage.removeItem('username');
    localStorage.removeItem('token');
  }
}
