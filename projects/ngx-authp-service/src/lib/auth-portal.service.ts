import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AUTHP_CONFIG, AuthPortalConfig } from './auth-portal-config';
import { UserData } from './user-data';

export abstract class IAuthPortalService {
  abstract whoami(): Observable<UserData>;
  abstract getConfig(): AuthPortalConfig;
  abstract logout(): void;
}

@Injectable({
  providedIn: 'root',
})
export class AuthPortalService implements IAuthPortalService {
  headers: HttpHeaders;
  userData: UserData;

  constructor(private http: HttpClient, @Inject(AUTHP_CONFIG) private readonly config: AuthPortalConfig) {
    this.headers = new HttpHeaders({
      pragma: 'no-cache',
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
    });
    this.userData = new UserData({ name: 'Anonymous', email: 'anonymous@localhost' });
    if (this?.config?.baseUrl?.endsWith('/')) {
      this.config.baseUrl = this.config.baseUrl.slice(0, -1);
    }
  }

  public getConfig(): AuthPortalConfig {
    return this.config;
  }

  public whoami(): Observable<UserData> {
    return this.http.get(`${this.config.baseUrl}/whoami`, { headers: this.headers }).pipe(
      map((response) => {
        const userData = new UserData(response);
        this.userData = userData;
        return userData;
      }),
      catchError(this.handleError)
    );
  }

  public logout(): void {
    console.log('logging out');
  }

  handleError(resp: HttpErrorResponse) {
    let msg = '';
    if (resp.error instanceof ErrorEvent) {
      msg = resp.error.message;
    } else {
      msg = `Error Code: ${resp.status}\nMessage: ${resp.message}`;
    }
    return throwError(msg);
  }
}
