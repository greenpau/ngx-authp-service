import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthPortalTestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.group('AuthPortalInterceptor:request');
    console.log(req);
    console.groupEnd();
    return next.handle(req).pipe(
      tap(
        (data: HttpEvent<any>) => {
          console.group('AuthPortalInterceptor:success');
          console.log(`API request to endpoint ${req.url} succeeded`);
          console.log(data);
          console.groupEnd();
        },
        (error: HttpErrorResponse) => {
          console.group('AuthPortalInterceptor:failure');
          console.log(`API request to endpoint ${req.url} failed with status ${error.status}`);
          console.groupEnd();
        }
      )
    );
  }
}
