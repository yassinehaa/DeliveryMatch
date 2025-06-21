import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { BehaviorSubject, Observable, tap, catchError, map } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface AuthenticationRequest {
  email: string;
  password: string;
}

interface AuthenticationResponse {
  access_token: string;
  refresh_token?: string;
  user_id: number;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/v1/auth';
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private userSubject = new BehaviorSubject<{ userId: number; role: string } | null>(null);

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private http: HttpClient) {
    if (isPlatformBrowser(this.platformId)) {
      this.loadSession();
    }
  }

  private loadSession() {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this.tokenSubject.next(token);
      this.userSubject.next(JSON.parse(user));
    }
  }

  register(request: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, request).pipe(
      tap(response => this.setSession(response))
    );
  }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    console.log('Login request:', request); // Log the payload
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/authenticate`, request, {
      observe: 'response'
    }).pipe(
      map(response => response.body!),
      tap(response => this.setSession(response)),
      catchError((error: HttpErrorResponse) => {
        console.error('Login error:', {
          status: error.status,
          statusText: error.statusText,
          url: error.url,
          error: error.error,
          message: error.message,
          request: request // Log the sent request
        });
        throw error;
      })
    );
  }

  private setSession(response: AuthenticationResponse) {
    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('user', JSON.stringify({ userId: response.user_id, role: response.role }));
    this.tokenSubject.next(response.access_token);
    this.userSubject.next({ userId: response.user_id, role: response.role });
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getUser(): { userId: number; role: string } | null {
    return this.userSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isDriver(): boolean {
    const user = this.getUser();
    return user?.role === 'CONDUCTEUR';
  }

  isSender(): boolean {
    const user = this.getUser();
    return user?.role === 'EXPEDITEUR';
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
    }
    this.tokenSubject.next(null);
    this.userSubject.next(null);
  }
}
