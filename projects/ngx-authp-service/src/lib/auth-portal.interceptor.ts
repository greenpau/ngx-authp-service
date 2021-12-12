import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthPortalInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const newRequest = req.clone({
    //  headers: req.headers.set('Authorization', 'token YOUR-TOKEN-HERE'),
    // });
    // return next.handle(newRequest);
    console.group();
    console.log('intercept');
    console.log(req);
    console.groupEnd();
    return next.handle(req);
  }
}
