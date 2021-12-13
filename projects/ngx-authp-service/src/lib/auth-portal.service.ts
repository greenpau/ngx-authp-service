import { Injectable, Inject, InjectionToken } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AUTHP_CONFIG, AuthPortalConfig } from './auth-portal-config';
import { UserData } from './user-data';

export abstract class IAuthPortalService {
  abstract whoami(): Observable<UserData>;
  abstract getConfig(): AuthPortalConfig;
}

@Injectable({
  providedIn: 'root',
})
export class AuthPortalService implements IAuthPortalService {
  headers: HttpHeaders;
  userData: UserData;

  constructor(private http: HttpClient, @Inject(AUTHP_CONFIG) private readonly config: AuthPortalConfig) {
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.userData = new UserData();
    this.userData.name = 'Anonymous';
    this.userData.email = 'anonymous@localhost';
    if (this?.config?.baseUrl?.endsWith('/')) {
      this.config.baseUrl = this.config.baseUrl.slice(0, -1);
    }
  }

  public getConfig(): AuthPortalConfig {
    return this.config;
  }

  public whoami(): Observable<UserData> {
    const resp = this.http.get(`${this.config.baseUrl}/whoami`);
    console.log(resp);
    return of(this.userData);
  }

  // Handle Errors
  error(resp: HttpErrorResponse) {
    let msg = '';
    if (resp.error instanceof ErrorEvent) {
      msg = resp.error.message;
    } else {
      msg = `Error Code: ${resp.status}\nMessage: ${resp.message}`;
    }
    console.log(msg);
    return throwError(msg);
  }
}
