import { Component } from '@angular/core';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  isOpen = false;

  constructor(private authService: AuthService) {}

  onMenu() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isOpen = !this.isOpen;
  }

}
