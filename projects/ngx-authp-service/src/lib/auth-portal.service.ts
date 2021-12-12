import { Injectable, Inject, InjectionToken } from '@angular/core';
import { PersonaData } from './auth-portal-persona';
import { Observable, throwError, of } from 'rxjs';
// import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';

export interface AuthPortalConfig {
  baseUrl?: string;
}

export const AUTHP_CONFIG = new InjectionToken<AuthPortalConfig>('AUTHP_CONFIG');

@Injectable({
  providedIn: 'root',
})
export class AuthPortalService {
  headers: HttpHeaders;
  persona: PersonaData;
  // http: HttpClient;

  constructor(@Inject(AUTHP_CONFIG) private readonly config: AuthPortalConfig) {
    // this.http = new HttpClient();
    this.headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.persona = new PersonaData();
    this.persona.name = 'Anonymous';
    this.persona.email = 'anonymous@localhost';
  }

  public getConfig(): AuthPortalConfig {
    return this.config;
  }

  public whoami(): Observable<PersonaData> {
    // const resp = this.http.get(`${this.config.baseUrl}/whoami`);
    // console.log(resp);
    return of(this.persona);
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
