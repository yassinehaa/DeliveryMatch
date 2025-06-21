import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role.model';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerData: RegisterData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: Role.CONDUCTEUR
  };
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const role = params['role']?.toUpperCase();
      if (role === 'DRIVER') {
        this.registerData.role = Role.CONDUCTEUR;
      } else if (role === 'SENDER') {
        this.registerData.role = Role.EXPEDITEUR;
      }
    });
  }

  onSubmit() {
    if (!this.registerData.firstName || !this.registerData.lastName || !this.registerData.email || !this.registerData.password) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    this.authService.register(this.registerData).subscribe({
      next: () => {
        this.router.navigate(['/login']);
        this.registerData = {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          role: Role.CONDUCTEUR
        };
      },
      error: (err: HttpErrorResponse) => {
        console.error('Registration error:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          error: err.error,
          message: err.message
        });
        this.errorMessage = err.error?.message || err.error?.error || 'Registration failed';
      }
    });
  }
}
