import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';

export const authInterceptor = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const token = authService.getToken();

  console.log('Interceptor: Request URL:', req.url);
  console.log('Interceptor: Original headers:', Array.from(req.headers.keys()));
  console.log('Interceptor: Full Token:', token ? token : 'No token');

  if (token && req.url.startsWith('http://localhost:8081/api')) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`).set('Content-Type', 'application/json')
    });
    console.log('Interceptor: Cloned headers:', Array.from(cloned.headers.keys()));
    console.log('Interceptor: Authorization header:', cloned.headers.get('Authorization'));
    return next(cloned);
  }

  console.log('Interceptor: No token or non-API request, passing through');
  return next(req);
};
