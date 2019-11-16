import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthService {
  constructor() { }

  authenticate(username, password) {
    if (username === "voibay" && password === "password") {
      sessionStorage.setItem('username', username);
      return true;
    } else {
      return false;
    }
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
