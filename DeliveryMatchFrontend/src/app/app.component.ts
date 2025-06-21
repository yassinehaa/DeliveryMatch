import { Component } from '@angular/core';
import {RouterModule, RouterOutlet} from '@angular/router';
import {CommonModule} from '@angular/common';
import {Router} from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'DeliveryMatchFrontend';
  constructor(private router: Router, private authService: AuthService) {}

  navigateToRegister(role: string) {
    if (this.authService.isLoggedIn()) {
      const user = this.authService.getUser();
      if (user?.role === 'DRIVER') {
        this.router.navigate(['/trips']);
      } else if (user?.role === 'SENDER') {
        this.router.navigate(['/parcels']);
      }
    } else {
      this.router.navigate(['/register'], { queryParams: { role } });
    }
  }
}
