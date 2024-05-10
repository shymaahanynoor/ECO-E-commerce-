import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get the JWT token from localStorage or
    const token =  sessionStorage.getItem('token');
    // If a token exists, add it to the Authorization header
    if (token) {
      request = request.clone({
        setHeaders: {
          token: `${token}`
        }
      });
    }
    // Continue with the request
    return next.handle(request);
  }
}
